import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/img/logo.png";

import { UserContext } from "../UserContext";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Button from "../UI/Button";

const Navbar = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [window.location.pathname]);

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("auth");
    setState(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg p-3 navbar-light bg-info">
        <Link to={"/"}>
          <img
            style={{ width: "8rem" }}
            src={img1}
            alt="logo"
            className="navbar__logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link  ${current === "/" && "active"}`}
                to={"/"}
              >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${current === "/about" && "active"}`}
                to={"/about"}
              >
                About
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link
                className={`nav-link  ${current === "/contact" && "active"}`}
                to={"/contact"}
              >
                Contact
              </Link>
            </li>{" "}
          </ul>
          <div>
            {state !== null && state.user ? (
              <>
                <div className="pmd-dropdown dropleft mr-5">
                  <a
                    className=" pmd-btn-fab pmd-ripple-effect text-muted pmd-btn-flat "
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span style={{ marginRight: "8rem" }}>
                      {state !== null && state.user && state.user.image ? (
                        <Avatar size={40} src={state.user.image.url} />
                      ) : (
                        <Avatar size={40} icon={<UserOutlined />} />
                      )}

                      <CaretDownOutlined />
                    </span>
                  </a>

                  <div className="dropdown-menu">
                    <Link
                      to={`/user/${state.user.username}`}
                      className="dropdown-header text-dark bg-info-subtle text-decoration-none"
                    >
                      {state.user.name}
                    </Link>

                    {state.user.role === "Admin" && (
                      <li>
                        <Link
                          className=" dropdown-item text-dark bg-warning text-decoration-none"
                          to={"/admin"}
                        >
                          Admin DashBoard
                        </Link>
                      </li>
                    )}

                    <Link to={"/user/dashboard"} className=" dropdown-item ">
                      Dashboard
                    </Link>
                    <Link
                      to={"/user/profile/update"}
                      className=" dropdown-item "
                    >
                      Profile
                    </Link>

                    <Link onClick={logout} className="dropdown-item ">
                      Log Out
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  className="navbar__link-items-main navbar__link-items-main__btn "
                  to={"/login"}
                >
                  <Button>Login</Button>
                </Link>
                <Link
                  className="navbar__link-items-main navbar__link-items-main__btn"
                  to={"/register"}
                >
                  <Button>Signup</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
