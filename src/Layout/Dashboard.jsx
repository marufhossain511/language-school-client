import { NavLink, Outlet } from "react-router-dom";
import {FaBook, FaCheck, FaFolderPlus, FaHome, FaRegFolderOpen, FaRegSun, FaUsersCog, FaWallet} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const Dashboard = () => {
    const {user,loading}=useContext(AuthContext)
    const {data:users=''} = useQuery({
        queryKey: ['users',user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const response= await axios.get(`http://localhost:5000/users/${user?.email}`)
            return response.data
        },
      })
    //   console.log(users.role);
    return (
        <div>
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Outlet></Outlet>
            <label htmlFor="my-drawer-2" className="btn btn-accent drawer-button lg:hidden">Open SideBar</label>
        </div> 
        <div className="drawer-side">
            
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <ul className="menu p-4 pt-40 w-80 h-full bg-accent-focus  text-black">
            <div className="avatar mb-6 text-center flex flex-col">
            <div className="w-36  mb-5 mx-auto rounded-full">
                <img  src={users?.image} />
            </div>
            <h2 className="text-2xl text-mono">Name: {users.name}</h2>
            <p className="text-xl text-mono">Role: {users.role}</p>
            </div>
            {/* Sidebar content here */}
            {
                users.role === 'instructor' && 
                <>
                <li className="text-lg font-mono font-bold"><NavLink to='/dashboard/addclass' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaFolderPlus/> Add a Class</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/dashboard/myclasses' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaRegFolderOpen/> My Classes</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/' className={({ isActive }) => (isActive ? 'text-blue-500' : '')} ><FaHome/> Home</NavLink></li>
                
                </>
            }

            {
                users.role === 'admin' && 
                <>
                <li className="text-lg font-mono font-bold"><NavLink to='/dashboard/manageclasses' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaRegSun/> Manage Classes</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/dashboard/manageusers' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaUsersCog/> Manage Users</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaHome/> Home</NavLink></li>
                </>
            }

            {
                users.role === 'user' && 
                <>
                <li className="text-lg font-mono font-bold"><NavLink to='/dashboard/selectedclasses' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaCheck/> My Selected Classes</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/dashboard/enrolledclasses' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaBook/> My Enrolled Classes</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/dashboard/paymenthistory' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaWallet/> Payment History</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/' className={({ isActive }) => (isActive ? 'text-white' : '')} ><FaHome/> Home</NavLink></li>
                
                </>
            }

            </ul>
        
        </div>
        </div>
        </div>
    );
};

export default Dashboard;