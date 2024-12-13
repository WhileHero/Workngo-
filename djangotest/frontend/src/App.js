import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';           
import HomePage from './components/HomePage/HomePage';     
import JobList from './components/JobList/JobList';       
import JobDetail from './components/JobDetail/JobDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<JobList />} />
                        <Route path="/jobs/:id" element={<JobDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;