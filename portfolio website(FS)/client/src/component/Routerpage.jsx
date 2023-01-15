import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Eror from "./Eror";
import Home from "./Home";
import Login from "./Login";
import RegistrationForm from "./RegistrationForm";
import Services from "./Services";
import Logout from "./Logout";
import { createContext } from "react";
import { useReducer } from "react";
import { initialState,reducer } from "../reducer/Usereducer";
export const usercontext = createContext();

const Routing = () => {
  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<RegistrationForm />}></Route>
          <Route path="/logout" element={<Logout />}></Route>

          <Route path="*" element={<Eror />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const Routerpage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <usercontext.Provider value={{ state, dispatch }}>
        <Routing />
      </usercontext.Provider>
    </>
  );
};

export default Routerpage;
