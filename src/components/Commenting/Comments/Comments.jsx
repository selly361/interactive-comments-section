import React, { useEffect, useState, createContext, Fragment } from "react";
import Comment from "../Comment/Comment";
import ReplyComment from "../Comment/ReplyComment";
import "./comments.styles.scss";
import commentsData from "../../../assets/data.json";
import { v4 as uuid } from "uuid";

let updatedCommentsData = commentsData.comments;
updatedCommentsData.map((comment) => {
  comment.id = uuid();
  comment.replies.map((reply) => (reply.id = uuid()));
});

console.log(updatedCommentsData);

export const CommentsProvider = createContext({});

const Comments = () => {
  let data =
    JSON.parse(localStorage.getItem("comments")) || updatedCommentsData;

  const [comments, setComments] = useState(data);
  const [currentUser, setCurrentUser] = useState(commentsData.currentUser);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let copy = comments;

    copy = [
      ...copy,
      {
        id: uuid(),
        content: text,
        votes: 0,
        user: {
          image: {
            png: "../../../assets/avatars/image-juliusomo.png",
          },
          username: "juliusomo",
        },
        replies: []
      },
    ];

    localStorage.setItem("comments", JSON.stringify(copy));
    setComments(JSON.parse(localStorage.getItem("comments")));
  };

  return (
    <CommentsProvider.Provider
      value={{ comments, setComments, currentUser, setCurrentUser }}
    >
      <div className="comments-wrapper">
        {comments.map((comment) => (
          <Fragment key={comment.id}>
            <Comment {...comment} />
            <div className="replies">
              {comment.replies.map((comment) => (
                <ReplyComment {...comment} />
              ))}
            </div>
          </Fragment>
        ))}
        <form onSubmit={handleSubmit}>
          <img src={currentUser.image.png} />
          <fieldset>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button>SEND</button>
          </fieldset>
        </form>
      </div>
    </CommentsProvider.Provider>
  );
};

export default Comments;
