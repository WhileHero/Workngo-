// frontend/src/components/JobList/JobList.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
// useState - хук для управления состоянием компонента
// useEffect - хук для выполнения побочных эффектов (например, запросов к API)

function JobList() {
    const { isAuthenticated } = useAuth();
    // Создаем состояние для хранения списка вакансий
    // jobs - сами данные, setJobs - функция для их обновления
    const [jobs, setJobs] = useState([]);
    
    // Состояние для поискового запроса
    const [searchQuery, setSearchQuery] = useState('');

    // useEffect выполнится при первой загрузке компонента
    useEffect(() => {
        fetchJobs();
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз

    // Функция для получения вакансий с сервера
    const fetchJobs = async () => {
        try {
            // Делаем GET-запрос к нашему API
            const response = await fetch('/api/jobs/');
            const data = await response.json();
            // Обновляем состояние списка вакансий
            setJobs(data);
        } catch (error) {
            console.error('Ошибка при получении вакансий:', error);
        }
    };

    // Добавляем функцию handleApply
    const handleApply = async (jobId) => {
        try {
            const response = await fetch(`/api/jobs/${jobId}/apply/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                alert('Вы успешно откликнулись на вакансию!');
            } else {
                alert('Произошла ошибка при отклике на вакансию');
            }
        } catch (error) {
            console.error('Ошибка при отклике на вакансию:', error);
            alert('Произошла ошибка при отклике на вакансию');
        }
    };

    // Возвращаем JSX - структуру компонента
    return (
        <div className="search-results">
            <h2>Результаты поиска</h2>
            
            {/* Форма поиска */}
            <div className="search-bar">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Обновляем состояние при вводе
                    placeholder="Поиск вакансий..." 
                />
                <button onClick={fetchJobs}>Поиск</button>
            </div>

            {/* Отображаем список вакансий */}
            {jobs.map(job => (
                <div key={job.id} className="job">
                    <h3>{job.title}</h3>
                    <p><strong>Компания:</strong> {job.company}</p>
                    <p><strong>Местоположение:</strong> {job.location}</p>
                    <p>{job.description}</p>
                    
                    {/* Некоторые действия доступны только авторизованным пользователям */}
                    {isAuthenticated() && (
                        <button onClick={() => handleApply(job.id)}>
                            Откликнуться
                        </button>
                    )}
                    
                    <a href={`/job/${job.id}`}>Подробнее</a>
                </div>
            ))}
        </div>
    );
}

export default JobList;