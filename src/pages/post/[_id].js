import { RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/cards/Post";

const PostComments = () => {
  const { _id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure?");
    if (!answer) return;
    try {
      const { data } = await axios.put("/remove-comment", {
        postId,
        comment,
      });
      console.log("comment removed", data);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row py-5 text-light backgroundHeaderTopLeft">
          <div className="col text-center">
            <h1 className="glow">R-Blog</h1>
          </div>
        </div>
        <div className="container col-md-8 offset-md-2 pt-5">
          <Post
            post={post}
            commentsCount={100}
            removeComment={removeComment}
            page={true}
          />
        </div>

        <Link
          className="d-flex justify-content-center p-5"
          to={"/user/dashboard"}
        >
          <RollbackOutlined />
        </Link>
      </div>
    </>
  );
};

export default PostComments;
