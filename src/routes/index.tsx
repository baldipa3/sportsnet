import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Sports from "../pages/Sports";
import SportShow from "../pages/Sports/Show";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/sports" element={<Sports />} />
          <Route path="sports/:id" element={<SportShow />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
