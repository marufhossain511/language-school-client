import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";
import useUsersRole from "../hooks/useUsersRole";

const AdminRoutes = ({children}) => {
    const [users,isUserLoading]=useUsersRole()
    const admin = users.role == "admin"
    const{user,loading}=useContext(AuthContext)
    if(loading || isUserLoading){
        return  <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
        <h2 className="text-3xl ml-2">Loading...</h2>
      </div>
    }
    if(user && admin){
        return children
    }

   return <Navigate to='/'></Navigate>
};

export default AdminRoutes;