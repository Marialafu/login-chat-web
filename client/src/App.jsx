import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import { GlobalStyles } from './styles/GlobalStyles';
import Router from './lib/router/Router';

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<AuthProvider>
				<Router />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
