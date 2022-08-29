import { useContext } from "react";
import Vote from "../../ui/Votes/Vote";
import { CommentsProvider } from "../Comments/Comments";
import "./comment.styles.scss";
import { ReactComponent as ReplyIcon } from "../../../assets/images/icon-reply.svg";

const Comment = ({ id, content, createdAt, votes, user, replies }) => {
  const { comments, setComments } = useContext(CommentsProvider);

  return (
    <div className="comment-container">
      <div className="vote-wrapper">
        <Vote
          votes={votes}
          setComments={setComments}
          comments={comments}
          id={id}
        />
      </div>
      <div className="user-container">
        <div  className="top-section">
          <div>
            <div>
              <img
                src={require(`../../../assets/avatars/image-${user.username}.png`)}
              />
              <h2 className="username">{user.username}</h2>
            </div>
            <span>{createdAt}</span>
          </div>
          <ReplyIcon />
        </div>
        <div className="content-section">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
