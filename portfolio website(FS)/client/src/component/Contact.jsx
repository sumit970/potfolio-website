import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { json } from "react-router-dom";
import Navbar from "./Navbar";

const Contact = () => {
  // const [rootdata,setrootdata]=useState({})
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  let value, name;
  const handleinput = (e) => {
    value = e.target.value;
    name = e.target.name;
    setuserdata({ ...userdata, [name]: value });
  };

  const handleuser = (e) => {
    e.preventDefault();

    console.log(data);
  };

  const usercontact = async () => {
    try {
      const res = await fetch("https://localhost:5000/getdata", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      setuserdata({ ...userdata, name: data.name, email: data.email });
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    usercontact();
  }, []);
  const contactform = async (e) => {
    e.preventDefault();
    const { name, email, message } = userdata;
    const resp = await fetch("https://localhost:5000/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      
      },

      body:JSON.stringify({ name, email, message }),
    });
    const data = resp;
    console.log(data);

    if (!data) {
      alert("message not sent");
    } else {
      alert("message sent !");
      setuserdata({...userdata, message: "" });
    }
  };

  return (
    <>
    
      <Navbar />
      <section className="flex md:flex-row  items-center flex-col justify-evenly ">
        <div className="">
          <img src="login.png" alt="" className="w-[500px] h-[500px]" />
        </div>

        <div className="">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <form
              method="POST"
              className="bg-white shadow-md rounded px-8 pt-6 pb-8  min-w-[400px]  "
              onSubmit={handleuser}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={userdata.name}
                  onChange={handleinput}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={userdata.email}
                  onChange={handleinput}
                  // onChange={handleinpu}
                  placeholder="jane@example.com"
                />
              </div>

              <div className=""></div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  id="message"
                  cols="30"
                  rows="10"
                  name="message"
                  type="text"
                  value={userdata.message}
                  onChange={handleinput}
                  // onChange={handleinpu}
                  placeholder="Enter your message here..."
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={contactform}
                >
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
