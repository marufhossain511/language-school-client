import { useQuery } from "@tanstack/react-query";
import Cover from "../../components/Cover/Cover";
import axios from "axios";


const Instructors = () => {

    const {data:instructors=[]}=useQuery({
        queryKey:['instructors'],
        queryFn: async ()=>{
            const res= await axios.get('http://localhost:5000/instructors')
            return res.data
        }
    })

    return (
        <div className="py-20">
            <Cover title={'All Instructors'}></Cover>
 <div className="overflow-x-auto my-4">
  <table className="table">
    {/* head */}
    <thead className="bg-base-200 text-xl">
      <tr>
        <th>
         #
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        instructors.map((instructor,idx)=> <tr
        key={instructor._id}
        className="text-base font-mono"
        >
            <td>
              {idx + 1}
            </td>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={instructor.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              {instructor.name}
            </td>
            <td>
                {instructor.email}
            </td>
          </tr>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Instructors;