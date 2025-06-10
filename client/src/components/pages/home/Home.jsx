import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import {
	StyledConnectedMessage,
	StyledDisconnectedMessage,
	StyledMessage,
	StyledTitleContainer
} from './home.styles';
import LogOut from '../../logout/LogOut';
import socket from '../../../lib/config/socket';
import { v4 } from 'uuid';

const Home = () => {
	const { user } = useContext(AuthContext);
	const [isConnected, setIsConnected] = useState(false);
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket.on('connect', () => setIsConnected(true));
		socket.on('server-message', serverData =>
			serverMessage(messageList, setMessageList, serverData)
		);

		return () => socket.off('server-message', serverMessage);
	}, []);

	return (
		<>
			<StyledTitleContainer>
				<h2>Bienvenido {user?.email}</h2>
			</StyledTitleContainer>
			<form onSubmit={event => sendMessage(event)}>
				<input type='text' name='message' />
				<button type='submit'>ENVIAR</button>
			</form>
			<ul>
				{isConnected && (
					<StyledConnectedMessage>
						{user?.email} is connected
					</StyledConnectedMessage>
				)}
				{messageList.map(message => (
					<StyledMessage key={v4()}>
						{user?.email}: {message}
					</StyledMessage>
				))}
				{!isConnected && (
					<StyledDisconnectedMessage>
						{user?.email} has disconnected
					</StyledDisconnectedMessage>
				)}
			</ul>
			<LogOut />
		</>
	);
};

const sendMessage = event => {
	event.preventDefault();
	const eventFile = event.target;
	const message = eventFile.message.value;

	socket.emit('client-message', message);
};

const serverMessage = (messageList, setMessageList, serverData) => {
	setMessageList([...messageList, serverData]);
};

export default Home;
