import { useState } from "react";
import axios from "axios";
import "./Post.css";
import "../views/Home.css";

const Post = (props) => {
  const [likeCount, setLikeCount] = useState(props.post.likes.length);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [doesUserLiked, setDoesUserLiked] = useState(
    props.post.likes.filter((like) => like.usermame === props.user?.username)
      .length !== 0
  );
  const DeletePost = (id) => {
    axios
      .post("https://akademia108.pl/api/social-app/post/delete", {
        post_id: id,
      })
      .then((res) => {
        console.log(res.data);
        props.setPosts((posts) => {
          // return posts.filter((post) => post.id !== res.data.post_id);
          return posts.filter((post) => post.id !== id);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const likePost = (id, isLiked) => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/post/" +
          (isLiked ? "dislike" : "like"),
        {
          post_id: id,
        }
      )
      .then(() => {
        setLikeCount(likeCount + (isLiked ? -1 : 1));
        setDoesUserLiked(!isLiked);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const unfollow = (id) => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/disfollow", {
        leader_id: id,
      })
      .then(() => {
        props.getLatestPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="post">
      <div className="avatar">
        <img src={props.post.user.avatar_url} alt={props.post.user.username} />
      </div>
      <div className="postData">
        <div className="postMeta">
          <div className="author">{props.post.user.username}</div>
          <div className="date">
            {props.post.user.created_at.substring(0, 10)}
          </div>
        </div>
        <div className="postContent">{props.post.content}</div>

        <div className="likes">
          {props.user?.username === props.post.user.username && (
            <button
              className="btn delete"
              onClick={() => setDeleteModalVisible(true)}
            >
              Delete post
            </button>
          )}

          {props.user && props.user.username !== props.post.user.username && (
            <button
              className=" btn unfollowBtn"
              onClick={() => unfollow(props.post.user.id)}
            >
              Unfollow
            </button>
          )}

          {props.user && (
            <button
              className=" btn likesBtn"
              onClick={() => likePost(props.post.id, doesUserLiked)}
            >
              {doesUserLiked ? "Dislike" : "Like"}
            </button>
          )}

          {likeCount}
        </div>
      </div>
      {deleteModalVisible && (
        <div className="deleteConfirmation">
          <h2>Are you sure you want to delete the post?</h2>
          <button className="btn yes" onClick={() => DeletePost(props.post.id)}>
            Yes
          </button>
          <button
            className="btn no"
            onClick={() => setDeleteModalVisible(false)}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};
export default Post;

{
  /* <button className="btn yes" onClick={() => DeletePost(props.post_id)}> */
}
