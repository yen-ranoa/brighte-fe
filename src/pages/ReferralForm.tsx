import { Box, Paper, Title } from '@mantine/core';
import React from 'react';
import FormDetails from './form/Form';

export const ReferralForm = () => {
	return (
		<Paper p='xl' withBorder shadow='sm'>
			<Title>Referral Builder</Title>

			<Box my='lg'>
				<FormDetails />
			</Box>
		</Paper>
	);
};

export default ReferralForm;
