import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
function CreatePost() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    let navigate = useNavigate(); 
    const initialValues={
        title:"",
        postText:"",
        username:""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required()
    })
    const onSubmit = (data) => {
        axios.post(backendUrl + "/posts", data).then((response) => {
            navigate("/");
          })
    }


  return (
    <div className="createPostPage">
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema} 
        >
            <Form className="formContainer">
                <label>Title:</label>
                <ErrorMessage name="title" component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="(Ex. Title...)"
                />
                <label>Post:</label>
                <ErrorMessage name="postText" component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="postText" 
                    placeholder="(Ex. Post...)"
                />
                <label>Username:</label>
                <ErrorMessage name="username" component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="username" 
                    placeholder="(Ex. John123...)"
                />
                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost