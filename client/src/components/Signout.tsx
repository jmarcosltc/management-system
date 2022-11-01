import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const Signout: React.FC = () => {
    const navigate = useNavigate()
    
    fetch("http://localhost:3060/logout",
        {
            method: "get",
            // mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        }).then((res) => {
            if(res.status === 200) {
                navigate('/')
            } else if(res.status === 401) {
                // mostrar uma mensagem de login inválido
            }
        })

    return (
        <>
            <LoadingPage/>
        </>
    )
}

export default Signout;