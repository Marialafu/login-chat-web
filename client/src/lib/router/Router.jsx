import { Route, Routes } from 'react-router-dom';
import Home from '../../components/pages/home/Home';
import Register from '../../components/register/Register';
import Login from '../../components/login/Login';
import LoginHome from '../../components/pages/login home/LoginHome';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/loginHome' element={<LoginHome />} />
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
};

export default Router;
