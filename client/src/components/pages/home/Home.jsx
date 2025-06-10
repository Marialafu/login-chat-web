import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/config/firebase.config';
import { StyledTitleContainer } from './home.styles';

const Home = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<>
			<StyledTitleContainer>
				<h2>Bienvenido {user?.displayName}</h2>
				<span>{user?.email}</span>
			</StyledTitleContainer>

			<button onClick={() => handleSignOut(navigate)}>cerrar sesión</button>
		</>
	);
};

const handleSignOut = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Home;
