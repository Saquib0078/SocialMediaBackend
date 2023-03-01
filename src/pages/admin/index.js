import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

import axios from "axios";
import { toast } from "react-toastify";
import AdminRoute from "../../components/routes/AdminRoute";
import HTMLRenderer from "react-html-renderer";

const Admin = () => {
  const [state] = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (state && state.token) {
      fetchUserPosts();
    }
  }, [state && state.token]);

  // for posts count

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);

      toast.error("Post deleted!");

      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row py-5 backgroundHeaderTopLeft">
          <div className="col text-center">
            <h1 className="glow">ADMIN</h1>
          </div>
        </div>

        <div className="row py-4">
          <div className="col-md-8 offset-md-2">
            {posts &&
              posts.map((post) => (
                <>
                  <div
                    key={post._id}
                    className="d-flex justify-content-between"
                  >
                    <div>
                      {<HTMLRenderer html={post.content} />}

                      {post && post.image && (
                        <img src={post.image.url} alt="" />
                      )}

                      <p>Comments:</p>

                      {post &&
                        post.comments.map((comment, i) => (
                          <>
                            <div key={comment._id}>
                              {i + 1} : {comment.text}
                            </div>
                            <div
                              onClick={() => console.log("Delete cclicked")}
                              className="text-danger"
                            >
                              Delete
                            </div>
                          </>
                        ))}
                    </div>
                    <div
                      onClick={() => handleDelete(post)}
                      className="text-danger"
                    >
                      Delete
                    </div>
                  </div>

                  <div
                    style={{ height: "1px", backgroundColor: "black" }}
                  ></div>
                </>
              ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
