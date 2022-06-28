import { Link } from "react-router-dom";

const WorkSpace = ({ info }) => {
    return (
        <Link to={info.path} className='flex flex-col dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border'>
            <div className='flex flex-col justify-center pl-8'>
                <h3 className='text-left text-xl font-bold text-gray-800 dark:text-white'>{info.title}</h3>
            </div>
            <div className='flex flex-col justify-center pl-8'>
                <p className='text-left text-sm font-bold text-gray-800 dark:text-white'>{info.description}</p>
            </div>
        </Link>
    );
}

export default WorkSpace;