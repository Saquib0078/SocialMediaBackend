import React from "react";

const CommentsForm = ({addComment, comment, setComment}) => {
  return (
    <>
      <form onSubmit={addComment}>
        <input
          type="text"
          className="form-control"
          placeholder="Write something..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn btn-primary btn-sm btn-block mt-3">Add</button>
      </form>
    </>
  );
};

export default CommentsForm;
