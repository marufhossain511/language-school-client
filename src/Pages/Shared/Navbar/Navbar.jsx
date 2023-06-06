import { NavLink } from 'react-router-dom';
import logo from '../../../assets/Home/Logo/logo2.jpg'
const Navbar = () => {

    const navItems=<>
    <li className='text-lg'><NavLink to='/' className={({ isActive }) => (isActive ? 'text-blue-500' : '')} >Home</NavLink></li>
    <li className='text-lg'><NavLink to='/instructors' className={({ isActive }) => (isActive ? 'text-blue-500' : 'inactive')} >Instructors</NavLink></li>
    <li className='text-lg'><NavLink to='/classes' className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Classes</NavLink></li>
    <li className='text-lg'><NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Dashboard</NavLink></li>
    </>

    return (
        <div className='my-4'>
            <div className="navbar fixed z-10 bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
         {navItems}
      </ul>
    </div>
     <div className='flex justify-center items-center'>
        <div>
        <img className='h-16'  src={logo} alt="logo" />
        </div>
        <div>
        <a className=""><span className="text-3xl font-bold font-mono text-blue-900"> Language</span> <span className="text-2xl font-mono text-blue-700">School</span></a>
        </div>
     </div>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1">
      {navItems}
    </ul>
  </div>
  <div className="navbar-end">
       <div className="w-10 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
  </div>
</div>
        </div>
    );
};

export default Navbar;