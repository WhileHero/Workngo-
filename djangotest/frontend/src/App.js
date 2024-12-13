import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';           // Исправленный путь
import HomePage from './components/HomePage/HomePage';     // Исправленный путь
import JobList from './components/JobList/JobList';       // Исправленный путь
import JobDetail from './components/JobDetail/JobDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<JobList />} />
                    <Route path="/jobs/:id" element={<JobDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;