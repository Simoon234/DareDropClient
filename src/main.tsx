import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./components/Error";
import RootPage from "./RootPage";
import MainPage from "./common/MainPage";
import axiosInstance from "./lib/axiosInstance";
import { StreamerDetailsI } from "./types/types.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import Loader from "./common/Loader.tsx";
import streamerDetails from "./lib/getDetailsAboutStreame.ts";

const Streamers = lazy(() => import("./pages/Streamers.tsx"));
const StreamerDetails = lazy(() => import("./pages/StreamerDetails.tsx"));

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "streamers",
        element: (
          <Suspense fallback={<Loader color="white" />}>
            <Streamers />
          </Suspense>
        ),
      },
      {
        path: "streamer/details/:id",
        element: (
          <Suspense fallback={<Loader color="white" />}>
            <StreamerDetails />
          </Suspense>
        ),
        loader: async ({ params }) => streamerDetails(params.id!),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <ToastContainer
      position="top-right"
      autoClose={7000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="colored"
    />
  </>
);
