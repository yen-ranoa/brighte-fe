import { Container, Grid } from '@mantine/core';
import React, { useState } from 'react';
import { SelectedReferralContext } from '../../context/SelectedReferralContext';
import { Referral } from '../../types/Referral';
import ReferralForm from './ReferralForm';
import ReferralList from './ReferralList';

export const ReferralPage = () => {
	const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
	return (
		<Container px={0} mx={0} fluid>
			<SelectedReferralContext.Provider value={{ selectedReferral, setSelectedReferral }}>
				<Grid grow gutter={0} justify='flex-start' className='referral-container'>
					<Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
						<ReferralForm />
					</Grid.Col>
					<Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} bg='whitesmoke' className='referral-list'>
						<ReferralList />
					</Grid.Col>
				</Grid>
			</SelectedReferralContext.Provider>
		</Container>
	);
};

export default ReferralPage;
