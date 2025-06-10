import { signInWithEmailAndPassword } from 'firebase/auth';
import {
	StyledLoginContainer,
	StyledLoginOptions,
	StyledTitle
} from './login.styles';
import { auth } from '../../lib/config/firebase.config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	return (
		<>
			<h1>LOGIN</h1>
			<StyledLoginContainer
				onSubmit={event =>
					handleSubmit(
						event,
						event.target.email.value,
						event.target.password.value,
						setError,
						navigate
					)
				}
			>
				<StyledLoginOptions>
					<StyledTitle>EMAIL</StyledTitle>
					<input name='email' type='text' />
					{error && <span>{error}</span>}
				</StyledLoginOptions>
				<StyledLoginOptions>
					<StyledTitle>PASSWORD</StyledTitle>
					<input name='password' type='text' />
				</StyledLoginOptions>
				<button type='submit'>LOGIN</button>
			</StyledLoginContainer>
		</>
	);
};

const handleSubmit = async (e, email, password, setError, navigate) => {
	e.preventDefault();
	//const { email, password } = loginData;
	try {
		await signInWithEmailAndPassword(auth, email, password);
		navigate('/home');
	} catch (err) {
		//setError('*Invalid email');
		console.log(err);
	}
};

export default Login;
