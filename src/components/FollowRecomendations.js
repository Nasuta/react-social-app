import axios from "axios";
import { useEffect, useState } from "react";
import "./FollowRecomendations.css";

const FollowRecomendations = (props) => {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = () => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/recommendations")
      .then((res) => {
        setRecommendations(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRecommendations();
  }, [props.posts]);

  const follow = (id) => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/follow", {
        leader_id: id,
      })
      .then(() => {
        getRecommendations();
        props.getLatestPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="followRecomendations">
      {recommendations.map((recommendation) => {
        return (
          <div className="followRecommendation" key={recommendation.id}>
            <img
              src={recommendation.avatar_url}
              alt={recommendation.username}
            />
            <h3>{recommendation.username}</h3>
            <button
              className="btn follow"
              onClick={() => follow(recommendation.id)}
            >
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowRecomendations;
