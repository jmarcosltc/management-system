import React from "react";
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import AddProduct from "./components/products/AddProduct";
import Estoque from "./components/products/Estoque";
import Signout from "./components/Signout";
import Login from "./pages/Login";
import SystemHome from "./pages/SystemHome";

const AppRoutes: React.FC = () => {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/estoque" element={<Estoque/>}></Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<SystemHome/>}/>
                <Route path="/logout" element={<Signout/>}/>
                <Route path="/addProduct" element={<AddProduct/>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default AppRoutes