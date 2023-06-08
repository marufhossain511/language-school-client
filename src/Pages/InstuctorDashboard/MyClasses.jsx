import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const MyClasses = () => {
    const {user}=useContext(AuthContext)
    const {data:myClasses=[]} = useQuery({ 
        queryKey: ['myclasses'],
         queryFn: async ()=>{
               const res=await axios.get(`http://localhost:5000/myclasses/${user?.email}`)
               console.log(res.data); 
               return res.data
         }
        })
    return (
        <div className="w-full md:-mt-52">
            <h2 className="text-4xl font-medium font-mono text-center">My Classes</h2>
             <div className="ml-5">
             <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="text-sm text-black font-mono font-bold">
        <th>
          #
        </th>
        <th>Class Image</th>
        <th>Class Name</th>
        <th>Price</th>
        <th>Status</th>
        <th>Enrolled Student</th>
        <th>Feedback</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        myClasses.map((classes,idx)=><tr
        key={classes._id}
        >
            <td>
              {idx+1}
            </td>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={classes.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              {classes.className}
            </td>
            <td>${classes.price}</td>
            <td>{classes.status}</td>
            <td>{classes.students}</td>
            <td>{classes.feedback?classes.feedback:'No feedback'}</td>
            <td>
            <button className="btn btn-md bg-primary hover:bg-primary-focus text-white">Update</button>
            </td>
          </tr>)
      }
    </tbody>
    
  </table>
</div>
             </div>
        </div>
    );
};

export default MyClasses;