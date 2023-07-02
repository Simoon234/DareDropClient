import { HashLoader } from "react-spinners";

const Loader = ({ color }: { color: string }) => {
  return (
    <div className="absolute left-1/2 top-[270px] -translate-y-[50%] -translate-x-[50%]">
      <HashLoader color={color} size={120} />
    </div>
  );
};

export default Loader;
