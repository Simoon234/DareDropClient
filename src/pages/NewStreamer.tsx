import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { HashLoader } from "react-spinners";
import formikInitialValues from "../lib/formikInitialValues";
import axiosInstance from "../lib/axiosInstance";
import validationSchema from "../lib/validationSchema";
import { getAllStreamingPlatforms } from "../lib/getAllStreamingPlatforms";
import { getDetailsAboutStreamingPlatform } from "../lib/getDetailsAboutStreamingPlatform";
import { ErrorType, NewStreamerHeaderI, NewStreamerI } from "../types/types";
import { toast } from "react-toastify";
import ShortDescriptionAboutPlatform from "../common/ShortDescriptionAboutPlatform";

const NewStreamer = ({ openForm, closeModal }: NewStreamerHeaderI) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async (newStreamer: NewStreamerI) => {
      const { data } = await axiosInstance.post("streamers", newStreamer);
      return data;
    },
    {
      onSuccess: async () => {
        toast.success("New streamer added", {
          toastId: "new-streamer",
          pauseOnHover: false,
        });
        closeModal();
        resetForm();
        await queryClient.invalidateQueries("streamers");
      },
      onError: (error: ErrorType) => {
        toast.error(error.response.data.message, {
          toastId: "error-duplicate",
          pauseOnHover: false,
        });
      },
    }
  );

  const createStreamerSubmision = (val: NewStreamerI) => {
    mutate(val);
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    onSubmit: (val: NewStreamerI) => createStreamerSubmision(val),
    validationSchema,
    initialValues: formikInitialValues,
  });

  const { data: streamingPlatforms } = useQuery(
    ["getAllStreamingPlatforms"],
    getAllStreamingPlatforms
  );

  const { data: streamingDescription } = useQuery(
    ["getDetailsAboutStreamingPlatform", values.streamingPlatform],
    () => getDetailsAboutStreamingPlatform(values.streamingPlatform)
  );

  return (
    <div
      aria-label="isVisible"
      className="fixed bg-black bg-opacity-60 w-full z-50 left-0 top-0 h-full"
    >
      <div className="flex items-center justify-center h-full relative">
        <div
          className={`bg-white shadow shadow-white rounded max-w-[600px] w-[80%] flex flex-col p-4`}
        >
          <div className="w-full flex justify-between items-center">
            <h3 className="font-bold">Add your streamer</h3>
            <FontAwesomeIcon
              className="cursor-pointer text-3xl hover:rotate-90 hover:text-red-500 hover:scale-[1.2] transition"
              onClick={openForm}
              icon={faClose}
            />
          </div>
          <div className="h-[1px] w-full bg-black my-4" />
          <form onSubmit={handleSubmit} autoComplete="off">
            <label className="w-full" htmlFor="streamerName">
              <p
                className={`mb-2 italic text-black ${
                  errors.streamerName && touched.streamerName
                    ? "text-red-500 font-bold"
                    : ""
                }`}
              >
                Streamer name
              </p>
              <input
                name="streamerName"
                onChange={handleChange}
                onBlur={handleBlur}
                aria-label="streamer-name"
                type="text"
                aria-invalid={
                  errors.streamerName && touched.streamerName ? "true" : "false"
                }
                className={`w-full ${
                  errors.streamerName && touched.streamerName
                    ? "border-2 border-red-500 text-red-500"
                    : ""
                }`}
                aria-errormessage="name-id"
              />
            </label>
            {errors.streamerName && touched.streamerName ? (
              <div className="mb-2 flex items-center justify-end">
                <span id="name-id" className="text-red-500 font-bold">
                  {errors.streamerName}
                </span>
              </div>
            ) : null}
            <label className="w-full" htmlFor="streamerDescription">
              <p
                className={`mb-2 italic text-black ${
                  errors.streamerDescription && touched.streamerDescription
                    ? "text-red-500 font-bold"
                    : ""
                }`}
              >
                Streamer description
              </p>
              <textarea
                rows={6}
                name="streamerDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                aria-label="streamer-description"
                aria-invalid={
                  errors.streamerDescription && touched.streamerDescription
                    ? "true"
                    : "false"
                }
                className={`w-full max-h-[200px] p-2 border-2 ${
                  errors.streamerDescription && touched.streamerDescription
                    ? "border-2 border-red-500 text-red-500"
                    : ""
                }`}
                aria-errormessage="name-id"
              />
            </label>
            {errors.streamerDescription && touched.streamerDescription ? (
              <div className="mb-2 flex items-center justify-end">
                <span id="name-id" className="text-red-500 font-bold">
                  {errors.streamerDescription}
                </span>
              </div>
            ) : null}
            <label className="w-full" htmlFor="streamingPlatform">
              <p
                className={`mb-2 italic ${
                  errors.streamingPlatform && touched.streamingPlatform
                    ? "text-red-500 font-bold"
                    : ""
                }`}
              >
                Streamer platform
              </p>
              <select
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.streamingPlatform}
                aria-errormessage="type-id"
                name="streamingPlatform"
                className={`w-full ${
                  errors.streamingPlatform && touched.streamingPlatform
                    ? "border-2 border-red-500 text-red-500"
                    : ""
                }`}
              >
                <option value="">Select the platform</option>
                {streamingPlatforms &&
                  streamingPlatforms.map((item) => {
                    return (
                      <option key={item.id} value={item.streamingPlatform}>
                        {item.streamingPlatform}
                      </option>
                    );
                  })}
              </select>
            </label>
            {errors.streamingPlatform && touched.streamingPlatform ? (
              <div className="mb-2 flex items-center justify-end">
                <span id="name-id" className="text-red-500 font-bold">
                  {errors.streamingPlatform}
                </span>
              </div>
            ) : null}
            {isLoading && values.streamingPlatform !== "" ? (
              <div className="flex items-center w-full justify-center mt-10">
                <HashLoader color="#4a4acd" size={60} />
              </div>
            ) : (
              <div className="max-h-[200px] h-full overflow-auto overflow-x-hidden">
                <ShortDescriptionAboutPlatform
                  shortDescription={
                    streamingDescription?.streamingPlatformDescription!
                  }
                />
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`py-2 hover:bg-indigo-600 ${
                isLoading ? "opacity-20 cursor-not-allowed" : ""
              } transition mt-4 w-full bg-indigo-800 text-white rounded`}
            >
              {isLoading ? "Submitting" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStreamer;
