import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const CreateTask = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const workspace = useRef('');
    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceName, setWorkspaceName] = useState('');
    const [expires, setExpires] = useState('');

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    useEffect(() => {
        const fetchWorkspaces = async () => {
            const response = await fetch('http://localhost:8000/api/get/workspaces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    uid: localStorage.getItem('id')
                })
            });

            const data = await response.json();

            setWorkspaces(data);
        }

        fetchWorkspaces();
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        const workspaceS = workspaces.find(workspace => workspace.name === workspaceName);

        const response = await fetch('http://localhost:8000/api/create/task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                note: note,
                uid: String(localStorage.getItem('id')),
                wsid: String(workspaceS.id),
                expires_at: expires
            })
        });

        await response.json();
        navigate('/todo');
    }
    return (
        <div className="flex h-full w-screen ">
            <form className=" grow h-min w-full max-w-md m-auto dark:text-white bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-slate-600 space-y-4" onSubmit={submit}>
                <h1 className="text-3xl font-medium text-primary mt-4 mb-6 text-center ">Create Task</h1>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" >
                        Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-bold mb-2" >
                        Note
                    </label>
                    <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" onChange={e => setNote(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-bold mb-2" >
                        Workspace
                    </label>
                    <input
                        type="dropdown"
                        className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black"
                        id="workspace"
                        placeholder="choose Workspace"
                        list="workspaces"
                        ref={workspace}
                        onChange={e => { setWorkspaceName(e.target.value) }}
                    />
                    <datalist id="workspaces">
                        {workspaces.map(workspace => (
                            <option key={workspace.id} value={workspace.name} />
                        ))}
                    </datalist>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-bold mb-2" >
                        Expires
                    </label>
                    <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="expires" type="date" min={disablePastDate()} placeholder="Expires" onChange={e => setExpires(e.target.value)} />
                </div>
                <button className="content-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Create
                </button>
            </form>
        </div>

    );
}

export default CreateTask;