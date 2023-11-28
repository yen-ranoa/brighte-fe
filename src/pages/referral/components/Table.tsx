import { ActionIcon, Box, Paper, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React, { useContext, useMemo } from 'react';
import CommonTable from '../../../components/CommonTable';
import { SelectedReferralContext } from '../../../context/SelectedReferralContext';
import { Referral } from '../../../types/Referral';
import DeleteReferralPopover from './DeleteReferralPopover';

export const ReferralTable = ({ data = [], isLoading = false }: { data: Referral[]; isLoading: boolean }) => {
	const { setSelectedReferral } = useContext(SelectedReferralContext);

	const rows = useMemo(
		() =>
			data.map((referral) => {
				return {
					...referral,
					actions: (
						<>
							<Tooltip label='Edit referral'>
								<ActionIcon variant='subtle' color='gray' aria-label='Edit'>
									<IconEdit stroke={1.5} onClick={() => setSelectedReferral(referral)} />
								</ActionIcon>
							</Tooltip>
							<DeleteReferralPopover id={referral.id} />
						</>
					),
				};
			}),
		[data, setSelectedReferral]
	);

	const headers = useMemo(
		() => ({
			givenName: 'Given name',
			surname: 'Surname',
			email: 'Email',
			phone: 'Phone',
			actions: 'Actions',
		}),
		[]
	);

	return (
		<Box p='lg'>
			<Paper p='md'>
				<CommonTable
					data={{
						columnHeaders: headers,
						rows: rows,
					}}
					isLoading={false}
				/>
			</Paper>
		</Box>
	);
};

export default ReferralTable;
