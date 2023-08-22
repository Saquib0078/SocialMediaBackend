import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data));
        // save in context
        setState({
          user: data.user,
          token: data.token,
        });

        navigate("/user/dashboard");
      }
    } catch (err) {
      setLoading(false);
    }
  };

  if (state && state.token) navigate("/user/dashboard");

  return (
    <div className="signup">
      <main>
        <div className="container-fluid">
          <div className="row py-5 backgroundHeaderTopLeft text-light">
            <div className="col text-center">
              <h1 className="glow">Login</h1>
            </div>
          </div>

          <div className="row py-5">
            <div className="col-md-6 offset-md-3">
              <AuthForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                page="login"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="text-center">
              Not yet registered? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p className="text-center">
              
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
