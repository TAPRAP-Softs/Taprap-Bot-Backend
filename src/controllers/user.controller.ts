import userService from "../services/user.service";
import cloudinaryService from "../services/cloudinary.service";
import { UserRequest } from "../interfaces/user.interface";
import { storeImages, storeVideos } from "../config/multer.config";
import { Response } from "express";
import { ResponseModel } from "../utils/response.model";
import { StatusCodes } from "http-status-codes";
import { getVideoDurationInSeconds } from "get-video-duration";

class UserController {
  async upload(req: UserRequest, res: Response) {
    try {
      const fileType = req.params.fileType;

      // Determine the multer configuration and Cloudinary upload function based on fileType
      let multerConfig;
      let uploadFunction;

      switch (fileType) {
        case "image":
          multerConfig = storeImages;
          uploadFunction = cloudinaryService.uploadImages;
          break;
        case "video":
          multerConfig = storeVideos.array("videos", 1);
          uploadFunction = cloudinaryService.uploadVideos;
          break;

        default:
          return ResponseModel.error(
            res,
            "Invalid file type",
            StatusCodes.BAD_REQUEST
          );
      }

      // Apply the multer configuration
      multerConfig(req, res, async (err: any) => {
        if (err) {
          return ResponseModel.error(
            res,
            err.message || "File upload error",
            StatusCodes.BAD_REQUEST
          );
        }

        // Check if files are uploaded
        if (
          !req.files ||
          (Array.isArray(req.files) && req.files.length === 0)
        ) {
          return ResponseModel.error(
            res,
            "No files uploaded",
            StatusCodes.BAD_REQUEST
          );
        }
        for (const file of req.files as Express.Multer.File[]) {
          const check = file.mimetype.search("video");
          if (check !== -1) {
            const duration = await getVideoDurationInSeconds(file.path);
            console.log(duration);
            if (duration && duration > 30) {
              return res.status(400).send({
                success: false,
                message: `Duration of file: "${file.originalname}" is greater than 30 seconds`,
              });
            }
          }
        }

        // Extract file paths from the uploaded files
        const files = (req.files as Express.Multer.File[]).map(
          (file) => file.path
        );

        // Call the corresponding Cloudinary upload function
        const uploadedFiles = (await uploadFunction(files)).map((file) => {
          return file.secure_url;
        });

        return res.status(200).send({
          success: true,
          message: `${fileType}(s) uploaded successfully`,
          data: { uploadedFiles },
        });
      });
    } catch (error) {
      console.error("Error uploading documents", error);
      return res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async getProfile(req: UserRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(400).send({
          success: false,
          message: "Invalid token",
        });
      }
      const user = await userService.findById(userId);
      if (!user) {
        return ResponseModel.error(
          res,
          "User not found",
          StatusCodes.NOT_FOUND
        );
      }
      return ResponseModel.success(res, "User profile retrieved successfully", {
        user: user.getPublicData(),
      });
    } catch (error: any) {
      console.error("Error retrieving user profile:", error);
      return ResponseModel.error(
        res,
        "Internal server error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new UserController();
