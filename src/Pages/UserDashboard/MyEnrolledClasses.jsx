import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import EmptyCover from "../../components/EmptyCover/EmptyCover";
import moment from 'moment';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyEnrolledClasses = () => {
    const {user,loading}=useContext(AuthContext)
    const [axiosSecure]=useAxiosSecure()
    const {data:enrollClasses=[] } = useQuery({
        queryKey: ['carts',user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const response= await axiosSecure.get(`enrolledclasses?email=${user?.email}`)
            console.log(response.data);
            return response.data
        },
      })

    return (
        <>
           <Helmet>
                <title>Language School || My Enrolled Class</title>
            </Helmet>
        {
            enrollClasses.length === 0 ?
            <EmptyCover title={'You Did Not Enrolled Any Class'}></EmptyCover>
            :
            <div className="w-full">
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
            {moment(classes.date).format("LLL")}
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