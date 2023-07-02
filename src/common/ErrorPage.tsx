import { Link, isRouteErrorResponse } from "react-router-dom";
import { ErrorPageI } from "../types/types";

const ErrorPage = ({ message, status, error }: ErrorPageI) => {
  return (
    <div className="flex items-center flex-col justify-center h-screen bg-indigo-600 text-white">
      <h1 className="text-[6rem]">{status}</h1>
      <p className="text-[1.5rem] mb-10">
        {isRouteErrorResponse(error) && message}
      </p>
      <Link
        className="py-3 px-20 custom-shadow border-2 hover:bg-indigo-500 hover:rounded-none rounded-bl-lg rounded-se-xl"
        to="/"
      >
        Home
      </Link>
    </div>
  );
};

export default ErrorPage;
