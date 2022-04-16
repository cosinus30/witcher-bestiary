import type { NextPage } from "next";
import Header from "../components/HomePage/Header";
import MainBar from "../components/HomePage/MainBar";
import Navbar from "../components/Navigation/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <MainBar />
    </div>
  );
};

export default Home;
