import { signInWithEmailAndPassword } from 'firebase/auth';
import {
	StyledLoginContainer,
	StyledLoginOptions,
	StyledTitle
} from './login.styles';
import { auth } from '../../lib/config/firebase.config';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
	const [error, setError] = useState(null);
	const { setUser } = useContext(AuthContext);
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
						setUser
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
			<Link to='/register'>
				<h5>do not have account? REGISTER</h5>
			</Link>
		</>
	);
};

const handleSubmit = async (e, email, password, setError, setUser) => {
	e.preventDefault();
	const loginData = {
		email,
		password
	};
	//const { email, password } = loginData;
	try {
		await signInWithEmailAndPassword(auth, { ...loginData });
		//setUser()
	} catch (err) {
		setError('*Invalid email');
		console.log('invalid');
	}
};

export default Login;
