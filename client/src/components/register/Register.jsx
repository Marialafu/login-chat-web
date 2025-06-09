import { Link } from 'react-router-dom';
import {
	StyledRegisterContainer,
	StyledRegisterOptions,
	StyledTitle
} from './register.styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { v4 } from 'uuid';

const Register = () => {
	const { setUser } = useContext(AuthContext);

	return (
		<>
			<h1>REGISTER</h1>
			<StyledRegisterContainer
				onSubmit={event =>
					handleSubmit(
						event,
						event.target.name.value,
						event.target.email.value,
						event.target.password.value,
						setUser
					)
				}
			>
				<StyledRegisterOptions>
					<StyledTitle>NAME</StyledTitle>
					<input name='name' type='text' />
				</StyledRegisterOptions>
				<StyledRegisterOptions>
					<StyledTitle>EMAIL</StyledTitle>
					<input name='email' type='text' />
				</StyledRegisterOptions>
				<StyledRegisterOptions>
					<StyledTitle>PASSWORD</StyledTitle>
					<input name='password' type='text' />
				</StyledRegisterOptions>
				<Link to='/loginHome'>
					<button type='submit'>REGISTER</button>
				</Link>
			</StyledRegisterContainer>
			<Link to='/login'>
				<h5>already have account? LOGIN</h5>
			</Link>
		</>
	);
};

const handleSubmit = async (e, name, email, password, setUser) => {
	//que pasa si quiero poner un nombre
	e.preventDefault();
	const registerData = {
		id: v4(),
		displayName: name,
		email,
		password
	};
	console.log(registerData);

	//const { email, password } = registerData;
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		setUser({ ...registerData });
	} catch (err) {
		console.log(err);
	}
};

export default Register;
