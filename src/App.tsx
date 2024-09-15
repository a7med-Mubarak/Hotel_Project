import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./modules/Shared/Components/AuthLayout/AuthLayout"
import Notfound from "./modules/Shared/Components/Notfound/Notfound"
import Login from "./modules/Auth/Components/Login/Login"
import Register from "./modules/Auth/Components/Register/Register"
import ChangePass from "./modules/Auth/Components/ChangePass/ChangePass"
import ForgetPass from "./modules/Auth/Components/ForgetPass/ForgetPass"
import RestPass from "./modules/Auth/Components/RestPass/RestPass"
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout"
import Ads from "./modules/Admin/Components/Ads/Components/Ads"
import Booking from "./modules/Admin/Components/Booking/Components/Booking"
import Home from "./modules/Admin/Components/Home/Components/Home"
import Users from "./modules/Admin/Components/Users/componentes/Users"

function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        { path: "login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "ChangePass", element: <ChangePass /> },
        { path: "ForgetPass", element: <ForgetPass /> },
        { path: "RestPass", element: <RestPass /> },
      ],
    },
    {
      path: "",
      element: <MasterLayout />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "", element: <Home /> },
        { path: "Ads", element: <Ads /> },
        { path: "Booking", element: <Booking /> },
        { path: "Home", element: <Home /> },
        { path: "Users", element: <Users /> },
      ],
    },

    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "", element: <Home /> },
        { path: "Ads", element: <Ads /> },
        { path: "Booking", element: <Booking /> },
        { path: "Home", element: <Home /> },
        { path: "Users", element: <Users /> },
      ],
    },
  ])

  return <RouterProvider router={routers}></RouterProvider>
}

export default App
