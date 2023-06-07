import PopularCard from "./PopularCard";
import useClasses from "../../../hooks/useClasses";

const PopularClasses = () => {

    const [classes]=useClasses()

    return (
        <div className="my-20 ">
            <h2 className="text-center font-mono font-bold text-5xl my-10">Popular Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    classes.slice(0,6).map(course=><PopularCard
                    key={course._id}
                    course={course}
                    >

                    </PopularCard>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;