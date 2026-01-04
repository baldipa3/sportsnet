import { AppRoutes } from "@/routes";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
