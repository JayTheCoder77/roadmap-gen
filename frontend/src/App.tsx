import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { getCurrentUser } from "@/redux/authSlice";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCurrentUser()); // Check auth from cookie
  }, []);

  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider router={AppRoutes} />
    </>
  );
}
