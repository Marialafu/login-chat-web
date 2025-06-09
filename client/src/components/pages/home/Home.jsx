import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<h1>landing</h1>
			<Link to='/register'>
				<button>REGISTER</button>
			</Link>
			<Link to='/login'>
				<button>LOGIN</button>
			</Link>
		</>
	);
};

export default Home;
