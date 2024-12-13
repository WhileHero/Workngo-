import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                const response = await fetch('http://localhost:8800/accounts/logout/', {
                    method: 'POST',
                    credentials: 'include'
                });

                if (response.ok) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Ошибка при выходе из системы:', error);
                navigate('/login');
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Выход из системы</h2>
                <p>Выполняется выход из системы...</p>
            </div>
        </div>
    );
}

export default Logout;