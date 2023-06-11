import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"

const usePayment = () => {
    const {user,loading}=useContext(AuthContext)
    const [axiosSecure]=useAxiosSecure()
    const {data:payments=[],refetch } = useQuery({
        queryKey: ['carts',user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const response= await axiosSecure.get(`/payments?email=${user?.email}`)
            return response.data
        },
      })
      return [payments,refetch]
}

export default usePayment;