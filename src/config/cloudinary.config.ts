import {v2 as _cloudinary} from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "../config/variables.config";

const cloudinary = _cloudinary;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export default cloudinary;
