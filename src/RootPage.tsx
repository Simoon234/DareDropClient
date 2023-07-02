import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Wrapper from "./common/Wrapper";
import Footer from "./components/Footer";

const RootPage = () => {
  return (
    <div className="max-w-[1400px] h-full relative m-auto min-h-screen">
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </div>
  );
};

export default RootPage;
