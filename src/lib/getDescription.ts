import { PlatformDescriptionI } from "../types/types";
import axiosInstance from "./axiosInstance";



const getDescription = async ({ platform }: PlatformDescriptionI) => {
  const { data } = await axiosInstance.get(
    `streamers/show-description/${platform}`
  );
  return data.description;
};

export default getDescription;
