import { ActionIcon, Button, Popover, Space, Text, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { showNotif } from '../../../helpers/utils';
import { useDeleteReferralMutation, useLazyGetReferralsListQuery } from '../../../services/referralApi';

export const DeleteReferralPopover = ({ id = '' }: { id?: string }) => {
	const [opened, setOpened] = useState(false);
	const [removeReferral, { isLoading }] = useDeleteReferralMutation();
	const [getReferralsList] = useLazyGetReferralsListQuery();

	/**
	 * Handler for removing referral from list
	 */
	const onRemoveReferral = () => {
		if (id) {
			removeReferral(id)
				.unwrap()
				.then(() => {
					getReferralsList();
					setOpened(false);
					showNotif('Remove Referral Success', 'Successfully removed a referral.');
				})
				.catch((err: Error) => {
					showNotif('Remove Referral Failed', err.message || 'Something went wrong. Please try again.', true);
				});
		} else {
			setOpened(false);
		}
	};

	return (
		<Popover width={200} position='bottom' withArrow shadow='md' opened={opened} onChange={setOpened}>
			<Popover.Target>
				<ActionIcon variant='subtle' color='gray' aria-label='Remove' onClick={() => setOpened((o) => !o)}>
					<Tooltip label='Remove referral'>
						<IconTrash stroke={1.5} />
					</Tooltip>
				</ActionIcon>
			</Popover.Target>
			<Popover.Dropdown>
				<Text size='sm'>Are you sure you want to delete this referral?</Text>
				<Space h='sm' />
				<Button variant='default' onClick={() => setOpened(false)}>
					No
				</Button>
				&nbsp;
				<Button variant='filled' color='red' onClick={onRemoveReferral} loading={isLoading}>
					Yes
				</Button>
			</Popover.Dropdown>
		</Popover>
	);
};

export default DeleteReferralPopover;
