import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate()
    
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // prevent page refresh
        //console.log('teste')

        let user = {
            email: email,
            password: password
        }

        fetch("http://localhost:3060/login",
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
        <div className="flex flex-row min-h-screen justify-center items-center">
        <div className="columns-3xs gap-8" style={{
            backgroundColor: '#f8f4fc',
            padding: '80px 30px 80px 30px',
            borderRadius: '4px',
            boxShadow: '-24px 12px #878787',
            border: '1px solid #d1d1d1'
        }}>
            <div className="log-form" >
                <h1 className="loginTitle" style={{
                    fontSize: '30px',
                    textAlign: 'center',
                    marginBottom: '50px'
                }}>Login to account</h1>
                <form onSubmit={handleSubmit} method="post" >
                    <input style={{
                        padding: '12px 20px',
                        boxSizing: 'border-box',
                        marginBottom: '6px',
                        border: '2px solid black',
                        borderRadius: '4px'
                    }} type="text" title="email" placeholder="email" onChange={event => setEmail(event.target.value)}
          value={email}/>
                    <input style={{
                        padding: '12px 20px',
                        boxSizing: 'border-box',
                        marginBottom: '6px',
                        border: '2px solid black',
                        borderRadius: '4px'
                    }} type="password" title="password" placeholder="password" onChange={event => setPassword(event.target.value)}
          value={password}/>
                    <button style={{
                        justifyContent: 'flex-end',
                        float: "right",
                        backgroundColor: '#7c61db',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '3px',
                        padding: '5px 25px 5px 25px',
                        marginTop: '20px',
                    }} type="submit" className="loginBtn">Login</button>
                </form>
                </div>
            </div>
        </div>

        </>
    )
}

export default Login