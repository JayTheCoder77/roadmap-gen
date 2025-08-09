import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";
import { getCurrentUser } from "@/redux/authSlice";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}
