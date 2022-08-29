import React from 'react'
import './vote.styles.scss'
import { ReactComponent as AddIcon } from '../../../assets/images/icon-plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/images/icon-minus.svg';


const Vote = ({ votes, setComments, comments, id, isReply = false }) => {

  const handleVoteClick = (type) => {
    let copy = comments;
    let foundComment = copy.find(comment => comment.id === id);
    if(type == 'upvote'){
      foundComment.votes += 1
    } else if(type == 'downvote'){
      foundComment.votes -= 1
    }

    localStorage.setItem("comments", JSON.stringify(copy))
    setComments(JSON.parse(localStorage.getItem("comments")))
  }


 const handleReplyVote = (type) => {
    let copy = comments;
    let found = copy.filter(comment => comment.replies.length !== 0).map(c => {
      return c.replies.find(c => c.id === id)
    })[0]

    console.log(found)

    if(type == 'upvote'){
      found.votes += 1
    } else if(type == 'downvote'){
      found.votes -= 1
    }

    localStorage.setItem("comments", JSON.stringify(copy))
    setComments(JSON.parse(localStorage.getItem("comments")))

  }

  return (
    <div className="vote-container">
      <AddIcon className="icon" onClick={() => isReply ? handleReplyVote('upvote') : handleVoteClick('upvote')} />
      <h2>{votes}</h2>
      <MinusIcon className="icon" onClick={() =>  isReply ? handleReplyVote('downvote') : handleVoteClick('downvote')} />
    </div>
  )
}

export default Vote