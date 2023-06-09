import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ClassesCard = ({course}) => {
    const {_id,image,className,instructorName,price,availableSeat}=course

    const {user}=useContext(AuthContext)
    const navigate =useNavigate()
    const handleSelect=(_id)=>{
        console.log(_id);
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
    }

    return (
        <div>
        <div className="font-mono card h-[550px] w-full bg-base-100 shadow-xl">
        <figure className="px-10 h-[400px] pt-10">
            <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-start text-center">
            <h2 className="card-title">{className}</h2>
            <p className="font-medium">Instructor Name: {instructorName}</p>
            <p className="font-medium">Price: <span className="text-red-600">${price}</span> </p>
            <p className="font-medium">Available seats: {availableSeat} </p>
            <button onClick={()=>handleSelect(_id)} className="btn bg-accent-focus text-white btn-block">Select</button>
        </div>
        </div>
    </div>
    );
};

export default ClassesCard;