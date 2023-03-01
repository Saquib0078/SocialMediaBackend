import React from "react";
import "../styles/feature1.scss";
import img1 from "../assets/img/blog2.png";

const Feature1 = () => {
  return (
    <section
      className="features1"
      style={{
        // 100% 0 , 45vh 100%, 0 100%, 0 0
        clipPath: "polygon(0 120px, 100% 0, 100% 100%, 0 100%)",
        // height: "60vh",
      }}
    >
      <div className="features1__image">
        <img src={img1} />
      </div>
      <div className="features1__content">
        <h1 className="features1__heading">Blogs Of The Future World</h1>
        <p className="features1__para">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio rerum
          doloribus quod iure laborum saepe eos porro minima ex deleniti unde
          similique maxime, dolorum sed asperiores, tenetur voluptas esse
          laboriosam.
        </p>
      </div>
    </section>
  );
};

export default Feature1;
