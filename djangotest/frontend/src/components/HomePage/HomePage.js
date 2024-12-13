import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
    // Состояния для полей формы
    const [formData, setFormData] = useState({
        title: '',
        minSalary: '',
        city: '',
        maxHours: '',
        availableDays: []
    });

    // Дни недели для чекбоксов
    const daysOfWeek = [
        { value: 'ПН', label: 'Понедельник' },
        { value: 'ВТ', label: 'Вторник' },
        { value: 'СР', label: 'Среда' },
        { value: 'ЧТ', label: 'Четверг' },
        { value: 'ПТ', label: 'Пятница' },
        { value: 'СБ', label: 'Суббота' },
        { value: 'ВС', label: 'Воскресенье' }
    ];

    // Обработчик изменения полей формы
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Обработчик изменения чекбоксов
    const handleDayChange = (value) => {
        setFormData(prev => {
            const days = prev.availableDays.includes(value)
                ? prev.availableDays.filter(day => day !== value)
                : [...prev.availableDays, value];
            return { ...prev, availableDays: days };
        });
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams({
                title: formData.title,
                min_salary: formData.minSalary,
                city: formData.city,
                max_hours: formData.maxHours,
                available_days: formData.availableDays
            });

            const response = await fetch(`/api/jobs/search?${queryParams}`);
            const data = await response.json();
            // Здесь можно добавить обработку результатов
            console.log(data);
        } catch (error) {
            console.error('Ошибка при поиске:', error);
        }
    };

    return (
        <div className="main-page">
            <h1>Добро пожаловать на наш сайт!</h1>
            <p>Здесь вы можете найти множество вакансий по различным категориям.</p>
            
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Название профессии"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    
                    <input
                        type="number"
                        name="minSalary"
                        placeholder="Минимальная зарплата"
                        value={formData.minSalary}
                        onChange={handleInputChange}
                    />
                    
                    <input
                        type="text"
                        name="city"
                        placeholder="Город"
                        value={formData.city}
                        onChange={handleInputChange}
                    />

                    <div className="work-days">
                        <label>Дни, в которые вы готовы работать:</label>
                        {daysOfWeek.map(day => (
                            <label key={day.value}>
                                <input
                                    type="checkbox"
                                    checked={formData.availableDays.includes(day.value)}
                                    onChange={() => handleDayChange(day.value)}
                                />
                                {day.label}
                            </label>
                        ))}
                    </div>

                    <div className="work-hours">
                        <label>Максимальная длительность смены (часов):</label>
                        <input
                            type="number"
                            name="maxHours"
                            value={formData.maxHours}
                            onChange={handleInputChange}
                            min="1"
                            max="24"
                        />
                    </div>

                    <button type="submit">Поиск</button>
                </form>
            </div>
        </div>
    );
}

export default HomePage;