import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"

const useCart=()=>{
    // const token= localStorage.getItem('access-token')
    const {user}=useContext(AuthContext)
    const {data:cart=[],refetch } = useQuery({
        queryKey: ['carts',user?.email],
        // enabled: !loading,
        queryFn: async ()=>{
            const response= await axios.get(`http://localhost:5000/carts?email=${user?.email}`)
            return response.data
        },
      })
      return [cart,refetch]
}
export default useCart;