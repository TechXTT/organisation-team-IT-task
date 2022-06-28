import { useState } from 'react';
import WorkSpace from '../components/WorkSpace';

const Workspaces = ({ todo }) => {
    //todo : bool to check if watching todo or done
    //two panes left one is with list of workspaces and right is with tasks in pressed workspace
    const [workspaces, setWorkspaces] = useState([
        {
            path: '/workspace/1',
            title: 'Workspace 1',
            description: 'This is workspace 1',
        },
        {
            path: '/workspace/2',
            title: 'Workspace 2',
            description: 'This is workspace 2',
        },
        {
            path: '/workspace/3',
            title: 'Workspace 3',
            description: 'This is workspace 3',
        }
    ]);
    return (
        <div className='flex h-full w-screen'>
            <div className='h-4/5 w-4/5 m-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                {workspaces.map((info, index) => {
                    return <WorkSpace key={index} info={info} />;
                })}
            </div>
        </div>
    );
}

export default Workspaces;