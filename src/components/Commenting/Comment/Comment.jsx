import { Fragment, useContext, useState } from "react";
import Vote from "../../ui/Votes/Vote";
import { CommentsProvider } from "../Comments/Comments";
import "./comment.styles.scss";
import { ReactComponent as ReplyIcon } from "../../../assets/images/icon-reply.svg";
import { ReactComponent as EditIcon } from "../../../assets/images/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/images/icon-delete.svg";

const Comment = ({
  id,
  content,
  createdAt,
  votes,
  user,
  edit,
  replyClass,
  isReplyComment = false,
}) => {
  const { comments, setComments } = useContext(CommentsProvider);

  const handleDelete = () => {
    let copy = comments;
    copy = copy.filter((c) => c.id !== id);

    localStorage.setItem("comments", JSON.stringify(copy));
    setComments(copy);
  };

  const [updatedText, setUpdatedText] = useState(content)

  const handleEdit = () => {
    let copy = comments;

    let found = copy.filter((copy) => copy.id === id)[0];
    found.edit = !found.edit;

    
    localStorage.setItem("comments", JSON.stringify(copy));
    setComments(JSON.parse(localStorage.getItem("comments")));
  };


  const handleUpdate = () => {
    let copy = comments;

    let found = copy.filter((copy) => copy.id === id)[0];

    found.content = updatedText;
    found.edit = false;


    localStorage.setItem("comments", JSON.stringify(copy));
    setComments(JSON.parse(localStorage.getItem("comments")));
  }

  return (
    <div className={`comment-container + ${replyClass}`}>
      <div className="vote-wrapper">
        <Vote
          isReplyComment={isReplyComment}
          votes={votes}
          setComments={setComments}
          comments={comments}
          id={id}
        />
      </div>
      <div className="user-container">
        <div className="top-section">
          <div>
            <div>
              <img
                src={require(`../../../assets/avatars/image-${user.username}.png`)}
              />
              <h2 className="username">{user.username}</h2>
            </div>
            <span>{createdAt}</span>
          </div>
          <div className="functional-buttons">
            {user.username === "juliusomo" ? (
              <Fragment>
                <h2 className="red-icon" onClick={handleDelete}>
                  <DeleteIcon />
                  Delete
                </h2>
                <h2 className="blue-icon" onClick={handleEdit}>
                  <EditIcon />
                  Edit
                </h2>
              </Fragment>
            ) : (
              <Fragment>
                <h2 className="blue-icon">
                  <ReplyIcon />
                  Reply
                </h2>
              </Fragment>
            )}
          </div>
        </div>
        {edit ? (
          <div className="content-section">
            <textarea onChange={(e) => setUpdatedText(e.target.value)} className="edit-textarea">{updatedText}</textarea>
            <button className="update-button" onClick={handleUpdate}>UPDATE</button>
          </div>
        ) : (
          <div className="content-section">
            <p>{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
