import { Fade } from "react-awesome-reveal";

 
const PopularCard = ({course}) => {
    return (
        <div>
             <Fade duration={2000}>
            <div className="font-mono card h-[500px] w-full bg-base-100 shadow-xl">
            <figure className="px-10 h-[400px] pt-10">
                <img src={course.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-start text-center">
                <h2 className="card-title">{course.className}</h2>
                <p className="font-medium">Instructor Name: {course.instructorName}</p>
                <p className="font-medium">Price: <span className="text-red-600">${course.price}</span> </p>
            </div>
            </div>
            </Fade>
        </div>
    );
};

export default PopularCard;