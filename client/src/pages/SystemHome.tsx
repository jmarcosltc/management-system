import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Estoque from "../components/products/Tabela";
import { useNavigate } from "react-router-dom";
import Error401 from "../components/errors/Error401";
import Cookies from 'js-cookie'
import LoadingPage from "../components/LoadingPage";
import Navbar from "../components/navbar/Navbar";
import Home from "./Home";
import Dashboard from "../components/dashboard/Dashboard";

const SystemHome: React.FC = () => {

    const [validation, setValidation]= useState<any | null>(null);

    useEffect(() => {
        fetch("http://localhost:3060/protected",
            {
                method: "get",
                // mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            }).then((res) => {
                if(res.status === 200) {
                    var millisecondsToWait = 2500;
                        setTimeout(function() {
                            setValidation(true)       
                        }, millisecondsToWait);
                } else if(res.status === 401 || 403) {
                    setValidation(false)
                }
            })
        
     }, [])


    if (validation) {
        return (
            <>
                <Navbar/>
                <Dashboard/>
            </>
        )
    } else if(validation == null) {
        return (
            <>
                <LoadingPage/>
            </>
        )
    } 
    else {
        return (
            <>
                <Home/>
            </>
        )
    }
}

export default SystemHome