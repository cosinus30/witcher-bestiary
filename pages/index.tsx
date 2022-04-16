import type { NextPage } from "next";
import { CardProps } from "../components/HomePage/Card";
import Cards from "../components/HomePage/Cards";
import Header from "../components/HomePage/Header";
import MainBar from "../components/HomePage/MainBar";
import Navbar from "../components/Navigation/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <MainBar />
      <Cards cards={cards} />
    </div>
  );
};

export default Home;
