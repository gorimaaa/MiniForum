import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
      axios.get(backendUrl + "/posts").then((response) => {
        setListOfPosts(response.data);
      })
    }, [])

    return (
        <div>{listOfPosts.map((value, key) => {
          return <div className="post" value ={key} onClick={() => (navigate(`/post/${value.id}`))}>
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
            </div>
        })}</div>
    );
}

export default Home