import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.scss';
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
			}}
		>
			<RouterProvider router={router} />
		</MantineProvider>
	);
}

export default App;
