
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Logout = ({ logged, setLogged }) => {
    const navigate = useNavigate();
    useEffect(() => {

        const logout = async () => {
            await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            setLogged(false);
            navigate('/login')
        }
        if (logged) {
            logout();
        } else {
            navigate('/login')
        }
    }, []);

}

export default Logout;