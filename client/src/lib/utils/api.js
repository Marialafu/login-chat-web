const URL_BASE = 'http://localhost:3000';
const URL_API = '/api/messages/';

export const saveBackUpMessages = async body => {
	try {
		const response = await fetch(URL_BASE + URL_API, {
			method: 'PATCH',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		});

		//viene del send del controller(servidor)
		const confirmationMessage = await response.json();

		return confirmationMessage;
	} catch (error) {
		console.log(error);
	}
};

export const readBackupMessages = async () => {
	try {
		const response = await fetch(URL_BASE + URL_API);
		//el response.ok corresponde a que la petición haya ido mal, no los datos.
		if (response.ok) {
			const data = await response.json();
			return data;
		}
		console.log(response);
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
