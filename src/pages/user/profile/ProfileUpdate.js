import React, { useContext, useEffect } from "react";
// import img1 from "../assets/img/logo.png";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../../components/forms/AuthForm";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";

import { UserContext } from "../../../UserContext";

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  //profile img

  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.user) {
      // console.log(state.user);
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/profile-update", {
        username,
        about,
        name,
        email,
        password,
        secret,
        image,
      });

      console.log(data);

      if (data.error) {
        toast.error(data.error);
      } else {
        // update local update user keep token

        let auth = JSON.parse(localStorage.getItem("auth"));

        auth.user = data;

        localStorage.setItem("auth", JSON.stringify(auth));

        //update cotext

        setState({ ...state, user: data });

        setOk(true);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const { data } = await axios.post("/upload-image", formData);

      setImage({ url: data.url, public_id: data.public_id });

      // console.log(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };
  // if (state && state.token) navigate("/");

  return (
    <div className="signup">
      <main>
        {/* <img src={img1} alt="logo" />  */}

        <div className="container-fluid">
          <div className="row py-5 bg-secondary text-light">
            <div className="col text-center">
              <h1>Profile</h1>
            </div>
          </div>

          <div className="row py-5">
            <div className="col-md-6 offset-md-3">
              {/* Upload image */}

              <label className="d-flex justify-content-center h5">
                {image && image.url ? (
                  <Avatar size={30} src={image.url} className="mt-1" />
                ) : uploading ? (
                  <LoadingOutlined className="mt-2" />
                ) : (
                  <CameraOutlined className="mt-2" />
                )}
                <input
                  onChange={handleImage}
                  type="file"
                  accept="images/*"
                  hidden
                />
              </label>

              <AuthForm
                profileUpdate={true}
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                secret={secret}
                setSecret={setSecret}
                loading={loading}
                username={username}
                setUsername={setUsername}
                about={about}
                setAbout={setAbout}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Modal
                title="Congratulations!"
                visible={ok}
                onCancel={() => setOk(false)}
                footer={null}
              >
                <p>You have succesfully updated your profile.</p>
              </Modal>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p className="text-center">
                Already registered? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileUpdate;
