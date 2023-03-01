import Post from "./Post";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnLike,
  handleComment,
  removeComment,
}) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
            handleComment={handleComment}
            removeComment={removeComment}
          />
        ))}
    </>
  );
};

export default PostList;
