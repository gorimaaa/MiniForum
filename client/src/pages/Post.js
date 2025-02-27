import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext'
function Post() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext); 
    useEffect(() => {
        axios.get(backendUrl + `/posts/byId/${id}`).then((response) => {
          setPostObject(response.data);
        });

        axios.get(backendUrl + `/comments/${id}`).then((response) => {
          setComments(response.data);
        });
    }, []);


  const addComment = (() =>  {
    axios
    .post(backendUrl + "/comments", {
      commentBody: newComment,
       PostId: id },
       {
        headers:{
          accessToken: localStorage.getItem('accessToken')
        }
       })
    .then((response) => {
      if(response.data.error){
        alert(response.data.error);
      }else{
        const commentToAdd = {commentBody : newComment, username: response.data.username};
        setComments([...comments, commentToAdd]);
        setNewComment("")
      }
    }) 
  });
  const deleteComment = (id) => {
    axios.delete(`${backendUrl}/comments/${id}`, {
      headers:{
        accessToken: localStorage.getItem('accessToken')
      }
    }).then(() => {
      setComments(comments.filter((val) => {
        return val.id !== id;
      }))
    });
  }
  return (
  
    <div className="postPage">
      {console.log("oui")}
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input 
          type="text" 
          placeholder="Comment..." 
          value={newComment}
          onChange={(event) =>(setNewComment(event.target.value))} />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return <div key={key} className="comment">{comment.commentBody}
                    
                    
                    </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Post