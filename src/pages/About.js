import React from "react";
import img1 from "../assets/img/logo.png";

const About = () => {
  return (
    <div className="section-about container">
      <div className="about">
        <div className="about__img">
          <img className="w-50" src={img1} alt="logo" />
          <p className="about__paraimg">
            The latest tips and news from the rBlog team
          </p>
        </div>
        <div className="about__heading">
          <h1>A better Blogger experience on the web</h1>
          <p>May 20, 2020</p>
        </div>
        <div className="about__para">
          <p>
            Since 1999, millions of people have expressed themselves on Blogger.
            From detailed posts about almost every apple variety you could ever
            imagine to a blog dedicated to the art of blogging itself, the
            ability to easily share, publish and express oneself on the web is
            at the core of Blogger’s mission. As the web constantly evolves, we
            want to ensure anyone using Blogger has an easy and intuitive
            experience publishing their content to the web. That’s why we’ve
            been slowly introducing an improved web experience for Blogger. Give
            the fresh interface a spin by clicking “Try the New Blogger” in the
            left-hand navigation pane. In addition to a fresh feel, Blogger is
            now responsive on the web, making it easier to use on mobile
            devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
