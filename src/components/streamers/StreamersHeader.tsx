import { BeatLoader } from "react-spinners";
import { StreamerHeaderI } from "../../types/types";

const StreamersHeader = ({
  openForm,
  streamers,
  isLoading,
}: StreamerHeaderI) => {
  return (
    <div className="flex md:flex-row flex-col py-10 justify-between items-center w-full">
      <div className="flex items-center">
        <p className="text-white md:mt-0 mb-4 font-bold mr-2">
          List of all favourites streamers
        </p>
        <span
          data-testid="quantity"
          className="text-xl md:mt-0 mb-4 text-white font-bold flex items-center underline underline-offset-8"
        >
          [ {isLoading ? <BeatLoader size={10} color="white" /> : streamers} ]
        </span>
      </div>
      <button
        onClick={openForm}
        title="Add new streamer"
        type="button"
        aria-label="add-new-streamer"
        className={`${
          streamers === 0 ? "animate-scale" : ""
        } p-2 bg-orange-300 mr-2 border-orange-300 text-indigo-500 font-bold custom-shadow border-2 hover:text-white hover:border-white hover:bg-indigo-500 hover:rounded-none rounded-bl-lg rounded-se-xl`}
      >
        Add new streamer
      </button>
    </div>
  );
};

export default StreamersHeader;
