
const ClassesCard = ({course}) => {
    const {image,className,instructorName,price,availableSeat}=course
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
            <button className="btn bg-primary-focus text-white btn-block">Select</button>
        </div>
        </div>
    </div>
    );
};

export default ClassesCard;