import { Container, Grid } from '@mantine/core';
import React from 'react';
import ReferralForm from './ReferralForm';
import ReferralList from './ReferralList';

export const ReferralPage = () => {
	return (
		<Container px={0} mx={0} fluid>
			<Grid grow gutter={0} align='stretch'>
				<Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
					<ReferralForm />
				</Grid.Col>
				<Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} bg='whitesmoke'>
					<ReferralList />
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default ReferralPage;
