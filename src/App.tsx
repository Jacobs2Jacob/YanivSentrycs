import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect to HomePage */}
                <Route path="/" element={<Home />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;