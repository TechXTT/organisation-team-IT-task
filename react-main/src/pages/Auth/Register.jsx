import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ logged, setLogged }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        await response.json();
        setLogged(true);
        navigate('/');
    }

    useEffect(() => {
        if (logged) {
            navigate('/');
        }
    }, []);

    return (
        <div className="flex h-full w-screen ">
            <form className=" grow h-min w-full max-w-md m-auto dark:text-white bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-slate-600 space-y-4" onSubmit={submit}>
                <h1 className="text-3xl font-medium text-primary mt-4 mb-6 text-center ">Register</h1>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" >
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" >
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-bold mb-2" >
                        Password
                    </label>
                    <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="content-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
