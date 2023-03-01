import React from "react";
import Banner from "../components/Banner";
import ParallaxBG from "../components/cards/ParallaxBG";
import Feature1 from "../components/Feature1";

const Home = () => {
  return (
    <>
      <ParallaxBG
        url={
          "https://blog.planoly.com/hubfs/Imported_Blog_Media/Planoly-Blog-Post-7-Things-You-Need-to-Know-Before-You-Launch-Your-Blog-Banner-2.jpg"
        }
      />
      <Banner />
      <Feature1 />
    </>
  );
};

export default Home;
