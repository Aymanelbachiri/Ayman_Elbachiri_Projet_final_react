import React from 'react';
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaPinterestSquare, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='w-full lg:min-h-fit bg-[#F0F0F0] flex flex-col gap-5 py-10 px-10 '>
            <div className='w-full flex flex-col lg:flex-row gap-5'>

                <div className='flex flex-col gap-5 lg:w-[30vw]'>
                    <h2 className='text-xl'>GET IN TOUCH</h2>
                    <p className='text-black/60'>Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</p>
                    <div className='flex items-center gap-3'>
                        <FaFacebookF size={20} />
                        <FaTwitter size={20} />
                        <FaPinterestSquare size={20} />
                        <FaGooglePlusG size={20} />
                        <FaInstagram size={20} />

                    </div>
                </div>

                <div className='flex flex-col gap-5 lg:w-[15vw]'>
                    <h2 className='text-xl'>CATEGORIES</h2>
                    <a className='text-black/60 hover:text-red-500' href="">Men</a>
                    <a className='text-black/60 hover:text-red-500' href="">Women</a>
                    <a className='text-black/60 hover:text-red-500' href="">Dresses</a>
                    <a className='text-black/60 hover:text-red-500' href="">Sunglasses</a>
                </div>

                <div className='flex flex-col gap-5 lg:w-[15vw]'>
                    <h2 className='text-xl'>LINKS</h2>
                    <a className='text-black/60 hover:text-red-500' href="">Search</a>
                    <a className='text-black/60 hover:text-red-500' href="">About us</a>
                    <a className='text-black/60 hover:text-red-500' href="">Contact us</a>
                    <a className='text-black/60 hover:text-red-500' href="">Returns</a>
                </div>

                <div className='flex flex-col gap-5 lg:w-[15vw]'>
                    <h2 className='text-xl'>HELP</h2>
                    <a className='text-black/60 hover:text-red-500' href="">Track Order</a>
                    <a className='text-black/60 hover:text-red-500' href="">Returns</a>
                    <a className='text-black/60 hover:text-red-500' href="">Shipping</a>
                    <a className='text-black/60 hover:text-red-500' href="">FAQs</a>
                </div>

                <div className='flex flex-col gap-5 lg:w-[25vw]'>
                    <h2 className='text-xl'>NEWSLETTER</h2>
                    <input type="text" placeholder='Email Adress' className='focus:outline-0 border-b focus:border-b-red-500 px-1 py-3' />
                    <button className='bg-black text-white py-2 rounded-3xl'>
                        SUBSCRIBE
                    </button>
                </div>
            </div>

            <p className='flex items-center justify-center text-center text-black pt-15'>Copyright © {new Date().getFullYear()} . All rights reserved.</p>


        </div>
    );
};

export default Footer;