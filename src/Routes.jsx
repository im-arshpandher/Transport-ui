import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
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
        index: true, // Redirect /admin to /admin/dashboard
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
const Routes = () => {
  return (
    <div>Routes</div>
  )
}

export default Routes