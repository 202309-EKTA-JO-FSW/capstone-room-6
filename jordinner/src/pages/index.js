"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import homepage1 from "/src/assets/homepage1.png";
import Link from "next/link";
import homepage2 from "/src/assets/homepage2.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import CustomerNav from "./customer/customerNav";
import Footer from "./customer/Footer";

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  async function getDishes() {
    const dishesResponse = await fetch("https://capstone-backend-production-8314.up.railway.app/restaurants/get");
    const dishesData = await dishesResponse.json();
    setDishes([...dishesData]);
  }

  async function getRestaurants() {
    const restaurantsResponse = await fetch(
      "https://capstone-backend-production-8314.up.railway.app/restaurants/"
    );
    const restaurantsData = await restaurantsResponse.json();
    setRestaurants([...restaurantsData]);
  }

  useEffect(() => {
    getDishes();
    getRestaurants();
  }, []);

  const dishesCards = dishes.map((dish) => (
    <Link href={`/customer/${dish.restaurantId}`}>
      <div key={dish.name} className="dishInfo"  style={{maxWidth:"300px", height: "400px"}}>
        <img
          className="dishImage"
          src={`https://capstone-backend-production-8314.up.railway.app/restaurants/itemimages/${dish.image}`}
          alt=""
          objectFit="contain"
        ></img>
        <p className="dishName">{dish.name}</p>
        <p>{dish.description}</p>
        <p>JOD {dish.price.$numberDecimal}</p>
      </div>
    </Link>
  ));

  const restaurantsCards = restaurants.map((restaurant) => (
    <Link
      href={{
        pathname: `/customer/${restaurant._id}`,
      }}
    >
      <div key={restaurant.title} className="restaurantInfo"  style={{maxWidth:"300px", height: "400px"}}>
        <img
          className="restaurantImg"
          src={`https://capstone-backend-production-8314.up.railway.app/restaurants/images/${restaurant.image}`}
          alt={`${restaurant.image}`}
        />
        <p className="restuarantTitle">{restaurant.title}</p>
        <p>{restaurant.location[0]}</p>
        <p className="rating">
          <AiFillStar className="ratingStar" />
          {restaurant.rating}/5
        </p>
        <p style={{ lineBreak: "auto" }}>
          {restaurant.category.map((category) => {
            return <span>{category}, </span>
          })}
        </p>
      </div>
    </Link>
  ));

  function scrollSlider(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    const scrollAmount = direction * 300;
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  return (
    <div>
      <CustomerNav />
      <div className="homepage-2">
        <Image
          src={homepage2}
          alt=""
          layout={"fill"}
          objectFit="contain"
        ></Image>
      </div>
      <div className="welcomeContainer">
        <h1 className="welcomingHeader">
          Life Tastes Better With <span className="title">JorDinner!</span>
        </h1>
        <h2 className="welcomingText">
          Jordan's Finest Restaurants!
        </h2>
        <br></br>

        <Link href="/customer/Restaurants">
          <button className="orderNow">
            ORDER NOW!
            <IoArrowForwardCircleOutline className="orderArrow" />
          </button>
        </Link>
        <p className="partnerClick">
          <Link href="/restaurants/signup">
            Are you a restaurant?
            <IoArrowForwardCircleOutline className="restaurantArrow" />
          </Link>
        </p>
      </div>
      <div className="homepage-1">
        <Image
          src={homepage1}
          alt=""
          layout={"fill"}
          objectFit="contain"
        ></Image>
      </div>

      <div>
        <h2 className="popularDishes">
          <Link href="/customer/dishes">EXPLORE DISHES</Link>
        </h2>
      </div>
      <div className="dishCards">
        {/* Render dishes here */}
        <MdKeyboardArrowLeft
          className="dishArrow"
          onClick={() => scrollSlider("dishSlider", -1)}
        />
        <div className="CardsWrapper" id="dishSlider">
          {dishesCards}
        </div>

        <MdKeyboardArrowRight
          className="dishArrow"
          onClick={() => scrollSlider("dishSlider", 1)}
        />
      </div>
      <div>
        <h3 className="popularRestaurants">
          <Link href="/customer/restaurants">EXPLORE RESTAURANTS</Link>
        </h3>
      </div>
      <div className="restaurantCards">
        <MdKeyboardArrowLeft
          className="dishArrow"
          onClick={() => scrollSlider("restaurantSlider", -1)}
        />
        <div className="CardsWrapper" id="restaurantSlider">
          {restaurantsCards}
          {/* renders restaurants */}
          {/* clicking on the view button dircets user to single restuarant page // page not done yet*/}
        </div>
        <MdKeyboardArrowRight
          className="dishArrow"
          onClick={() => scrollSlider("restaurantSlider", 1)}
        />
      </div>
    </div>
  );
}
