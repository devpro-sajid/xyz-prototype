import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navigation/Navbar";
import Footer from "../Shared/Footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar/>
      <Outlet></Outlet>
      <Footer/>
    </>
  );
};

export default Main;
