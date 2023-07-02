import { useLoaderData } from "react-router-dom";
import { StreamerDetailsI } from "../types/types";

const StreamerDetails = () => {
  const streamer = useLoaderData() as StreamerDetailsI;

  return (
    <div className="md:h-[400px] h-full  max-w-[600px] m-auto flex flex-col items-center justify-center mt-10">
      <img src={streamer.image} alt="streamer image" className="rounded" />
      <div className="mt-5 text-center w-full text-white">
        <h2 className="text-4xl font-bold break-words">
          {streamer.streamerName}
        </h2>
        <div className="h-[1px] w-full bg-gray-200 my-4" />
        <p className="mt-5 text-[18px]">{streamer.streamerDescription}</p>
        <div className="h-[1px] w-full bg-gray-200 my-4" />
        <p className="italic text-[18px]">{streamer.platform}</p>
      </div>
    </div>
  );
};

export default StreamerDetails;
