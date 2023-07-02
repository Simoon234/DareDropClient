import { UpdateVoteI } from "../types/types";
import axiosInstance from "./axiosInstance";
import waitSomeTime from "./waitSomeTime";



export const voteUser = async (obj: UpdateVoteI) => {
  const { type, userId } = obj;
  const { data } = await axiosInstance.put(
    `streamers/${userId}/vote?type=${type}`
  );
  await waitSomeTime(800, data)
  return data;
};
