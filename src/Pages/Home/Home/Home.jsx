import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Speciality from "../Speciality/Speciality";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Language School || Home</title>
            </Helmet>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
            <Speciality></Speciality>
        </div>
    );
};

export default Home;