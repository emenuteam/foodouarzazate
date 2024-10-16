import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Root from "./Root";
import AllMeals from "./pages/meal/AllMeals";
import AllCategories from "./pages/category/AllCategories";
import Signinpage from "./Sign-in-page";
import PrivateRoute from './PrivateRoute'; 
import Profile from "./components/Profile";
import Allowlist from "./components/Allowlist/Allowlist";
import Settings from "./pages/Settings";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
     
      {
        path: "/all-meals",
        element: <PrivateRoute element={<AllMeals />} />,
      },
      
      {
        path: "/",
        element: <PrivateRoute element={<AllCategories />} />,
      },
      {
        path: "/allowlists",
        element: <PrivateRoute element={<Allowlist />} requiredRole="Owner" />,
      },
      {
        path: "profile",
        element: <PrivateRoute element={<Profile />} />
      },
      {
        path: "/settings",
        element: <PrivateRoute element={<Settings />} />
      },
      {
        path: "admin/sign-in",
        element: <Signinpage />,
      },
      {
        path: "*",
        element: <Navigate to="/admin/sign-in" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
