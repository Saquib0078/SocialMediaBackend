import { useState, useEffect } from "react";
import { Card } from "antd";
import moment from "moment";

import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

const { Meta } = Card;

const Username = () => {
  const [user, setUser] = useState({});

  const { _username } = useParams();

  useEffect(() => {
    if (_username) fetchUser();
  }, [_username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${_username}`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZL5p16YV5QRk9p4t7VCNlp-PU2-5Yhv7wwg&usqp=CAU";
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      <div className="d-flex justify-content-center pt-5">
        <Card
          hoverable
          cover={
            <img
              style={{ maxWidth: "300px" }}
              src={imageSource(user)}
              alt={user.name}
            />
          }
        >
          <Meta title={user.name} description={user.about} />

          <p className="pt-2 text-muted">
            Joined {moment(user.createdAt).fromNow()}
          </p>

          <div className="d-flex justify-content-between">
            <span className="btn btn-sm">
              {user.followers && user.followers.length} Followers
            </span>

            <span className="btn btn-sm">
              {user.following && user.following.length} Following
            </span>
          </div>
        </Card>
      </div>
      <Link
        className="d-flex justify-content-center pt-5"
        to={"/user/dashboard"}
      >
        <RollbackOutlined />
      </Link>
    </div>
  );
};

export default Username;
