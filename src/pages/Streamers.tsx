import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import StreamersHeader from "../components/streamers/StreamersHeader";
import NewStreamer from "./NewStreamer";
import { getAllStreamers } from "../lib/getAllStreamers";
import { voteUser } from "../lib/voteUser";
import Pagination from "../common/Pagination";
import Loader from "../common/Loader";
import { UpdateVoteI, VoteType } from "../types/types";

export default function Streamers() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [itemsOnPage, setItemsOnPage] = useState<string>(
    localStorage.getItem("itemsOnPage")! || "5"
  );
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["streamers", itemsOnPage, page], () =>
    getAllStreamers(page.toString(), itemsOnPage.toString())
  );

  const openSetForm = () => {
    setOpenForm((prev) => !prev);
  };

  const handleChangePageNext = () => {
    if (data) {
      if (data.totalPages === page || data.totalPages === 0) return;
    }
    setPage((prev) => prev + 1);
  };
  const handleChangePagePrev = () => {
    if (page < 1) return;
    setPage((prev) => prev - 1);
  };

  const handleSetItemsOnPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") return;
    localStorage.setItem("itemsOnPage", e.target.value);
    setItemsOnPage(e.target.value);
  };

  const closeModal = () => {
    setOpenForm(false);
  };

  const { mutate, isLoading: loadingVotes } = useMutation(
    async (obj: UpdateVoteI) => voteUser(obj),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("streamers");
      },
    }
  );

  const updateVotes = (id: string, e: React.MouseEvent<HTMLElement>) => {
    mutate({
      userId: id,
      type: (e.target as HTMLElement).getAttribute("data-type") as VoteType,
    });
  };

  return (
    <div className="h-full pb-20 relative">
      <StreamersHeader
        streamers={data?.totalStreamersCount as number}
        isLoading={isLoading}
        openForm={openSetForm}
      />
      <div className="m-auto relative">
        <div className="max-w-[1400px] overflow-auto">
          <table className="relative w-[1350px]">
            <thead className="w-full bg-indigo-200">
              <tr className="text-left text-indigo-900">
                <th title="Streamer" className="p-4">
                  Streamer
                </th>
                <th title="Streaming platform">Streaming platform</th>
                <th title="Upvotes">
                  <FontAwesomeIcon
                    className="text-2xl text-green-600"
                    icon={faThumbsUp}
                  />
                </th>
                <th title="Downvotes">
                  <FontAwesomeIcon
                    className="text-2xl text-red-600"
                    icon={faThumbsDown}
                  />
                </th>
                <th title="Details">Details</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.streamers.map((streamer) => {
                  return (
                    <tr
                      key={streamer.id}
                      className="bg-orange-300 odd:bg-orange-200 w-full border-b border-black"
                    >
                      <td
                        title={streamer.streamerName}
                        className="hover:text-indigo-600 cursor-pointer hover:underline hover:underline-offset-4 transition-all"
                      >
                        <Link
                          className="w-full h-10 cursor-pointer p-7 flex items-center"
                          to={`/streamer/details/${streamer.id}`}
                        >
                          {streamer.streamerName.length > 30
                            ? `${streamer.streamerName.slice(0, 10)}...`
                            : streamer.streamerName}
                        </Link>
                      </td>
                      <td className="font-bold">
                        {streamer.streamingPlatforms.length === 1
                          ? streamer.streamingPlatforms.map(
                              (item) => item.streamingPlatform
                            )
                          : streamer.streamingPlatforms.map((item) => (
                              <span key={item.id} className="mr-2 last:mr-0">
                                {item.streamingPlatform}
                              </span>
                            ))}
                      </td>
                      <td className="relative">
                        <span className="mr-12">
                          {streamer.upvotes > 1000 ? "999+" : streamer.upvotes}
                        </span>
                        <button
                          onClick={(e) => updateVotes(streamer.id, e)}
                          disabled={loadingVotes}
                          type="button"
                          data-type="plus"
                          className={`ml-12 ${
                            loadingVotes
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          } absolute top-1 left-1 bg-green-600 z-50 rounded text-white px-4 py-3`}
                        >
                          +1
                        </button>
                      </td>
                      <td className="relative">
                        <span className="mr-12">{streamer.downvotes}</span>
                        <button
                          onClick={(e) => updateVotes(streamer.id, e)}
                          type="button"
                          disabled={loadingVotes}
                          data-type="minus"
                          className={`ml-6 absolute ${
                            loadingVotes
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          } top-1 right-8 bg-red-500 z-50 rounded text-white px-4 py-3`}
                        >
                          -1
                        </button>
                      </td>
                      <td>
                        <Link
                          className="cursor-pointer hover:underline hover:underline-offset-4 p-2"
                          to={`/streamer/details/${streamer.id}`}
                        >
                          Read more
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {data && data.streamers.length === 0 ? (
        <p className="absolute left-1/2 top-[350px] font-bold text-white text-2xl -translate-x-1/2 translate-y-1/2">
          No streamers added.
        </p>
      ) : null}
      {isLoading ? <Loader color="white" /> : null}
      {loadingVotes ? <Loader color="#9681EB" /> : null}
      {openForm ? (
        <NewStreamer closeModal={closeModal} openForm={openSetForm} />
      ) : null}
      <Pagination
        handleChangePageNext={handleChangePageNext}
        page={page}
        handleChangePagePrev={handleChangePagePrev}
        handleSetItemsOnPage={handleSetItemsOnPage}
        totalPages={data?.totalPages!}
      />
    </div>
  );
}
