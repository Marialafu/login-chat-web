import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import {
	StyledConnectedMessage,
	StyledMessage,
	StyledTitleContainer
} from './home.styles';
import LogOut from '../../logout/LogOut';
import socket from '../../../lib/config/socket';
import { v4 } from 'uuid';

const Home = () => {
	const { user } = useContext(AuthContext);
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket.on('users-connected', usersConnected => {
			console.log(usersConnected);
		});

		return () => socket.off('users-connected');
	}, []);

	useEffect(() => {
		if (!user) return;
		socket.emit('user-connected', { email: user.email });
	}, [user]);

	useEffect(() => {
		socket.on('server-message', serverData => {
			return serverMessage(messageList, setMessageList, serverData);
		});

		return () => socket.off('server-message', serverMessage);
	}, [messageList]);

	return (
		<>
			<StyledTitleContainer>
				<h2>Bienvenido {user?.email}</h2>
			</StyledTitleContainer>
			<form onSubmit={event => sendMessage(event, user)}>
				<input type='text' name='message' />
				<button type='submit'>ENVIAR</button>
			</form>
			<ul>
				{socket.connected && (
					<StyledConnectedMessage>you are connected</StyledConnectedMessage>
				)}
				{messageList.map(message => (
					<StyledMessage key={v4()}>
						{message.user.email}: {message.message}
					</StyledMessage>
				))}
			</ul>
			<LogOut />
		</>
	);
};

const sendMessage = (event, user) => {
	event.preventDefault();
	const eventFile = event.target;
	const message = eventFile.message.value;

	socket.emit('client-message', { message: message, user: user });
};

const serverMessage = (messageList, setMessageList, serverData) => {
	setMessageList([...messageList, serverData]);
};

export default Home;
