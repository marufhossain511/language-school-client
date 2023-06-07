import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PopularCard from "./PopularCard";

const PopularClasses = () => {

    const {data:classes=[]} = useQuery({ 
        queryKey: ['classes'],
         queryFn: async ()=>{
               const res=await axios.get('http://localhost:5000/classes')
            //    console.log(res.data); 
               return res.data
         }
        })

    return (
        <div className="my-20 ">
            <h2 className="text-center font-mono font-bold text-5xl my-10">Popular Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    classes.slice(0,6).map(course=><PopularCard
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