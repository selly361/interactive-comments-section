import { Fragment, useContext, useState, useRef, useEffect } from "react";
import Vote from "../../ui/Votes/Vote";
import { CommentsProvider } from "../Comments/Comments";
import "./comment.styles.scss";
import { ReactComponent as ReplyIcon } from "../../../assets/images/icon-reply.svg";
import { ReactComponent as EditIcon } from "../../../assets/images/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/images/icon-delete.svg";
import { v4 as uuid } from "uuid";

const Comment = ({
  id,
  content,
  createdAt,
  votes,
  user,
  edit,
  reply,
  replyClass,
  isReplyComment = false,
}) => {
  const { comments, setComments, currentUser } = useContext(CommentsProvider);
  const [replyText, setReplyText] = useState("");


  let updateUi = (copy) => {
    localStorage.setItem("comments", JSON.stringify(copy));
    setComments(JSON.parse(localStorage.getItem("comments")));

    if(JSON.stringify(comments) !== localStorage.getItem("comments")){
      setComments(copy);
    }
  }


  const handleDelete = () => {
    let copy = comments;
    copy = copy.filter((c) => c.id !== id);

    updateUi(copy)
  };

  const [updatedText, setUpdatedText] = useState(content);

  const handleEdit = () => {
    let copy = comments;

    let found = copy.filter((copy) => copy.id === id)[0];
    found.edit = !found.edit;
    console.log(found)

    updateUi(copy)

  };


  const handleReplyClick = () => {
    let copy = comments;

    let found = copy.filter((copy) => copy.id === id)[0];
    found.reply = !found.reply;
  
    updateUi(copy)

  }


  const handleUpdate = () => {
    let copy = comments;

    let found = copy.filter((copy) => copy.id === id)[0];

    found.content = updatedText;
    found.edit = false;

    updateUi(copy)

  };




  const handleReplySubmit = (e) => {
    e.preventDefault()
    let copy = comments;

    let comment = copy.find(c => c.id === id);
    comment.replies.push(
      {
        id: uuid(),
        content: replyText,
        created: new Date(),
        createdAt: 'a few seconds ago',
        votes: 0,
        user: {
          image: {
            png: "../../../assets/avatars/image-juliusomo.png",
          },
          username: "juliusomo",
        },
        replies: [],
        edit: false,
        reply: true
    })
    

    localStorage.setItem("comments", JSON.stringify(copy));
    setComments(JSON.parse(localStorage.getItem("comments")));

     copy = comments;

    let found = copy.filter((copy) => copy.id === id)[0];
    found.reply = false;
  
    updateUi(copy)


  }



  return (
    <Fragment>
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
                  <h2 className="blue-icon" onClick={handleReplyClick}>
                    <ReplyIcon />
                    Reply
                  </h2>
                </Fragment>
              )}
            </div>
          </div>
          {edit ? (
            <div className="content-section">
              <textarea
                onChange={(e) => setUpdatedText(e.target.value)}
                className="edit-textarea"
              >
                {updatedText}
              </textarea>
              <button className="update-button" onClick={handleUpdate}>
                UPDATE
              </button>
            </div>
          ) : (
            <div className="content-section">
              <p>{content}</p>
            </div>
          )}
        </div>
      </div>
      {reply && (
        <form onSubmit={handleReplySubmit}>
          <img src={currentUser.image.png} />
          <fieldset>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button>REPLY</button>
          </fieldset>
        </form>
      )}
    </Fragment>
  );
};

export default Comment;
