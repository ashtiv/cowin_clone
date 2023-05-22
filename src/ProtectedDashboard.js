import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import Dashboard from './Dashboard';

function ProtectedDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user || !user.multiFactor) {
                navigate('/');
            }
        });

        return unsubscribe;
    }, [navigate]);

    return <Dashboard />;
}

export default ProtectedDashboard;