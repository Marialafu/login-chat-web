import { Route, Routes } from 'react-router-dom';
import Home from '../../components/pages/home/Home';
import Register from '../../components/register/Register';
import Login from '../../components/login/Login';
import Landing from '../../components/pages/landing/Landing';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			<Route path='/home' element={<Home />} />
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
};

export default Router;
