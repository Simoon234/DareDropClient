import { StreamingApplication } from "../types/types";
import axiosInstance from "./axiosInstance";



export const getAllStreamers = async (page: string, itemsOnPage: string) => {
  const { data } = await axiosInstance.get<StreamingApplication>(`streamers?page=${page}&itemsOnPage=${itemsOnPage}`);
  return data;
};

