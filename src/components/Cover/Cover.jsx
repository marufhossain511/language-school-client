

import { Parallax } from 'react-parallax';
import coverImg from '../../../src/assets/Cover/coverImg.jpeg'
const Cover = ({title}) => {
    return (
        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={coverImg}
        bgImageAlt="the menu"
        strength={-200}
    >
         <div className="hero h-[350px]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold font-mono uppercase">{title}</h1>
            </div>
        </div>
        </div>
    </Parallax>
    );
};

export default Cover;