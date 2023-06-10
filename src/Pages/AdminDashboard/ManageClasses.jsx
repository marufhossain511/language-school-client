import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ManageClasses = () => {
    const {data:myClasses=[],refetch} = useQuery({ 
        queryKey: ['myclasses'],
        queryFn: async ()=>{
            const res=await axios.get(`http://localhost:5000/pendingClasses`)
            //    console.log(res.data); 
            return res.data
        }
    })
    
    
    const handleApproved=(classes)=>{
        // console.log(classes);
        const approveClass={
            availableSeat:classes.availableSeat,
            className:classes.className,
            image:classes.image,
            instructorEmail:classes.instructorEmail,
            instructorName:classes.instructorName,
                price:classes.price,
                students:classes.students
            }
            console.log(approveClass);
            Swal.fire({
                icon: 'question',
                title: 'Do you want to Approve?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Approve',
                denyButtonText: `Don't Approve`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    //   Swal.fire('Saved!', '', 'success')
                    fetch(`http://localhost:5000/pendingclasses/${classes._id}`,{
                        method:'PATCH'
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data.modifiedCount){
                            axios.post('http://localhost:5000/approvedclasses',
                            approveClass)
                            .then((res)=>{
                                if(res.data.insertedId){
                                    refetch()
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'class approved successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            })
                        }
                    })
                    
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
       

    return (
        <div className="w-full md:-mt-52">

            <h2 className="text-4xl font-medium font-mono text-center">Manage Classes</h2>
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
        <th>Instructor name</th>
        <th>Instructor email</th>
        <th>Available Seats</th>
        <th>price</th>
        <th>Status</th>
        <th>Action</th>

      </tr>
    </thead>
    <tbody className="font-mono">
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
            <td>{classes.instructorName}</td>
            <td>{classes.instructorEmail}</td>
            <td>{classes.availableSeat}</td>
            <td>{classes.price}</td>
            <td>{classes.status}</td>
            <td>
            <div className="btn-group font-mono btn-group-vertical">
            <button onClick={()=>handleApproved(classes)} disabled={classes.status === 'approved' || classes.status === 'deny'} className="btn mb-2 btn-sm  btn-success">Approve</button>
            <Link to={`/dashboard/feedback/${classes._id}`} disabled={classes.status === 'approved' || classes.status === 'deny'}  className="btn mb-2 btn-sm  btn-error">Deny</Link>
            </div>
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

export default ManageClasses;