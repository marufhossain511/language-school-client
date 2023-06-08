import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    const isInstructor=true;

    return (
        <div>
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Outlet></Outlet>
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        </div> 
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <ul className="menu p-4 pt-40 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {
                isInstructor && 
                <>
                <li className="text-lg font-mono font-bold"><NavLink to='/dashboard/addclass' className={({ isActive }) => (isActive ? 'text-blue-500' : '')} >Add a Class</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/myclass' className={({ isActive }) => (isActive ? 'text-blue-500' : '')} >My Classes</NavLink></li>
                <li className="text-lg font-mono font-bold"><NavLink to='/' className={({ isActive }) => (isActive ? 'text-blue-500' : '')} >Home</NavLink></li>
                
                </>
            }
            </ul>
        
        </div>
        </div>
        </div>
    );
};

export default Dashboard;