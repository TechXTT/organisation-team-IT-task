import { useState, useEffect } from 'react';
import WorkSpace from '../components/WorkSpace';
import Task from '../components/Task'
import { useNavigate } from 'react-router-dom';

const Workspaces = ({ todo }) => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceName, setWorkspaceName] = useState('');
    const [showTask, setShowTask] = useState(0);

    useEffect(() => {
        setTasks([]);
    }, [todo]);

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

    return (
        <div className='flex h-full w-screen'>
            <div className='flex w-4/5 h-4/5 m-auto'>
                <div className='flex flex-col h-full justify-center items-center m-auto w-1/4'>
                    <div className='flex flex-col justify-center items-center m-auto w-full text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        <button className='flex m-auto flex-row justify-center w-full dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border' onClick={() => {
                            navigate('/workspace/create');
                        }
                        }>
                            <div className='flex flex-col justify-center w-full'>
                                <div className='flex flex-col justify-center w-full'>
                                    <h3 className='text-center text-3xl font-bold text-gray-800 dark:text-white'>Create Workspace</h3>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className='h-full w-full m-auto justify-center items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                        <div className='flex flex-col justify-center w-full'>
                            <h3 className='text-center text-3xl font-bold text-gray-800 dark:text-white'>Workspaces: </h3>
                        </div>
                        {workspaces.map((info, index) => {
                            return <WorkSpace key={index} info={info} setTasks={setTasks} setShowTask={setShowTask} showTask={showTask} setWorkspaceName={setWorkspaceName} todo={todo} />;
                        })}
                    </div>
                </div>
                {showTask > 0 ? (
                    <div className='flex flex-col h-full justify-center items-center m-auto w-3/4'>
                        <div className='flex flex-col justify-center items-center m-auto w-full text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                            <button className='flex m-auto flex-row justify-center w-full dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border' onClick={() => {
                                navigate('/task/create');
                            }
                            }>
                                <div className='flex flex-col justify-center w-full'>
                                    <div className='flex flex-col justify-center w-full'>
                                        <h3 className='text-center text-3xl font-bold text-gray-800 dark:text-white'>Create Task</h3>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div className='h-full w-full m-auto justify-center items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                            <div className='flex flex-col justify-center w-full'>
                                <h3 className='text-center text-3xl font-bold text-gray-800 dark:text-white'>Tasks in {workspaceName}:</h3>
                                <div className='flex flex-row justify-center w-full'>
                                    <div className='flex flex-col justify-center w-2/4'>
                                        <p className='text-center text-xl font-bold text-gray-800 dark:text-white'>Name / Note :</p>
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4'>
                                        <p className='text-center text-xl font-bold text-gray-800 dark:text-white'>Expires :</p>
                                    </div>
                                    <div className='flex flex-col justify-center w-1/4'>
                                        <p className='text-center text-xl font-bold text-gray-800 dark:text-white'>Actions :</p>
                                    </div>
                                </div>
                            </div>
                            {tasks.map((info, index) => {
                                return <Task key={index} info={info} wsid={showTask} setTasks={setTasks} />;
                            })}
                        </div>
                    </div>) : <></>}
            </div>
        </div>
    );
}

export default Workspaces;