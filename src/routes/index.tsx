import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "../pages/Landing";
import Sports from "../pages/Sports";
import SportShow from "../pages/Sports/Show";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../components/AppLayout";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes Wrapped in AppLayout */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* Nested Private Routes */}
          <Route path="sports" element={<Sports />} />
          <Route path="sports/:id" element={<SportShow />} />

          {/* Default Redirect for Private Routes */}
          <Route path="*" element={<Navigate to="sports" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
