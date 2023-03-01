import React from "react";
import img1 from "../assets/img/me.jpg";
import {
  GithubOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p className="mb-3 mb-md-0 text-muted" style={{ marginLeft: "1rem" }}>
        <Avatar src={img1} style={{ marginRight: "1rem" }} />
        Made with ❤ by Rameez Ahmed Ansari.
      </p>

      <ul className="nav col-md-4 mb-3 mb-md-0 text-muted justify-content-end list-unstyled d-flex footerModified">
        <li className="ms-3">
          <a
            href="https://twitter.com/rameezansari007"
            className="text-muted"
            target={"_blank"}
          >
            <TwitterOutlined />
          </a>
        </li>
        <li className="ms-3">
          <a
            className="text-muted"
            href="https://github.com/rameezahmedansari"
            target={"_blank"}
          >
            <GithubOutlined />
          </a>
        </li>
        <li className="ms-3" style={{ marginRight: "1rem" }}>
          <a
            className="text-muted"
            href="https://www.linkedin.com/in/rameez-ahmed-ansari-b8a844210/"
            target={"_blank"}
          >
            <LinkedinFilled />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
