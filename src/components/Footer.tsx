import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full p-4">
      <div className="flex flex-col justify-center items-center">
        <Link
          to="mailto:simon98181@gmail.com"
          className="m-auto italic text-white"
        >
          simon98181@gmail.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
