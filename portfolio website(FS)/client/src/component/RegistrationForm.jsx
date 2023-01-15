import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
// import { unstable_HistoryRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const history=useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    country: ""
  });
  let value, name;
  const handleuser = (e) => {
    value = e.target.value;
    name = e.target.name;
    setuser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form fields
    // console.log("you have submitted the form");
    // console.log(country);
    console.log(user);
  };

    const sendtoserver = async(e)=>{
      e.preventDefault();
      const {name,email,password,cpassword,country}=user;
      const response= await fetch('http://localhost:5000/register',{
        method:'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
           },
        body:JSON.stringify({ name,email,password,cpassword,country})
      })

      const data = await response 
      // console.log(response.json());
      // console.log(data.status)
      if(data.status===(422||200||!data)){
        console.log('Invalid registration')
        window.alert("invalid registration")
      
      }
      else if(data.status===201){
        console.log('registration successful')
        window.alert("registration successful")

        history('/login')
      }
      
    }
    // Submit form data to backend


  return (
    <>
      <Navbar />
      <section className="flex flex-col sm:flex-row justify-around sm:pt-[20px] ">
        <div className="">
          <img
            src="registerf.png"
            alt="Registration form "
            className="w-[600px] h-[500px]"
          />
        </div>
        {/* form div */}
        <div className="">
          <form
            className="mx-auto px-6 py-8 bg-white rounded-lg shadow-xl p-[20px] min-w-[350px]" method="POST"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center ">
              Create an account
            </h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="yes"
                value={user.name}
                onChange={handleuser}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="emai"
                name="email"
                autoComplete="yes"
                value={user.email}
                onChange={handleuser}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password

              </label>
              <input
                type="password"
                id="password"
                autoComplete="yes"
                name="password"
                value={user.password}
                onChange={handleuser}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password-confirmation"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="cpassword"
                autoComplete="yes"
                id="password-confirmation"
                value={user.cpassword}
                onChange={handleuser}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6 ">
              <label
                htmlFor="country"
                className="block text-gray-700 font-bold mb-2"
              >
                Country
              </label>
              <input
                id="country"
                type="country"
                name="country"
                value={user.country}
                onChange={handleuser}

                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <div className="flex flex-col  items-center align-middle justify-center ">
                <button
                  className="p-2 rounded-[7px] bg-purple-400 text-white align-middle m-3" onClick={sendtoserver}
                  type="Submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* End of the form div */}
      </section>
    </>
  );
}

export default RegistrationForm;
