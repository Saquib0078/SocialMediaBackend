import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/forgot-password", {
        email,
        newPassword,
        secret,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
      if (data.success) {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setLoading(false);
        setOk(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  if (state && state.token) navigate("/");

  return (
    <div className="signup">
      <main>
        <div className="container-fluid">
          <div className="row py-5 backgroundHeaderTopLeft text-light">
            <div className="col text-center">
              <h1 className="glow">Forgot Password</h1>
            </div>
          </div>

          <div className="row py-5">
            <div className="col-md-6 offset-md-3">
              <ForgotPasswordForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                secret={secret}
                setSecret={setSecret}
                loading={loading}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Modal
                title="Congratulations!"
                open={ok}
                onCancel={() => setOk(false)}
                footer={null}
              >
                <p>Congrats! you can now login with your new password</p>
                <Link to={"/login"}>
                  <p className="btn btn-primary">Login</p>
                </Link>
              </Modal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
