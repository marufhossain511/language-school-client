import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { useContext } from "react";
import EmptyCover from "../../components/EmptyCover/EmptyCover";


const MyEnrolledClasses = () => {
    const {user}=useContext(AuthContext)
    const {data:enrollClasses=[] } = useQuery({
        queryKey: ['carts',user?.email],
        // enabled: !loading,
        queryFn: async ()=>{
            const response= await axios.get(`http://localhost:5000/enrolledclasses?email=${user?.email}`)
            console.log(response.data);
            return response.data
        },
      })

    return (
        <>
        {
            enrollClasses.length === 0 ?
            <EmptyCover title={'You Did Not Enrolled Any Class'}></EmptyCover>
            :
            <div className="w-full md:-mt-52">
            <h2 className="text-4xl font-medium font-mono text-center">My Enrolled Classes</h2>
            <div className="overflow-x-auto ml-5">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="bg-base-200 text-lg text-black font-mono font-bold">
        <th>
          #
        </th>
        <th>Class Image</th>
        <th>Class Name</th>
        <th>Class Price</th>
        <th>Enroll Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        enrollClasses.map((classes,idx)=>
        <tr
        key={classes._id}
        >
            <td>
             {idx + 1}
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
            <td>
              <button className="btn btn-ghost btn-xs">details</button>
            </td>
          </tr>)
      }
   
    </tbody>
    
  </table>
</div>
        </div>
        }
        </>
    );
};

export default MyEnrolledClasses;