const WorkSpace = ({ info }) => {
    return (
        <Link to={info.path} className='flex flex-col dark:black hover:border hover:bg-gray-100 dark:hover:bg-slate-900 hover:border-gray-200 dark:hover:border-slate-800 rounded-2xl cursor-pointer overflow-hidden box-border'>
            <div className='flex flex-col justify-center items-center'>
                <h3 className='text-center text-xl font-bold text-gray-800 dark:text-white'>{info.title}</h3>
            </div>
        </Link>
    );
}

export default WorkSpace;