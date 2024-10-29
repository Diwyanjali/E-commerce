import React from 'react';
import './HeroSection.css';
import bg from '../assests/eiffel.jpg';
import './Services.css'


const Services = () => {
    return (
        <div className="Services-container">
            <img src={bg} alt="" className='hero-img' />
            <div className="hero-content">
                <h1>Thousands Of People Choose Our Services</h1>
                <div className='line'><hr /></div>
                <div className='items container d-flex justify-content-around gap-5 mt-5'>
                    <h1>1000+<br/>Visa Approvals</h1>
                    <h1>200+<br/>University<br/>Partners</h1>
                    <h1>12+<br/>Countries</h1>
                    <h1>6<br/>Visa<br/>Categories</h1>
                </div>
            </div>
        </div>
    );
};

export default Services;
