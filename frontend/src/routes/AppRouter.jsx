import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Launcher from '../pages/Launcher'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'

const AppRouter = () => {
    return  (
        <Router>
            <Routes>
                <Route path='/' element={<Launcher />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;