import React, { useContext } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/img/blog1.png";
import "../styles/banner.scss";
import { UserContext } from "../UserContext";

const Banner = () => {
  const [state] = useContext(UserContext);
  return (
    <section className="banner">
      <div className="banner__content">
        <div className="banner__content__text">
          <h1 className="banner__heading">Blogs of the Modern World!</h1>
          <p className="banner__para">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
            culpa quis quasi quod molestias cumque illo amet magni molestiae
            unde eius perspiciatis, minus, cupiditate laborum nostrum voluptatum
            perferendis laboriosam quas esat! Quidem ratione ut saepe.
          </p>
          <div className="banner__content__link">
            {state === null && (
              <Link to={"/register"} className="banner__link">
                <button className="banner__btn">Get Started</button>
              </Link>
            )}

            {state !== null && (
              <Link to={"/user/dashboard"} className="banner__link">
                <button className="banner__btn">Goto Dashboard</button>
              </Link>
            )}
          </div>
        </div>

        <div className="banner__content__img">
          <img src={img1} alt="banner-img" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
