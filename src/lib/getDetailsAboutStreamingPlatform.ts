import { StreamingPlatformsI } from "../types/types";
import axiosInstance from "./axiosInstance";



export const getDetailsAboutStreamingPlatform = async (info: string) => {
  const { data } = await axiosInstance.get<StreamingPlatformsI>(
    `streaming-platforms/details?info=${info}`
  );
  return data;
};
