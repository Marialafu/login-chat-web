import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/config/firebase.config';

const LoginHome = () => {
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<>
			<h2>Bienvenido {user?.displayName}</h2>
			<span>{user?.email}</span>
			<button onClick={() => handleSignOut(navigate, setUser)}>
				cerrar sesión
			</button>
		</>
	);
};

const handleSignOut = async (navigate, setUser) => {
	await signOut(auth);
	setUser(null);
	navigate('/');
};

export default LoginHome;
