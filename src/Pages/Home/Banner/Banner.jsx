import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../../assets/Home/banner/carousel1.jpg'
import banner2 from '../../../assets/Home/banner/carousel2.jpg'
import banner3 from '../../../assets/Home/banner/carousel3.jpg'
const Banner = () => {
    return (
        <div className='pt-20'>
             <Carousel className='text-center'>
                <div>
                    <img src={banner1} />
                   
                </div>
                <div>
                    <img src={banner2} />
                   
                </div>
                <div>
                    <img src={banner3} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;