import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import IndexSampel from "../pages/sampel/IndexSampel";
import CreateSampel from "../pages/sampel/CreateSampel";
import ShowSampel from "../pages/sampel/ShowSampel";
import EditSampel from "../pages/sampel/EditSampel";
import PrivateRoute from "../components/Auth/PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <IndexSampel />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateSampel />
            </PrivateRoute>
          }
        />
        <Route
          path="/show/:id"
          element={
            <PrivateRoute>
              <ShowSampel />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditSampel />
            </PrivateRoute>
          }
        />
        <Route path="*" Component={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
