import type { NextPage } from "next";
import Header from "../components/HomePage/Header";
import Navbar from "../components/Navigation/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
