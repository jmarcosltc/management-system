import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Tabela from "./Tabela";

const Estoque: React.FC = () => {

    useEffect(() => {
      document.body.style.backgroundColor = '#f8f4fc'
    }, [])
    

    return (
        <>
        <Navbar/>
          <div className="flex flex-row min-h-screen justify-center items-center">
            <div className="flex-row justify-center items-center">
              <Tabela/>
            </div>
          </div>
        </>
    )
}

export default Estoque;