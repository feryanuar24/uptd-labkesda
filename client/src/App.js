import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import NotFound from "./pages/other/NotFound";
import IndexSampel from "./pages/sampel/IndexSampel";
import CreateSampel from "./pages/sampel/CreateSampel";
import ShowSampel from "./pages/sampel/ShowSampel";
import EditSampel from "./pages/sampel/EditSampel";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
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
        <Route path="*" Component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
