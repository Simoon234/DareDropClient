import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-10 relative">
      <div className="flex justify-between items-center">
        <Link
          title="home page"
          className="text-white cursor-pointer font-bold text-[2rem]"
          to="/"
        >
          DareDrop
        </Link>
        <ul className="flex text-white">
          <li>
            <Link
              title="streamers"
              className="p-2 cursor-pointer custom-shadow border-2 hover:bg-indigo-500 hover:rounded-none rounded-bl-lg rounded-se-xl"
              to="/streamers"
            >
              Streamers
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
