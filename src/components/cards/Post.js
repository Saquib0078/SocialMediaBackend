import HTMLRenderer from "react-html-renderer";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import {
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import { imageSource } from "../../functions";
import "./post.scss";

const Post = ({
  post,
  handleDelete,
  handleLike,
  handleUnLike,
  handleComment,
  commentsCount = 10,
  removeComment,
  page = false,
}) => {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  return (
    <>
      {post && post.postedBy && (
        <>
          <div key={post._id} className="card mb-5">
            <div className="card-header">
              <Avatar size={40} src={imageSource(post.postedBy)} />
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {post.postedBy.name}
              </span>
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body postCard">
              <HTMLRenderer html={post.content} />
            </div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              <div className="d-flex pt-2">
                {state &&
                state.user &&
                post.likes &&
                post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleUnLike(post._id)}
                    className="text-danger pt-2 h5 px-2"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleLike(post._id)}
                    className="text-danger pt-2 h5 px-2"
                  />
                )}

                <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                  {post.likes.length} likes
                </div>
                <CommentOutlined
                  onClick={() => handleComment(post)}
                  className="text-danger pt-2 h5 px-2"
                />
                <div className="pt-2 pl-3">
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/post/${post._id}`}
                  >
                    {post.comments.length} comments
                  </Link>
                </div>
                {state &&
                  state.user &&
                  state.user._id === post.postedBy._id && (
                    <>
                      <EditOutlined
                        onClick={() => navigate(`/user/post/${post._id}`)}
                        className="text-danger pt-2 h5 px-2 mx-auto"
                      />
                      <DeleteOutlined
                        onClick={() => handleDelete(post)}
                        className="text-danger pt-2 h5 px-2"
                      />
                    </>
                  )}
              </div>
            </div>

            {post.comments && post.comments.length > 0 && (
              <ol
                className="list-group"
                style={{
                  maxHeight: `${page ? "unset" : "160px"}`,
                  overflow: `${page ? "unset" : "scroll"} `,
                }}
              >
                {post.comments.slice(0, commentsCount).map((c) => (
                  <li
                    key={c._id}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div>
                        <Avatar
                          size={20}
                          className="mb-1 mr-3"
                          src={imageSource(c.postedBy)}
                        />
                        &nbsp;{c.postedBy.name}
                      </div>
                      <i className="text-muted">{c.text}</i>
                    </div>
                    <span className="badge rounded-pill text-muted">
                      {moment(c.created).fromNow()}
                      {state &&
                        state.user &&
                        state.user._id === post.postedBy._id && (
                          <>
                            <DeleteOutlined
                              onClick={() => removeComment(post._id, c)}
                              className="text-danger pt-2 h5 px-2"
                            />
                          </>
                        )}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Post;
