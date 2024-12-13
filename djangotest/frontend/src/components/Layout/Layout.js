import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';
import { useAuth } from '../../context/AuthContext';

function Layout({ children }) {
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        {location.pathname !== '/' && (
                            <li><Link to="/">Главная</Link></li>
                        )}
                        
                        {isAuthenticated() ? (
                            <>
                                <li><Link to="/profile">Мой Профиль</Link></li>
                                <li>
                                    <button onClick={() => {
                                        // Здесь добавить логику выхода
                                    }}>
                                        Выход
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                {location.pathname !== '/login' && (
                                    <li><Link to="/login">Вход</Link></li>
                                )}
                                {location.pathname !== '/register' && (
                                    <li><Link to="/register">Регистрация</Link></li>
                                )}
                            </>
                        )}
                    </ul>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;