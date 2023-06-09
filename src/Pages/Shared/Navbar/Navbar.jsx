import { NavLink } from 'react-router-dom';
import logo from '../../../assets/Home/Logo/logo2.jpg'
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
const Navbar = () => {

  const {user,logOut}=useContext(AuthContext)

  const handleLogOut=()=>{
         logOut()
         .then(()=>{})
         .catch(err=>console.log(err.message))
  }


    const navItems=<>
    <li className='text-lg font-semibold'><NavLink to='/' className={({ isActive }) => (isActive ? 'text-blue-500' : '')} >Home</NavLink></li>
    <li className='text-lg font-semibold'><NavLink to='/instructors' className={({ isActive }) => (isActive ? 'text-blue-500' : 'inactive')} >Instructors</NavLink></li>
    <li className='text-lg font-semibold'><NavLink to='/classes' className={({ isActive }) => (isActive ? 'text-blue-500' : 'inactive')} >Classes</NavLink></li>
    {
      user && <li className='text-lg font-semibold'><NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Dashboard</NavLink></li>
    }
    </>

    return (
        <div className='my-4'>
            <div className="navbar fixed z-10 bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="font-mono  menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
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
  <div className="navbar-center font-mono hidden lg:flex ">
    <ul className="menu menu-horizontal px-1">
      {navItems}
    </ul>
  </div>

  <div className="navbar-end ml-24 justify-normal font-mono text-xl ">
      {
        user? <>
        <button onClick={handleLogOut}>LogOut</button> 
        <div className="w-14 rounded-full ml-4">
        <img referrerPolicy='no-referrer' className='rounded-full w-14' src={user?.photoURL} />
      </div>
        </>:<>
        <NavLink to='/login' className={({ isActive }) => (isActive ? 'text-blue-500' : 'inactive')} >Login</NavLink>
        </>
      }
  </div>
</div>
        </div>
    );
};

export default Navbar;