import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import ReferralPage from './pages';

const router = createBrowserRouter([
	{
		path: '/referral',
		element: <ReferralPage />,
	},
	{
		path: '/*',
		element: <Navigate to='/referral' />,
	},
]);

function App() {
	return (
		<MantineProvider
			theme={{
				primaryColor: 'green',
				colors: {
					green: [
						'#effaf3',
						'#dff3e5',
						'#bae6c9',
						'#92d9a9',
						'#71ce8f',
						'#5cc77d',
						'#51c473',
						'#41ad62',
						'#379956',
						'#298547',
					],
				},
			}}
		>
			<RouterProvider router={router} />
		</MantineProvider>
	);
}

export default App;
