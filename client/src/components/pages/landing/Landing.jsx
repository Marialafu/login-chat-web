import { useState } from 'react';
import Login from '../../login/Login';
import Register from '../../register/Register';

const Landing = () => {
	const [login, setLogin] = useState(true);

	return (
		<>
			<h1>Accede al chat</h1>
			<button onClick={() => setLogin(false)}>REGISTER</button>
			<button onClick={() => setLogin(true)}>LOGIN</button>

			{login && <Login />}
			{!login && <Register />}
		</>
	);
};

export default Landing;
