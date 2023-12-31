import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';

const useUsersRole = () => {

    const {user,loading}=useContext(AuthContext)

    const {data:users='',loading:isUserLoading} = useQuery({
        queryKey: ['users',user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const response= await axios.get(`https://summer-camp-school-server-hazel.vercel.app/users/${user?.email}`)
            return response.data
        },
      })
      return [users,isUserLoading]
};

export default useUsersRole;