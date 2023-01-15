import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";

const Home = () => {
  const [rootdata,setrootdata]=useState({})
  
  const callAboutPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/about", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setrootdata(data)
      console.log(data);
      if (!res.status===200) {
        const error = new Error(res.error);
        throw error;
        // history("/login");
      }


    } catch (error) {
      console.log(error);
      // history("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);


  return (
    <>
      <Navbar />
      <section className="flex flex-col md:flex-row justify-around items-center space-y-4 p-[40px] md:pt-[150px] ">
        <div className="flex flex-col ">
          <span className="sm:text-xl text-md text-gray-500">HELLO</span>
          <h1 className="sm:text-3xl text-2xl text-gray-500 font-mono">
            I'm <span className="text-black">{rootdata.name}</span>
          </h1>
          <p className="sm:text-3xl text-2xl">
            {" "}
            a{" "}
            <span className="sm:text-4xl text-gray-500">
              Full Stack Web Developer
            </span>
          </p>

          <p className="max-w-[400px] sm:text-md  pb-2 pt-2 text-sm font-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
            aliquam quae beatae! Dignissimos, officia. Non molestiae debitis
            quasi hic voluptatibus, nesciunt quibusdam ipsum omnis nulla
            molestias architecto velit iusto voluptas. Ipsum incidunt{" "}
          </p>
          <div className="flex flex-row ">
            <button className="p-2 rounded-[5px] border-red-400 text-white bg-red-400 ">
              Explore
            </button>
            <button className="p-2 rounded-[5px] border-red-400 text-red-400 ">
              Portfolio
            </button>
          </div>
        </div>

        <div className="">
          <img src="sumit.jpeg" alt="" className="h-[300px] w-[300px] rounded-full" />






        </div>
      </section>
    </>
  );
};

export default Home;
