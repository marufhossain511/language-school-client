import PopularCard from "./PopularCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PopularClasses = () => {

    const {data:classes=[]} = useQuery({ 
        queryKey: ['popularclasses'],
         queryFn: async ()=>{
               const res=await axios.get('https://summer-camp-school-server-hazel.vercel.app/popularclasses')
            //    console.log(res.data); 
               return res.data
         }
        })

    return (
        <div className="my-20 ">
            <h2 className="text-center font-mono font-bold text-5xl my-10">Popular Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    classes.map(course=><PopularCard
                    key={course._id}
                    course={course}
                    >

                    </PopularCard>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;