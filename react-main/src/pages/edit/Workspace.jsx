import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWorkspace = () => {
    const { wsid } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/update/workspace', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                description: description,
                wsid: String(wsid)
            })
        });

        await response.json();
        navigate('/todo');
    }

    const deleteWorkspace = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/delete/workspace', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                uid: String(localStorage.getItem('id')),
                wsid: String(wsid)
            })
        });

        await response.json();
        navigate('/todo');
    }


    useEffect(() => {
        const fetchWorkspace = async () => {
            const response = await fetch('http://localhost:8000/api/get/workspace', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    wsid: String(wsid),
                })
            });

            const out = await response.json();
            setName(out.name);
            setDescription(out.description);
        }

        fetchWorkspace();
    }, [])

    return (
        <div className="flex h-full w-screen ">
            <div className="grow h-min w-full max-w-md m-auto dark:text-white bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-slate-600 space-y-4">
                <form onSubmit={submit}>
                    <h1 className="text-3xl font-medium text-primary mt-4 mb-6 text-center ">Edit Workspace</h1>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2" >
                            Name
                        </label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                            id='name'
                            placeholder='Name'
                            onChange={e => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-bold mb-2" >
                            Description
                        </label>
                        <textarea value={description} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                    </div>


                </form>
                <button className="content-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={submit}>
                    Edit
                </button>
                <button className=" ml-10 content-center bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={deleteWorkspace}>
                    Delete
                </button>
            </div>
        </div>

    );
}

export default EditWorkspace;