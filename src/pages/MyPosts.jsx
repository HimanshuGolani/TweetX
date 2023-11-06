import React, { useState, useEffect } from "react";
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../App.css";

const MyPosts = ({ isAuth }) => {
  const [posts, setPosts] = useState([]);
  const [myposts, setMyPosts] = useState([]);

  const postCollectionRefRef = collection(db, "posts");

  // Function to filter posts based on current user's ID and similarity to other users' IDs
  const filterUserPosts = () => {
    if (posts.length > 0) {
      const currentUserID = auth.currentUser.uid;
      const filteredPosts = posts.filter(
        (post) =>
          post.author.id === currentUserID ||
          post.author.id.startsWith(currentUserID)
      );
      setMyPosts(filteredPosts);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRefRef);
      setPosts(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    };
    getPosts();
  }, [postCollectionRefRef]);

  useEffect(() => {
    filterUserPosts();
  }, [posts]);

  const deletePost = async (postId) => {
    // Function to delete the post by ID
    try {
      await deleteDoc(doc(db, "posts", postId));
      // After deleting, update the posts state to reflect the changes
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      alert("Error Deleting the item");
    }
  };

  return (
    <>
      {myposts.length === 0 ? (
        <h1>No Posts till now </h1>
      ) : (
        <div className="homePage">
          {myposts.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="postHeader">
                  <div className="title">
                    <h1>{post.title}</h1>
                  </div>
                  <div className="deletePost">
                    {post.author.id === auth.currentUser.uid && (
                      <button
                        onClick={() => {
                          deletePost(post.id);
                        }}
                      >
                        &#128465;
                      </button>
                    )}
                  </div>
                </div>
                <div className="postTextContainer">{post.postText}</div>
                <h3>@{post.author.name}</h3>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyPosts;
