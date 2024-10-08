import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import testData from "./data/taladrod-cars.min.json";
import mainData from "./data/taladrod-cars.json";

import Navbar from "./pages/components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Highlights from "./pages/Highlights.jsx";
import Footer from "./pages/components/Footer.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard data={testData} /> },
      { path: "/highlights", element: <Highlights data={testData} /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
