import React from 'react';
import Herosection from './partials/Herosection';
import Categories from './partials/Categories';
import OurProducts from './partials/OurProducts';
import Lookbook from './partials/Lookbook';
import Blog from './partials/Blog';
import Infos from './partials/Infos';

const Home = () => {
    return (
        <div className='pb-20'> 
            <Herosection />
            <Categories />
            <OurProducts />
            <Lookbook />
            <Blog />
            <Infos />
        </div>
    );
};

export default Home;