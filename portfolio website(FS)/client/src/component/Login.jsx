import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { useNavigate } from "react-router-dom";
import {
  BrowserRouter,
  NavLink,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { usercontext } from "./Routerpage";
import { useContext } from "react";

const Login = () => {
  const { state, dispatch } = useContext(usercontext);
  const history = useNavigate();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  let value, name;
  const handleuser = (e) => {
    value = e.target.value;
    name = e.target.name;
    setuser({ ...user, [name]: value });
  };
  console.log(user);
  const submitdata = (e) => {
    e.preventDefault();
    console.log(user);
  };
  const sendtoserver = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const resp = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await resp;
    if (data.status === 200) {
      dispatch({ type: "USER", payload: true });
      console.log("login successful !");
      // res.json({message:"login successful !"})

      history("/");
    } else {
      console.log(" Oops login Failed!");

      window.location.reload();
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {/* Or */}
              {/* <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a> */}
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitdata}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleuser}
                  autocomplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleuser}
                  autocomplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  for="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
                /
                <NavLink
                  to={"/register"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </NavLink>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={sendtoserver}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <!-- Heroicon name: mini/lock-closed --> */}
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
