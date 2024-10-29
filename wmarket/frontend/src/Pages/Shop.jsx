/* eslint-disable-next-line no-unused-vars */
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import shoes from "../assests/image1.png";
import image4 from "../assests/image4.png";
import image3 from "../assests/image3.png";
import image12 from "../assests/image12.png";
import image13 from "../assests/image13.png";
import CategoryCarousel from "../components/CategoryCarousel";
import Brand from "../components/Brand";
import Product from "../components/Product";
import bag from "../assests/bag.png";
import ShoppingCart from "../components/ShoppingCart";
import ElectCard from "../components/ElectCard";
import mobile from "../assests/mobile.png";

function Shop() {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center ">
        <CategoryCard imageUrl={shoes} />
        <CategoryCard imageUrl={image4} />
        <CategoryCard imageUrl={image3} />
      </div>
      <p className="text-center mt-5">
        Find things you will love. Support independent sellers.
      </p>
      <div className="d-flex justify-content-center mt-5">
        <CategoryCarousel />
      </div>
      <div className="d-flex justify-content-center m-5">
        <Brand imageUrl={image12} />
        <Brand imageUrl={image13} />
      </div>
      <div className="d-flex justify-content-center">
        <Product />
      </div>
      <p className="text-center mt-5">
        Find things you will love. Support independent sellers.
      </p>
      <div className="d-flex justify-content-center m-4">
        <ShoppingCart imageUrl={bag} />
      </div>
      <div className="d-flex justify-content-center">
        <ElectCard images={mobile} />
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
