import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../lib/config/firebase.config';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged(user => {
			if (user) {
				console.log('Usuario autentificado: ', user);
				setUser(user);
			} else {
				console.log('Usuario NO autentificado');
				setUser(null);
			}
		}, []);

		return () => unsuscribe();
	});

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
