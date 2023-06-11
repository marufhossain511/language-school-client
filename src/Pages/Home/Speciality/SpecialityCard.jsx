import { useEffect } from "react";
import { FaConnectdevelop } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
const SpecialityCard = ({speciality}) => {
    const {title,description}=speciality
    useEffect(() => {
        AOS.init({
            duration: 650,
            // once: true
          });
      }, [])
    return (
        <div  data-aos="fade-up"
        data-aos-duration="1000">
            <div className="card w-full h-60 bg-base-100 shadow-xl">
                <div className="card-body">
                    <FaConnectdevelop className='h-10 w-10 text-accent-focus'/>
                    <h2 className='card-title'>{title}</h2>
                    <p className='font-normal '>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default SpecialityCard;