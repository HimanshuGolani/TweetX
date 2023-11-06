import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MyPosts from "./pages/MyPosts";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/login";
import "./App.css";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
function App() {
  const [isAuth, setisAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setisAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <BrowserRouter>
      <nav className="shift">
        <h1 className="logo">TweetX</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createpost">Create-Post</Link>
          </li>
          <li>
            <Link to="/myposts">My Posts</Link>
          </li>
          <li>
            {!isAuth ? (
              <>
                <Link to="/login">Login</Link>
              </>
            ) : (
              <Link onClick={signUserOut}>Log Out</Link>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setisAuth} />} />
        <Route path="/myposts" element={<MyPosts isAuth={isAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
