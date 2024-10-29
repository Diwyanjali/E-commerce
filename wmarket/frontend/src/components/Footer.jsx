/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import './Footer.css';
import Fb from '../assests/facebook.png';
import Twitter from '../assests/twitter.png';
import Linkedin from '../assests/linkedin.png';
import Dribble from '../assests/dribble.png';


const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className=" d-flex justify-content-center py-5 container-lg">
                    <div className="col-md-3 ps-2">
                        <h2>Wmarket</h2>
                        <a href="#">Cricklewood, London<br />NW2 6qg, UK</a>
                        <div className='d-flex gap-1 py-3'>
                            <img src={Fb} alt="" />
                            <img src={Twitter} alt="" />
                            <img src={Linkedin} alt="" />
                            <img src={Dribble} alt="" />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <p className='title'>Shop</p>
                        <a href="#">Gift Cards</a> <br />
                        <a href="#">Site Map</a> <br />
                        <a href="#">Polka Blog</a> <br />
                        <a href="#">Login</a> <br />
                        <a href="#">Signin</a>
                    </div>
                    <div className="col-md-2">
                        <p className='title'>Sell</p>
                        <a href="#">Sell on Polka</a> <br />
                        <a href="#">Teams</a> <br />
                        <a href="#">Forums</a> <br />
                        <a href="#">Affilates</a>
                    </div>
                    <div className="col-md-2">
                        <p className='title'>About</p>
                        <a href="#">Polka, Inc.</a> <br />
                        <a href="#">Policies</a> <br />
                        <a href="#">Investors</a> <br />
                        <a href="#">Careers</a> <br />
                        <a href="#">Press</a>
                    </div>
                    <div className="col-md-2">
                        <p className='title'>Help</p>
                        <a href="#">Help</a> <br />
                        <a href="#">Help Center</a> <br />
                        <a href="#">Trust and safety</a> <br />
                        <a href="#">Privacy settings</a>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                <p className='py-2'>© 2024 Wmarket | Alright Reserved. Developed By eSupport technologies</p>
            </div >
        </>


    );
};

export default Footer;