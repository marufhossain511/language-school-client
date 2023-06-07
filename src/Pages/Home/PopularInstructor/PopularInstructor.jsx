import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import '@smastrom/react-rating/style.css'
const PopularInstructor = () => {

    const {data:instructors=[]}=useQuery({
        queryKey:[''],
        queryFn: async ()=>{
            const res= await axios('http://localhost:5000/instructors')
            console.log(res.data);
            return res.data
        }
    })

    return (
        <div className="my-20">
             <h2 className="text-center font-mono font-bold text-5xl my-10">Popular Instructor</h2>
        <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    instructors.map((instructor,idx)=><SwiperSlide
                    key={idx}
                    >
                      <div className="font-mono card h-[500px] w-full bg-base-100 shadow-xl">
            <figure className="px-10 h-[350px] pt-10">
                <img src={instructor.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-start text-center">
                <h2 className=" font-bold text-2xl">Name: {instructor.name}</h2>
                <p className="font-bold text-lg">Email: {instructor.email}</p>
    
            </div>
            </div>

                    </SwiperSlide>)
                }
        </Swiper>
        </div>
    );
};

export default PopularInstructor;