import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MySelectedClasses = () => {

    const [cart,refetch]=useCart()
    const total = cart.reduce((sum,items)=>items.price + sum,0)

    const handleDelete=(_id)=>{
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/carts/${_id}`)
                .then(response=>{
                    // console.log(response);
                    if(response.data.deletedCount > 0){
                        Swal.fire(
                            'Deleted!',
                            'Your class has been deleted.',
                            'success'
                          )
                          refetch() 
                    }
                })
            }
          })
       
    }

    return (
        <div className="w-full md:-mt-52">
           <h2 className="text-4xl font-medium font-mono text-center">My Selected Classes</h2>
            <div className="font-mono ml-2 md:ml-16 mt-7 pb-2 grid md:gap-20 md:grid-cols-3 w-full">
                <div>
                    <h2 className="text-2xl mb-1">Classes: {cart.length}</h2>
                </div>
                <div>
                <h2 className="text-2xl mb-1">Total Price: ${total}</h2>
                </div>
                <div className="md:pl-20 mb-1">
                 <Link to="/dashboard/payment"><button className="btn bg-accent-focus hover:bg-accent-focus text-white">PAY</button></Link>
                </div>
            </div>
            <div className="overflow-x-auto mx-8">
            <table className="table">
                {/* head */}
                <thead>
                <tr className="bg-base-200 text-lg text-black font-mono font-bold">
                    <th>
                       #
                    </th>
                    <th>Class Image</th>
                    <th>Class Name</th>
                    <th>Your Email</th>
                    <th>Price</th>
                    <th>Available Seats</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody className="font-mono">
                {/* row 1 */}
               {
                cart.map((course,idx)=> <tr
                key={course._id}
                >
                    <td>
                       {idx + 1}
                    </td>
                    <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={course.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                    </div>
                    </td>
                    <td>
                    {course.className}
                    </td>
                    <td>{course.email}</td>
                    <td>${course.price}</td>
                    <td>{course.availableSeat}</td>
                    <td>
                    <button onClick={()=>handleDelete(course._id)} className="btn bg-red-500 text-white hover:bg-red-800 btn-square"><FaTrashAlt className="w-4 h-4"/></button>
                    </td>
                </tr>)
               }
                </tbody>                
            </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;