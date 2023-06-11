import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useClasses=()=>{

    const {data:classes=[]} = useQuery({ 
        queryKey: ['classes'],
         queryFn: async ()=>{
               const res=await axios.get('https://summer-camp-school-server-hazel.vercel.app/classes')
            //    console.log(res.data); 
               return res.data
         }
        })
return[classes]
}

export default useClasses