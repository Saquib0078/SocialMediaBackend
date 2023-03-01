import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import { Modal, Pagination } from "antd";
import CommentsForm from "../../components/forms/CommentsForm";
import Search from "../../components/Search";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  // pagination
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });

      setComment("");
      setVisible(false);
      fetchUserPosts();
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
      // console.log("comment removed", data);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.token) {
      fetchUserPosts();
      findPeople();
    }
  }, [state && state.token, page]);

  // for posts count

  useEffect(() => {
    try {
      axios.get("/total-posts").then(({ data }) => setTotalPosts(data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/posts/${page}`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create-post", { content, image });

      if (data.error) {
        toast.error(data.error);
      } else {
        setPage(1);
        fetchUserPosts();
        toast.success("Post created");
        setContent("");
        setImage({});
      }
    } catch (err) {
      console.log(err);
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

      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);

      toast.error("Post deleted!");

      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });

      //update local storage, update user, keep token

      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context

      setState({ ...state, user: data });

      //update people state

      let filtered = people.filter((p) => p._id !== user._id);

      setPeople(filtered);

      //rerender the posts in news feed

      fetchUserPosts();
      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    try {
      const { data } = await axios.put("/like-post", { _id });
      // console.log(data);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnLike = async (_id) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id });
      // console.log(data);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light backgroundHeaderTopLeft">
          <div className="col text-center">
            <h1 className=" glow">News Feed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />

            <PostList
              handleLike={handleLike}
              handleUnLike={handleUnLike}
              handleFollow={handleFollow}
              posts={posts}
              handleDelete={handleDelete}
              handleComment={handleComment}
              removeComment={removeComment}
            />

            <Pagination
              current={page}
              total={Math.floor((totalPosts / 3) * 10)}
              onChange={(value) => setPage(value)}
              className="pb-5"
            />
          </div>

          <div className="col-md-4">
            <Search />
            <br />
            {state && state.user && state.user.following && (
              <Link className="" to={`/user/following`}>
                {state.user.following.length} Following
              </Link>
            )}

            <People handleFollow={handleFollow} people={people} />
          </div>
        </div>

        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={null}
        >
          <CommentsForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRoute>
  );
};

export default Dashboard;
