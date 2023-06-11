import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import useAxiosSecure from "./useAxiosSecure"

const useCart=()=>{
    // const token= localStorage.getItem('access-token')
    const {user}=useContext(AuthContext)
    const [axiosSecure]=useAxiosSecure()
    const {data:cart=[],refetch } = useQuery({
        queryKey: ['carts',user?.email],
        // enabled: !loading,
        queryFn: async ()=>{
            const response= await axiosSecure.get(`carts?email=${user?.email}`)
            return response.data
        },
      })
      return [cart,refetch]
}
export default useCart;