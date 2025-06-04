import React from 'react';
import images from '../../constants/images';


const About = () => {
    return (
        <>
            <div
                className="w-full h-[30vh] bg-[url('/src/assets/images/banner.webp')] flex justify-center items-center">
                <h1 className='text-4xl font-bold text-amber-50'>ABOUT</h1>
            </div>

            <div className='flex flex-col lg:flex-row p-5 lg:p-5 gap-3 lg:gap-10 items-center justify-center overflow-hidden max-w-7xl mx-auto'>
                <div className='w-full lg:w-[35vw] h-64 sm:h-80 lg:h-[35vw] p-4 lg:p-10 flex items-center justify-center'>
                    <img
                        src={images.shopy4}
                        alt="Our story illustration"
                        className='w-full h-full object-contain'
                    />
                </div>

                <div className='w-full lg:w-[40vw] flex flex-col justify-start items-start gap-4 lg:gap-6 '>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900'>
                        Our story
                    </h2>

                    <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                        Phasellus egestas nisi nisi, lobortis ultricies risus semper nec. Vestibulum pharetra ac ante ut pellentesque. Curabitur fringilla dolor quis lorem accumsan, vitae molestie urna dapibus. Pellentesque porta est ac neque bibendum viverra. Vivamus lobortis magna ut interdum laoreet. Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula. Vivamus tristique vulputate ultricies. Sed vitae ultrices orci.
                    </p>


                    <p className='text-gray-700 pl-4 sm:pl-6 border-l-4 border-gray-200 flex flex-col gap-3 sm:gap-4 italic text-sm sm:text-base leading-relaxed'>
                        "Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while."
                        <span className='not-italic text-gray-500 font-medium text-xs sm:text-sm'>- Steve Jobs</span>
                    </p>

                </div>
            </div>

        </>
    );
};

export default About;