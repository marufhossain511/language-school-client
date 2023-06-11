import { Helmet } from "react-helmet-async";
import Cover from "../../components/Cover/Cover";
import useClasses from "../../hooks/useClasses";
import ClassesCard from "./ClassesCard";

const Classes = () => {
    const [classes]=useClasses()
    return (
        <div>
            <Helmet>
                <title>Language School || Classes</title>
            </Helmet>
            <Cover title={'Classes'}></Cover>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-6">
                {
                    classes.map(course=><ClassesCard
                    key={course._id}
                    course={course}
                    >

                    </ClassesCard>)
                }
            </div>
        </div>
    );
};

export default Classes;