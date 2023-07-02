import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import ErrorPage from "../common/ErrorPage";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <ErrorPage
        error={error}
        message="We are really sorry, but this page doesn't exist."
        status={error.status}
      />
    );
  }

  if (isRouteErrorResponse(error) && error.status === 500) {
    return (
      <ErrorPage
        error={error}
        message="Unexpected server error. Please try again later."
        status={error.status}
      />
    );
  }

  return (
    <div className="flex items-center h-screen flex-col justify-center bg-indigo-600 text-white">
      <p className="text-[1.5rem] mb-10 text-center">
        Oops, we have an error. Please try again!
      </p>
      <Link
        className="py-3 px-20 custom-shadow border-2 hover:bg-indigo-500 hover:rounded-none rounded-bl-lg rounded-se-xl"
        to="/"
      >
        Home
      </Link>
    </div>
  );
}
