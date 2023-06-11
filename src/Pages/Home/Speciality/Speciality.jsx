import { useEffect, useState } from "react";
import SpecialityCard from "./SpecialityCard";

const Speciality = () => {
    const [specialities,setSpecialities]=useState([])
    useEffect(()=>{
        fetch('speciality.json')
        .then(res=>res.json())
        .then(data=>{
            setSpecialities(data)
        })
    },[])
    return (
        <div className="mt-40">
        <h2 className="text-center  font-mono font-bold text-5xl my-20">Our Speciality</h2>
        <div className='grid   my-10 sm:grid-cols-2 gap-4'>
            {
                specialities.map((speciality,idx)=><SpecialityCard
                key={idx}
                speciality={speciality}
                ></SpecialityCard>)
            }
        </div>
    </div>
    );
};

export default Speciality;