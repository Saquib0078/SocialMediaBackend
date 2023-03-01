import React from "react";

const ParallaxBG = ({ url, children = "R-Blog" }) => {
  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundImage: "url(" + url + ")",
          backgroundAttachment: "fixed",
          padding: "100px 0px 75px 0px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          display: "block",
          clipPath: "polygon(0 0, 100% 0, 100% 45vh, 0 100%)",
          height: "60vh",
        }}
      >
        <h1 className="display-1 font-weight-bold  text-center">{children}</h1>
      </div>
    </>
  );
};

export default ParallaxBG;
