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
import { readBackupMessages, saveBackUpMessages } from '../../../lib/utils/api';

const Home = () => {
	const { user } = useContext(AuthContext);
	const [messagesList, setMessagesList] = useState([]);
	const [oldMessages, setOldMessages] = useState([]);

	useEffect(() => {
		if (!user) return;
		socket.emit('user-connected', { email: user.email });
	}, [user]);

	useEffect(() => {
		socket.on('server-message', serverData => {
			return serverMessage(messagesList, setMessagesList, serverData);
		});

		return () => socket.off('server-message', serverMessage);
	}, [messagesList]);

	useEffect(() => {
		socket.on('users-connected', usersConnected => {
			console.log(usersConnected);
		});

		return () => socket.off('users-connected');
	}, [user]);

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
				{messagesList.map(message => (
					<StyledMessage key={v4()}>
						{message.user.email}: {message.message}
					</StyledMessage>
				))}
			</ul>
			<ul>
				{oldMessages.map(message => (
					<StyledMessage key={v4()}>
						{message.email}: {message.message}
					</StyledMessage>
				))}
			</ul>
			<button onClick={() => backupMessages(setOldMessages)}>
				Cargar mensajes antiguos
			</button>
			<LogOut />
		</>
	);
};

const sendMessage = async (event, user) => {
	event.preventDefault();
	const eventFile = event.target;
	const message = eventFile.message.value;

	socket.emit('client-message', { message: message, user: user });

	//guardamos el mensaje, necesita esperar por que la función espera a que se guarde el mensaje
	const confirmationMessage = await saveBackUpMessages({
		id: user.uid,
		message: message,
		email: user.email,
		date: new Date()
	});

	//el mensaje de confirmación nos sirve para el control de errores. Cuando se manda el mensaje llega a api, servidor, es correcto?, se res.send mensaje de confirmación, lo devuelve al api, y lo lee aquí. En caso de confirmación de errores, se llamaría a la función.
	console.log(confirmationMessage);
};

const serverMessage = (messageList, setMessageList, serverData) => {
	setMessageList([...messageList, serverData]);
};

const backupMessages = async setOldMessages => {
	try {
		const messages = await readBackupMessages();
		setOldMessages(messages);
	} catch (error) {
		console.log(error);
	}
};

export default Home;
