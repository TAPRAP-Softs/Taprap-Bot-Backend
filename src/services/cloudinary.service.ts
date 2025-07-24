import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.config";
import { CustomError } from "../config/error.config";

class CloudinaryService {
  async uploadImages(images: any[]): Promise<UploadApiResponse[]> {
    try {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image, {
          resource_type: "image",
          folder: "Taprap_Bot/customer/images",
        })
      );

      const responses = await Promise.all(uploadPromises);
      return responses;
    } catch (error: any) {
      console.log(error);
      throw new CustomError(error.message, error.status || 500);
    }
  }

  async uploadVideos(videos: any[]): Promise<UploadApiResponse[]> {
    try {
      const uploadPromises = videos.map((video) =>
        cloudinary.uploader.upload(video, {
          resource_type: "video",
          folder: "Taprap_Bot/customer/videos",
        })
      );

      const responses = await Promise.all(uploadPromises);
      return responses;
    } catch (error: any) {
      console.log(error);
      throw new CustomError(error.message, error.status || 500);
    }
  }

  async uploadDocuments(documents: any[]): Promise<UploadApiResponse[]> {
    try {
      const uploadPromises = documents.map((document) =>
        cloudinary.uploader.upload(document, {
          resource_type: "raw",
          folder: "Taprap_Bot/customer/documents",
        })
      );

      const responses = await Promise.all(uploadPromises);
      return responses;
    } catch (error: any) {
      console.log(error);
      throw new CustomError(error.message, error.status || 500);
    }
  }
}

export default new CloudinaryService();
