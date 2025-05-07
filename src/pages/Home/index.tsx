import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1 className="text-white">Home Page</h1>
      <Link to="/sports">Sports</Link>
    </>
  );
};

export default Home;
