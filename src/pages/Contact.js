import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/contact`, {
        name,
        email,
        message,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setName("");
        setEmail("");
        setMessage("");
        setLoading(false);
        toast.success("Message Sent");
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 backgroundHeaderTopLeft text-light">
        <div className="col text-center">
          <h1 className="glow">Contact</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group p-2">
              <label className="text-muted">Name</label>
              <input
                className="form-control"
                type="text"
                required
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group p-2">
              <label className="text-muted">Email</label>
              <input
                className="form-control"
                type="email"
                required
                placeholder="Abc@xyz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <label className="text-muted">Message</label>
              <input
                className="form-control"
                type="text"
                required
                placeholder="Tell us about your query..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="form-group p-2">
              <button
                disabled={!name || !email || !message}
                className="btn btn-info col-12"
              >
                {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
