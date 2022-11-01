import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
    const navigate = useNavigate()
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh

        // 👇️ clear all input values in the form
        let user = {
            user: userName,
            email: email,
            password: password
        }

        fetch("http://localhost:3060/signin",
        {
            method: "post",
            // mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(user)
        }).then((res) => {
            if(res.status === 200) {
                navigate('/')
            } else if(res.status === 401) {
                // mostrar uma mensagem de login inválido
            }
        })

    };


    return (
        <>
            <div className="log-form">
                <h2>Create account</h2>
                <form onSubmit={handleSubmit} method="post" >
                    <input type="text" title="username" placeholder="username" onChange={event => setUserName(event.target.value)}
          value={userName} />
                    <input type="text" title="email" placeholder="email" onChange={event => setEmail(event.target.value)}
          value={email}/>
                    <input type="password" title="password" placeholder="password" onChange={event => setPassword(event.target.value)}
          value={password}/>
                    <button type="submit" className="btn">SigIn</button>
                </form>
            </div>
        </>
    )
}

export default Signin