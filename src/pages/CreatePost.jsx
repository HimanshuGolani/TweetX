import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRefRef = collection(db, "posts");

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRefRef, {
      title: title,
      postText: postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navigate("/");
  };

  if (isAuth) {
    return (
      <div className="createPostPage">
        <div className="cpContainer">
          <h1>Create A Post</h1>
          <div className="inputGp">
            <label>Title:</label>
            <input
              type="text"
              placeholder="Tittle..."
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label>Post:</label>
            <textarea
              placeholder="Post.."
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            ></textarea>
          </div>
          <button onClick={createPost}>Submit Post</button>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h3>PLease Login first</h3>
      </>
    );
  }
};

export default CreatePost;
