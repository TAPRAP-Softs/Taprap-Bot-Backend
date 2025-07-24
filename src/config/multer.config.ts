import multer from "multer";
import path from "path";
import { Request } from "express";

export const store = multer({
  storage: multer.diskStorage({}),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname);

    if ([".jpg", ".png", ".jpeg", ".svg"].indexOf(ext.toLowerCase()) === -1) {
      cb(new Error("File type is not supported"));
      return;
    }
    cb(null, true);
  },
});

export const storeImages = multer({
  storage: multer.diskStorage({}),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname);

    if ([".jpg", ".png", ".jpeg", ".svg"].indexOf(ext.toLowerCase()) === -1) {
      cb(new Error("File type is not supported"));
      return;
    }
    cb(null, true);
  },
}).array("images", 5);

export const storeVideos = multer({
  storage: multer.diskStorage({}),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname);

    if ([".mp4", ".avi", ".mov", ".mkv"].indexOf(ext.toLowerCase()) === -1) {
      cb(new Error("File type is not supported"));
      return;
    }
    cb(null, true);
  },
})
