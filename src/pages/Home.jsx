import React, { useEffect, useState } from "react";
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Loader from "../Components/Loader";
const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const postCollectionRefRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRefRef);
      setPostList(data.docs.map((item) => ({ ...item.data(), id: item.id })));
      setLoading(false);
    };
    getPosts();
  });

  const deletePost = async (id) => {
    setLoading(true);
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
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
  );
};

export default Home;
