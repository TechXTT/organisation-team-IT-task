import { BsCheck2Circle, BsCircle } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const Task = ({ info, setTasks, wsid }) => {
    const navigate = useNavigate();
    const done = () => {
        const updateDone = async () => {
            const response = await fetch('http://localhost:8000/api/update/done', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    id: String(info.id),
                    done: String(!info.done)
                })
            });

            await response.json();
            setTasks(prev => {
                const newTasks = prev.filter(task => task.id !== info.id);
                return newTasks;
            })

        }

        updateDone();
    }

    const editTask = () => {
        navigate(`/task/edit/${wsid}/${info.id}`);
    }

    return (
        <button className='flex flex-row w-full dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border' >
            <div className="flex flex-col justify-center w-1/2">
                <div className='flex flex-col justify-center'>
                    <h3 className='text-center text-3xl font-bold text-gray-800 dark:text-white'>{info.name}</h3>

                </div>
                <div className='flex flex-col justify-center'>
                    <p className='text-center text-xl font-bold text-gray-800 dark:text-white'>{info.note}</p>
                </div>
            </div>
            <div className='flex flex-col m-auto justify-center w-1/4 truncate'>
                <p className='text-center text-xl font-bold text-gray-800 dark:text-white'>{String(info.expires_at).split('T')[0]}</p>
            </div>
            <div className='flex flex-row m-auto justify-center w-1/4 space-x-4'>
                {info.done ? <BsCheck2Circle size={'2rem'} onClick={done} /> : <BsCircle size={'1.8rem'} onClick={done} />}
                {!info.done ? <FiEdit size={'2rem'} onClick={editTask} /> : null}
            </div>


        </button>
    );
}

export default Task;