import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const About = () => {
  const [rootdata,setrootdata]=useState({})
  const history = useNavigate();
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
      history("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  const [toggle, settoggle] = useState(false);
   const {name,email,country}=rootdata;
  return (
    <>
      <Navbar />

      <section className="  justify-evenly  flex-col flex md:flex-row p-[70px]">
        {/* <div className="text-red-300  top-[0px] left-[0px]">Edit Profile</div> */}

        <div className="pt-4">
          <img
            src="sumit.jpeg"
            alt=""
            className="h-[250px] w-[250px] rounded-[20px] "
          />
          <div className="py-4 px-1">
            <h2 className="text-2xl text-red-600 font-thin ">Profession</h2>
            <p className="text-xl text-grey-200 font-thin flex flex-col flex-shrink  space-y-1">
              <span className="bg-red-200 rounded-md pl-1">Youtuber</span>
              <span className="bg-red-200 rounded-md  pl-1">programer</span>
              <span className="bg-red-200 rounded-md pl-1">Musician</span>
              <span className="bg-red-200 rounded-md  pl-1">Skater</span>
            </p>
          </div>
        </div>

        <div className="">
          <h1 className="sm:text-4xl text-3xl text-center text-red-500 font-semibold">
            {name}
          </h1>
          <span className="sm:text-3xl text-2xl text-center text-red-400 font-light">
            Full Stack Web Developer
          </span>

          <p className="font-light pt-2">
            {" "}
            RANKINGS: <span className="font-semibold">1/10</span>
          </p>
          <div className="p-2">
            <button
              className={
                toggle
                  ? "border-red-400 m-2 rounded p-2"
                  : " bg-red-400 rounded-[7px] m-2 text-white p-2 space-x-2"
              }
              onClick={(tog) => settoggle(false)}
            >
              About
            </button>
            <button
              className={
                toggle
                  ? " bg-red-400 rounded-[7px] text-white p-2 m-2 space-x-2"
                  : "border-red-400 m-2 rounded p-2"
              }
              onClick={(tog) => settoggle(true)}
            >
              TimeLine
            </button>
            <hr class="my-8 h-px bg-gray-200  border-0 dark:bg-gray-700"></hr>
          </div>

          <div className={toggle ? "hidden" : ""}>
            <table class="table-auto">
              <tbody className="">
                <tr className="">
                  <td className="text-red-300 ">User Id </td>
                  <td> Sumit970</td>
                </tr>

                <tr>
                  <td className="text-red-300">Name</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td className="text-red-300">Email</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td className="text-red-300">Phone</td>
                  <td>+917903638853</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={toggle ? "" : "hidden"}>
            <h1>this is sumit kumar and i am a software developer </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
