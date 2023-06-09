import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import AddAClass from "../Pages/InstuctorDashboard/AddAClass/AddAClass";
import MyClasses from "../Pages/InstuctorDashboard/MyClasses";
import ManageClasses from "../Pages/AdminDashboard/ManageClasses";
import Feedback from "../Pages/AdminDashboard/Feedback";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/instructors',
          element:<Instructors></Instructors>
        },
        {
          path:'/classes',
          element:<Classes></Classes>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'addclass',
          element:<AddAClass></AddAClass>
        },
        {
          path:'myclasses',
          element:<MyClasses></MyClasses>
        },
        {
          path:'manageclasses',
          element:<ManageClasses></ManageClasses>
        },
        {
          path:'feedback/:id',
          element:<Feedback></Feedback>,
          loader:({params})=>fetch(`http://localhost:5000/pendingclasses/${params.id}`)
        }
      ]

    }
  ]);

  export default router