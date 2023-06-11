import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import EmptyCover from "../../components/EmptyCover/EmptyCover";
import { Helmet } from "react-helmet-async";

const MySelectedClasses = () => {

    const [cart,refetch]=useCart()
    const total = cart.reduce((sum,items)=>items.price + sum,0)
    const price= total.toFixed(2)

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
                axios.delete(`https://summer-camp-school-server-hazel.vercel.app/carts/${_id}`)
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
        <div className="w-full">
            <Helmet>
                <title>Language School || My Selected Class</title>
            </Helmet>
          {
            cart.length === 0 ?
            
            <EmptyCover title={'You Did not Select Any Class'}></EmptyCover>
            :
            <>
             <h2 className="text-4xl font-medium font-mono text-center">My Selected Classes</h2>
            <div className="font-mono ml-2 md:ml-16 mt-7 pb-2 grid md:gap-20 md:grid-cols-2 w-full">
                <div>
                    <h2 className="text-2xl mb-1">Classes: {cart.length}</h2>
                </div>
                <div>
                <h2 className="text-2xl mb-1">Total Price: ${price}</h2>
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
                    <div className="flex gap-2">
                    <button onClick={()=>handleDelete(course._id)} className="btn bg-red-500 text-white hover:bg-red-800 btn-square"><FaTrashAlt className="w-5 h-5"/></button>
                    <Link to={`/dashboard/payments/${course._id}`}><button className="btn bg-accent-focus hover:bg-accent-focus text-white">PAY</button></Link>
                    </div>
                    </td>
                </tr>)
               }
                </tbody>                
            </table>
            </div>
            </>
          }
        </div>
    );
};

export default MySelectedClasses;