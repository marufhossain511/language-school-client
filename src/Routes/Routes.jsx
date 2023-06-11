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
import UpdateClass from "../Pages/InstuctorDashboard/UpdateClass/UpdateClass";
import ManageUser from "../Pages/AdminDashboard/ManageUser";
import MySelectedClasses from "../Pages/UserDashboard/MySelectedClasses";
import Payment from "../Pages/UserDashboard/Payment/Payment";
import MyEnrolledClasses from "../Pages/UserDashboard/MyEnrolledClasses";
import PrivateRoutes from "./PrivateRoutes";
import PaymentHistory from "../Pages/UserDashboard/PaymentHistory";
import ErrorPage from "../Pages/ErroPage/ErrorPage";
import AdminRoutes from "./AdminRoutes";
import InstructorRoutes from "./InstructorRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
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
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children:[
        {
          path:'addclass',
          element:<InstructorRoutes><AddAClass></AddAClass></InstructorRoutes>
        },
        {
          path:'myclasses',
          element:<InstructorRoutes><MyClasses></MyClasses></InstructorRoutes>
        },
        {
          path:'manageclasses',
          element:<AdminRoutes><ManageClasses></ManageClasses></AdminRoutes>
        },
        {
          path:'feedback/:id',
          element:<Feedback></Feedback>,
          loader:({params})=>fetch(`https://summer-camp-school-server-hazel.vercel.app/pendingclasses/${params.id}`)
        },
        {
          path:'update/:id',
          element:<UpdateClass></UpdateClass>,
          loader:({params})=>fetch(`https://summer-camp-school-server-hazel.vercel.app/pendingclasses/${params.id}`)
        },
        {
          path:'manageusers',
          element:<AdminRoutes><ManageUser></ManageUser></AdminRoutes>
        },
        {
          path:'selectedclasses',
          element:<MySelectedClasses></MySelectedClasses>
        },
        {
          path:'payments/:id',
          element:<Payment></Payment>,
          loader:({params})=>fetch(`https://summer-camp-school-server-hazel.vercel.app/payment/${params.id}`)
        },
        {
          path:'enrolledclasses',
          element:<MyEnrolledClasses></MyEnrolledClasses>
        },
        {
          path:'paymenthistory',
          element:<PaymentHistory></PaymentHistory>
        }
      ]

    }
  ]);

  export default router