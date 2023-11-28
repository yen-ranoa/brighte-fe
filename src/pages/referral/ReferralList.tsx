import { Box } from '@mantine/core';
import React from 'react';
import { useGetReferralsListQuery } from '../../services/referralApi';
import ReferralTable from './components/Table';

export const ReferralList = () => {
	const { data = [], isLoading } = useGetReferralsListQuery();
	return (
		<Box p='xl'>
			<ReferralTable data={data} isLoading={isLoading} />
		</Box>
	);
};

export default ReferralList;
