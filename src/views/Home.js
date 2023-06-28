import { useEffect, useState } from "react";
// import './MenuBar.css';
import "../App.css";
import AddPost from "../components/AddPost";
import axios from "axios";
import Post from "../components/Post";
import FollowRecomendations from "../components/FollowRecomendations.js";

import "./Home.css";

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  const getLatestPosts = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/latest")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getNextPosts = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/older-then", {
        date: posts[posts.length - 1].created_at,
      })
      .then((res) => {
        console.log(res);
        setPosts(posts.concat(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPrevPosts = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/newer-then", {
        date: posts[0].created_at,
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data.concat(posts));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLatestPosts();
  }, [props.user]);

  console.log(props.user);

  return (
    <div className="Home">
      {props.user && <AddPost getPrevPosts={getPrevPosts} />}
      {props.user && (
        <FollowRecomendations
          user={props.user}
          getLatestPosts={getLatestPosts}
          posts={posts}
        />
      )}
      <div className="postList">
        {posts.map((post) => {
          return (
            <Post
              post={post}
              key={post.id}
              user={props.user}
              setPosts={setPosts}
              getPrevPosts={getPrevPosts}
              getLatestPosts={getLatestPosts}
            />
          );
          // return <p>{post.content}</p>
        })}

        <button className="btn loadMore" onClick={getNextPosts}>
          Load more
        </button>
        <h2 className="MenuBarButton">Home</h2>
      </div>
    </div>
  );
};

export default Home;
