import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/config/firebase.config';
import { StyledLogOutButton } from './logOut.styles';

const LogOut = () => {
	const navigate = useNavigate();
	return (
		<StyledLogOutButton onClick={() => handleSignOut(navigate)}>
			cerrar sesión
		</StyledLogOutButton>
	);
};

const handleSignOut = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default LogOut;
