import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {

    return(
        <>
            <h1>Bem vindo ao sistema: 
                <Link to="/login">Login</Link>
            </h1>
        </>
    )
}

export default Home