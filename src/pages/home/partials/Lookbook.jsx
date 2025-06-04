import React from 'react';
import { CiPlay1 } from 'react-icons/ci';

const Lookbook = () => {
    return (
        <div className="w-full h-[60vh] bg-[url('/src/assets/images/bg-video-01.jpg.webp')] bg-cover bg-no-repeat bg-center bg-fixed ">
            <div className='bg-black/30 w-full h-full flex flex-col items-center justify-center gap-3'>
            <h2 className='text-5xl font-bold text-white'>The Beauty</h2>
            <h3 className='text-3xl font-semibold text-white'>LOOKBOOK</h3>
            <a className='flex items-center gap-2 text-white font-semibold hover:underline' href="">
                <CiPlay1 size={20} />
                PLAY VIDEO
            </a>
            </div>
        </div>
    );
};

export default Lookbook;