import { QueryClient } from "react-query";
import { StreamerDetailsI } from "../types/types";
import axiosInstance from "./axiosInstance";
const queryClient = new QueryClient();

const streamerDetails = (id: string) => {
  return queryClient.fetchQuery(
    "stream",
    async () => {
      const streamer = await axiosInstance.get(
        `streamers/details/${id}`
      );
      return streamer.data as StreamerDetailsI;
    },
    {
      staleTime: 1000,
    }
  );
}

export default streamerDetails;