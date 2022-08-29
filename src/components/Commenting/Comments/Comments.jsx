import React, { useEffect, useState, createContext, Fragment } from "react";
import Comment from "../Comment/Comment";
import "./comments.styles.scss";
import commentsData from "../../../assets/data.json";
import { v4 as uuid } from "uuid";

let updatedCommentsData = commentsData.comments;
updatedCommentsData.map((comment) => {
  comment.id = uuid();
  comment.replies.map((reply) => (reply.id = uuid()));
});


export const CommentsProvider = createContext({})

const Comments = () => {
  let data = JSON.parse(localStorage.getItem("comments")) || updatedCommentsData;



  const [comments, setComments] = useState(data);
  const [currentUser, setCurrentUser] = useState(commentsData.currentUser);




  return (
    <CommentsProvider.Provider value={ { comments, setComments, currentUser, setCurrentUser } }>
        <div className="comments-wrapper">
      {comments.map((comment) => (
        <Fragment
          key={comment.id}
        >
        <Comment
          {...comment}
        />
        </Fragment>
      ))}
    </div>
    </CommentsProvider.Provider>
  );
};

export default Comments;
