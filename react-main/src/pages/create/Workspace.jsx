import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateWorkspace = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/create/workspace', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                description: description,
                uid: localStorage.getItem('id')
            })
        });

        await response.json();
        navigate('/todo');
    }
    return (
        <div className="flex h-full w-screen ">
            <form className=" grow h-min w-full max-w-md m-auto dark:text-white bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-slate-600 space-y-4" onSubmit={submit}>
                <h1 className="text-3xl font-medium text-primary mt-4 mb-6 text-center ">Create Workspace</h1>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" >
                        Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-bold mb-2" >
                        Description
                    </label>
                    <textarea className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                </div>
                <button className="content-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Create
                </button>
            </form>
        </div>

    );
}

export default CreateWorkspace;