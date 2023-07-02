import { StreamingPlatformsI } from "../types/types";
import axiosInstance from "./axiosInstance";



export const getAllStreamingPlatforms = async () => {
  const { data } = await axiosInstance.get<StreamingPlatformsI[]>(
    "streaming-platforms"
  );
  return data;
};
