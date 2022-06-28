import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';

const EditTask = () => {
    const { id, wsid } = useParams();
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
        const fetchTask = async () => {
            const response = await fetch('http://localhost:8000/api/get/task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    id: String(id),
                    wsid: String(wsid)
                })
            });

            const wresponse = await fetch('http://localhost:8000/api/get/workspaces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    uid: localStorage.getItem('id')
                })
            });

            const data = await response.json();
            const wdata = await wresponse.json();

            setName(data.name);
            setNote(data.note);
            const ws = wdata.find(workspace => workspace.id === data.wsid);
            workspace.current.value = ws.name;
            const expires_at_formatted = new Date(data.expires_at);
            setExpires(expires_at_formatted.toISOString().substring(0, 10));
            setWorkspaces(wdata);
        }

        fetchTask();
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        const workspaceS = workspaces.find(workspace => workspace.name === workspaceName);

        const response = await fetch('http://localhost:8000/api/update/task', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                id: String(id),
                name: name,
                note: note,
                wsid: String(workspaceS.id),
                expires_at: expires
            })
        });

        await response.json();
        navigate('/todo');
    }

    const deleteTask = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/delete/task', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                id: String(id),
                wsid: String(wsid)
            })
        });

        await response.json();
        navigate('/todo');
    }

    return (
        <div className="flex h-full w-screen ">
            <div className="grow h-min w-full max-w-md m-auto dark:text-white bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-slate-600 space-y-4">
                <form className=" " onSubmit={submit}>
                    <h1 className="text-3xl font-medium text-primary mt-4 mb-6 text-center ">Edit Task</h1>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2" >
                            Name
                        </label>
                        <input value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-bold mb-2" >
                            Note
                        </label>
                        <input value={note} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" onChange={e => setNote(e.target.value)} />
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
                        <input value={expires} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="expires" type="date" min={disablePastDate()} placeholder="Expires" onChange={e => setExpires(e.target.value)} />
                    </div>

                </form>
                <button className="content-center bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={submit}>
                    Edit
                </button>
                <button className=" ml-10 content-center bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={deleteTask}>
                    Delete
                </button>
            </div>
        </div>

    );
}

export default EditTask;