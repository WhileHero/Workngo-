import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './JobDetail.css';

function JobDetail() {
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // Функция получения CSRF токена
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Проверка аутентификации пользователя
    const fetchJobDetails = useCallback(async () => {
        try {
            const response = await fetch(`/api/jobs/${id}/`);
            const data = await response.json();
            setJob(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Ошибка при загрузке вакансии:', error);
            setIsLoading(false);
        }
    }, [id]); // Зависимость только от id

    const checkAuthentication = useCallback(async () => {
        try {
            const response = await fetch('/api/auth/check/', {
                credentials: 'include'
            });
            setIsAuthenticated(response.ok);
        } catch (error) {
            console.error('Ошибка при проверке аутентификации:', error);
            setIsAuthenticated(false);
        }
    }, []); // Нет зависимостей

    useEffect(() => {
        fetchJobDetails();
        checkAuthentication();
    }, [fetchJobDetails, checkAuthentication]);

    const handleApply = async () => {
        if (!isAuthenticated) {
            alert('Пожалуйста, войдите в систему для подачи заявления');
            navigate('/login'); // Перенаправление на страницу входа
            return;
        }

        try {
            const response = await fetch(`/api/jobs/${id}/apply/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                credentials: 'include',
            });

            const data = await response.json();
            
            if (response.ok) {
                alert('Ваше заявление успешно подано!');
            } else {
                alert(data.message || 'Произошла ошибка при подаче заявления');
                if (response.status === 401) {
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Ошибка при подаче заявления:', error);
            alert('Произошла ошибка при подаче заявления');
        }
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!job) {
        return <div>Вакансия не найдена</div>;
    }

    return (
        <div className="job-detail">
            <h1>{job.title}</h1>
            <div className="job-info">
                <p><strong>Зарплата:</strong> {job.salary} руб.</p>
                <p><strong>Город:</strong> {job.location}</p>
                <p><strong>Дни работы:</strong> {job.work_days}</p>
                <p><strong>Длительность смены:</strong> {job.work_hours_duration} ч.</p>
                <p><strong>Описание:</strong> {job.description}</p>
            </div>
            
            <button 
                className="apply-button"
                onClick={handleApply}
                disabled={!isAuthenticated}
            >
                {isAuthenticated ? 'Подать заявление' : 'Войдите для подачи заявления'}
            </button>
        </div>
    );
}

export default JobDetail;