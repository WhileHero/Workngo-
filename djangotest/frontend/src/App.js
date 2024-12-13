import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';           // Исправленный путь
import HomePage from './components/HomePage/HomePage';     // Исправленный путь
import JobList from './components/JobList/JobList';       // Исправленный путь

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<JobList />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;