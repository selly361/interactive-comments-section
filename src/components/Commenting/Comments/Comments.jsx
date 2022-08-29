import React, {
  useEffect,
  useState,
  createContext,
  Fragment,
  useRef,
} from "react";
import Comment from "../Comment/Comment";
import ReplyComment from "../Comment/ReplyComment";
import "./comments.styles.scss";
import commentsData from "../../../assets/data.json";
import { v4 as uuid } from "uuid";
import moment from "moment";

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

  const formRef = useRef();

  const scrollToBottom = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments.length]);


  useEffect(() => {
    setTimeout(() => {
      let copy = comments;
      let foundcomment = copy.filter(com => com.created)
      foundcomment.map(c => c.createdAt = (moment(c.created).fromNow()))
      localStorage.setItem("comments", JSON.stringify(copy))
    }, 1000)


    return () => clearTimeout()
  })




  const handleSubmit = (e) => {
    e.preventDefault();
    let copy = comments;

    let id = uuid()

    copy = [
      ...copy,
      {
        id: id,
        content: text,
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
        edit: false
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
                <ReplyComment {...comment} comment={comment} />
              ))}
            </div>
          </Fragment>
        ))}
        <form onSubmit={handleSubmit} ref={formRef}>
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
