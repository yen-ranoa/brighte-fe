import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.scss';
import ReferralPage from './pages/referral';
import { store } from './store';

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
			<Provider store={store}>
				<RouterProvider router={router} />
				<Notifications />
			</Provider>
		</MantineProvider>
	);
}

export default App;
