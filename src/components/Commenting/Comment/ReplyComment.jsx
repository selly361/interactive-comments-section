import { useContext, Fragment } from "react";
import Vote from "../../ui/Votes/Vote";
import { CommentsProvider } from "../Comments/Comments";
import "./comment.styles.scss";
import { ReactComponent as ReplyIcon } from "../../../assets/images/icon-reply.svg";
import { ReactComponent as EditIcon } from "../../../assets/images/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/images/icon-delete.svg";

const ReplyComment = ({ id, content, createdAt, votes, user }) => {
  const { comments, setComments } = useContext(CommentsProvider);

  const handleDelete = () => {
    let copy = comments;

    let arr = copy.map(item => item.replies).flat()
    let indexToRemove = arr.map(c => c.id).indexOf(id)



    for(let comment of copy){
      if(comment.replies.length){
        comment.replies = comment.replies.flat().filter(c => c.id !== id)
      }
    }
    
    console.log(copy)


    localStorage.setItem("comments", JSON.stringify(copy));
    setComments(JSON.parse(localStorage.getItem("comments")));
  };

  return (
    <div className={`comment-container reply-comment-container`}>
      <div className="vote-wrapper">
        <Vote
          isReply={true}
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
                <h2 className="blue-icon">
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
        <div className="content-section">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
