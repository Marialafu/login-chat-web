import {
	StyledRegisterContainer,
	StyledRegisterOptions,
	StyledTitle
} from './register.styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
import { useNavigate } from 'react-router-dom';
const Register = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1>REGISTER</h1>
			<StyledRegisterContainer
				onSubmit={event => handleSubmit(event, navigate)}
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
				<button type='submit'>REGISTER</button>
			</StyledRegisterContainer>
		</>
	);
};

const handleSubmit = async (event, navigate) => {
	//que pasa si quiero poner un nombre
	event.preventDefault();
	const formData = event.target;
	const email = formData.email.value;
	const password = formData.password.value;

	//const { email, password } = registerData;
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		navigate('/home');
	} catch (err) {
		console.log(err);
	}
};

export default Register;
