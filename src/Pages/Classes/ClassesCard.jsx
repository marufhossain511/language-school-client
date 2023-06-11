import { useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import useUsersRole from "../../hooks/useUsersRole";
const ClassesCard = ({course}) => {
    const {_id,image,className,instructorName,price,availableSeat,students}=course
    const {user}=useContext(AuthContext)
    const[users]=useUsersRole()
    const navigate =useNavigate()
    const handleSelect=(_id)=>{
       if(!user){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'log in before selecting the course',
            showConfirmButton: false,
            timer: 1500
          })
        return navigate('/login')
       }
     const newClass={
        image,
        className,
        instructorName,
        price,
        availableSeat,
        classId:_id,
        email:user?.email,
        date:new Date
     }      
     axios.post('https://summer-camp-school-server-hazel.vercel.app/cart',newClass)
     .then((response)=>{
        console.log(response.data);
        if(response.data.insertedId){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'class add in your dashboard My Select Page',
                showConfirmButton: false,
                timer: 1500
              })
        }
     })

    }

    useEffect(() => {
        AOS.init({
            duration: 650,
            // once: true
          });
      }, [])

    return (
        <div>
       <div  data-aos="fade-up"
        data-aos-duration="1000">
       <div className={`${availableSeat === 0 && 'bg-red-500'} font-mono card h-[550px] w-full bg-base-100 shadow-xl`}>
        <figure className="px-10 h-[400px] pt-10">
            <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-start text-center">
            <h2 className="card-title">{className}</h2>
            <p className="font-medium">Instructor Name: {instructorName}</p>
            <p className="font-medium">Price: <span className="text-red-600">${price}</span> </p>
            <p className="font-medium">Available seats: {availableSeat} </p>
            <p className="font-medium">Enroll Student: {students} </p>
            <button onClick={()=>handleSelect(_id)} disabled={availableSeat === 0 || users.role == "admin" ||users.role == "instructor"} className="btn bg-accent-focus text-white btn-block">Select</button>
        </div>
        </div>
       </div>
    </div>
    );
};

export default ClassesCard;