import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "../pages/Landing";
import SportShow from "../pages/Sports";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../components/layout/MainLayout";
import Register from "../pages/Register";
import CitySelection from "../pages/Onboarding/CitySelection";
import SportSelection from "../pages/Onboarding/SportSelection";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes Wrapped in AppLayout */}
        <Route
          path="onboarding/city"
          element={
            <PrivateRoute>
              <CitySelection />
            </PrivateRoute>
          }
        />
        <Route
          path="onboarding/sport"
          element={
            <PrivateRoute>
              <SportSelection />
            </PrivateRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* Nested Private Routes */}
          <Route
            path="sports/:sport_slug/cities/:city_slug"
            element={<SportShow />}
          />

          {/* Default Redirect for Private Routes */}
          <Route
            path="*"
            element={<Navigate to="sports/:sport_slug/cities/:city_slug" />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
