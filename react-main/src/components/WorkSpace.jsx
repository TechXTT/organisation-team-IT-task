import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const WorkSpace = ({ info, setTasks, setShowTask, showTask, setWorkspaceName, todo }) => {
    const navigate = useNavigate();

    const getTasks = async () => {
        if (info.id === showTask) {
            setShowTask(0);
            setWorkspaceName('');
        } else {
            setShowTask(info.id);
            setWorkspaceName(info.name);
        }
        const response = await fetch('http://localhost:8000/api/get/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                wsid: String(info.id),
                done: String(todo)
            })
        });

        const data = await response.json();
        setTasks(data);
    }

    const editWorkspace = () => {
        navigate(`/workspace/edit/${info.id}`);
    }


    return (
        <button className='flex m-auto flex-row justify-center w-full dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border' onClick={getTasks}>
            <div className="flex flex-col justify-center w-4/5">
                <div className='flex flex-col justify-center w-full'>
                    <h3 className='text-center text-3xl font-bold text-gray-800 dark:text-white'>{info.name}</h3>
                </div>
                <div className='flex flex-col justify-center w-full'>
                    <p className='text-center text-xl font-bold text-gray-800 dark:text-white'>{info.description}</p>
                </div>
            </div>
            <div className='flex flex-col m-auto justify-center w-min'>
                <FiEdit size={'2rem'} onClick={editWorkspace} />
            </div>
        </button>
    );
}

export default WorkSpace;