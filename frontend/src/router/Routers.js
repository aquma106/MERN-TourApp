import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';

import Home from './../pages/Home';
import Tour from './../pages/Tour';
import TourDetail from './../pages/TourDetail';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from "../pages/ThankYou";
import About from "../pages/About";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to ='/home'/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/tour" element={<Tour/>}/>
      <Route path="/tour/:id" element={<TourDetail/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/thank-you" element={<ThankYou/>}/>
      <Route path="/tours/search" element={<SearchResultList/>}/>
    </Routes>
  );
};

export default Routers;
