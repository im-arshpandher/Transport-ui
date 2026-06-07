import React, { useEffect } from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Quote from "./pages/Quote";
import Services from "./pages/Services";
import About from "./pages/About";
import Login from './pages/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
// import Admin from "./admin/Admin,jsx";
import Admin from "./admin/Admin";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import Messages from "./admin/pages/Messages";
import Settings from "./admin/pages/Settings";
import ServicesAdmin from "./admin/pages/ServicesAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from 'react-redux';
import { checkLoginStatus } from './utils/auth';
import Candidates from "./admin/pages/Candidates";
import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import Navbar from "./common/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
  {
    path: "/quote",
    element: <Quote />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/*",
    element: (<ProtectedRoute><Admin /></ProtectedRoute>),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "services", element: <ServicesAdmin /> },
      { path: "messages", element: <Messages /> },
      { path: "candidates", element: <Candidates /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  // {
  //   path: "/auth/admin",
  //   element: (
  //     <GuardAuth>
  //       <Register />
  //     </GuardAuth>
  //   ),
  // },
]);
const App = () => {
  const dispatch = useDispatch();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    checkLoginStatus(dispatch);

    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <RouterProvider router={router} />
      {showTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 1000,
            padding: "10px 10px",
            borderRadius: "50%",
            border: "none",
            background: "#333",
            color: "#fff",
            cursor: "pointer",
            fontSize: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
          aria-label="Scroll to top"
        >
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AiOutlineArrowUp />
          </span>
        </button>
      )}
    </div>
  );
};

export default App;
