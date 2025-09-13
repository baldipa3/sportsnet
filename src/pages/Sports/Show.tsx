// import PostCard from "../../components/PostCard";
import { useLocation } from "react-router-dom";
import { graphql } from "react-relay";

export default function SportPage() {
  const location = useLocation();
  const { cityId, sportId } = location.state || {};

  const posts = graphql`
    query postsByCityAndSport {
      postsByCityAndSport {
        id
        name
        slug
      }
    }
  `;

  console.log(cityId);

  console.log(sportId);

  return <></>;
}
