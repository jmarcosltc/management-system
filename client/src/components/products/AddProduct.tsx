import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "../navbar/Navbar";
import './Estoque.css';

interface Produto {
    email?: string,
    nome: string,
    cor?: string,
    nserie?: string,
    imei?: string,
    preco: number,
    marca: string,
    tipo: string
}

const AddProduct: React.FC = () => {
    
    
    const [product, setProduct] = useState<any>({
        nome: '',
        cor: '',
        nserie: '',
        imei: '',
        preco: 0,
        marca: '',
        tipo: ''
    });

    const handleChange = (event: any) => {
        setProduct({ ...product, [event.target.title]: event.target.value.replace(/^0+/, '')});
      };

    const [cookies, setCookie] = useCookies();

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // prevent page refresh
        console.log('teste')

        const decoded = jwtDecode<any>(cookies.access_token)
        const email = decoded.email
        
        
        const preco: number = parseFloat(product.preco)
        console.log(typeof(preco))

        let produto: Produto = {
            email: email,
            tipo: product.tipo,
            nome: product.nome,
            cor: product.cor,
            nserie: product.nserie,
            preco: product.preco,
            imei: product.imei,
            marca: product.marca
        }


        fetch("http://localhost:3060/compra",
        {
            method: "post",
            // mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(produto)
        }).then((res) => {
            if(res.status === 200) {
                console.log('enviado')
            } else if(res.status === 401) {
                // mostrar uma mensagem de login inválido
            }
        })
    }
    
    return (
        <>
        <Navbar/>
        <div className="flex flex-row min-h-screen justify-center items-center">
            <div className="columns-3xs gap-8">
            <div className="log-form">
                <h1 className="addProductTitle">Adicione um produto</h1>
                <form onSubmit={handleSubmit} method="post" >
                <input className="productInput" type="text" title="nome" placeholder="Nome" onChange={handleChange}
                    value={product.nome} required/>
                            <input className="productInput"  type="text" title="tipo" placeholder="Tipo" onChange={handleChange}
                    value={product.tipo} required/>
                            <input className="productInput" type="text" title="cor" placeholder="Cor" onChange={handleChange}
                    value={product.cor}/>
                            <input className="productInput" type="text" title="nserie" placeholder="Numero de serie" onChange={handleChange}
                    value={product.nserie}/>
                            <input className="productInput" type="text" title="preco" placeholder="Preco" onChange={handleChange}
                    value={product.preco} pattern="[0-9]+" required/>
                            <input className="productInput" type="text" title="imei" placeholder="IMEI" onChange={handleChange}
                    value={product.imei}/>
                            <input className="productInput" type="text" title="marca" placeholder="Marca" onChange={handleChange}
                    value={product.marca} required/>
                    <button type="submit" className="btn">Adicionar produto</button>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddProduct;