import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
const PopularInstructor = () => {

    const {data:instructors=[]}=useQuery({
        queryKey:[''],
        queryFn: async ()=>{
            const res= await axios('instructor.json')
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
                <p className="font-bold text-lg">Name: {instructor.name}</p>
                <h2 className="card-title">{instructor.className}</h2>
                <p className="font-medium">Experience: {instructor.experienceYear} Year</p>
                <div className="flex items-center gap-2">
                <p>Rating: </p>
                <Rating style={{ maxWidth: 100 }} value={instructor.rating} readOnly/>
                </div>
            </div>
            </div>

                    </SwiperSlide>)
                }
        </Swiper>
        </div>
    );
};

export default PopularInstructor;