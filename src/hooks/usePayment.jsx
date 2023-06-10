import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import { useQuery } from "@tanstack/react-query"

const usePayment = () => {
    const {user}=useContext(AuthContext)
    const {data:payments=[],refetch } = useQuery({
        queryKey: ['carts',user?.email],
        // enabled: !loading,
        queryFn: async ()=>{
            const response= await axios.get(`http://localhost:5000/payments?email=${user?.email}`)
            return response.data
        },
      })
      return [payments,refetch]
}

export default usePayment;