import { Link } from 'react-router-dom';
import emptyCover from '../../assets/Cover/emptyData.png'
const EmptyCover = ({title}) => {

    return (
        <div className="w-full mt-60">
            <div className="card w-3/4 mx-auto h-[500px] bg-base-100 shadow-xl">
            <figure><img className='h-[450px]' src={emptyCover} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="text-center text-3xl font-mono font-bold my-2">{title}</h2>
                <div className="card-actions justify-center">
                <Link to='/' className="btn bg-accent-focus hover:bg-accent text-white font-bold">Back To Home</Link>
                </div>
            </div>
            </div>
        </div>
    );
};

export default EmptyCover;