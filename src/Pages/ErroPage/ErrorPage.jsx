import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img  src='https://sumavskyservis.cz/themes/sumavskyservis/assets/img/velkyspatny.gif' alt="Error" className="mb-8" />
            <h2 className='text-4xl font-bold'>404</h2>
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
            
            <Link to="/"><button className='btn btn-primary'>Back To Home Page</button></Link>

        </div>
    );
};

export default ErrorPage;