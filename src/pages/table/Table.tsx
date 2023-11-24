import { ActionIcon, Box, Table, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { ReferralForm } from '../form/FormTypes';

const list: ReferralForm[] = [
	{
		givenName: 'John',
		surname: 'Doe',
		email: 'jd@gmail.com',
		phone: '1234-123-123',
		addrHomeNameNum: '',
		addrStreet: '',
		addrSuburb: '',
		addrState: '',
		addrPostCode: '',
		addrCountry: '',
		avatar: '',
	},
	{
		givenName: 'John',
		surname: 'Doe',
		email: 'jd@gmail.com',
		phone: '1234-123-123',
		addrHomeNameNum: '',
		addrStreet: '',
		addrSuburb: '',
		addrState: '',
		addrPostCode: '',
		addrCountry: '',
		avatar: '',
	},
	{
		givenName: 'Kaitlyn',
		surname: 'Crow',
		email: 'kc@gmail.com',
		phone: '0987-667-555',
		addrHomeNameNum: '',
		addrStreet: '',
		addrSuburb: '',
		addrState: '',
		addrPostCode: '',
		addrCountry: '',
		avatar: '',
	},
	{
		givenName: 'Hero',
		surname: 'Rick',
		email: 'hero@gmail.com',
		phone: '0983-333-431',
		addrHomeNameNum: '',
		addrStreet: '',
		addrSuburb: '',
		addrState: '',
		addrPostCode: '',
		addrCountry: '',
		avatar: '',
	},
];

export const ReferralTable = () => {
	const rows = list.map((element: ReferralForm, index: number) => (
		<Table.Tr key={element.givenName + index}>
			<Table.Td>
				{index + 1} - {element.givenName}
			</Table.Td>
			<Table.Td>{element.surname}</Table.Td>
			<Table.Td>{element.email}</Table.Td>
			<Table.Td>{element.phone}</Table.Td>
			<Table.Td>
				<>
					<Tooltip label='Edit referral'>
						<ActionIcon variant='subtle' color='gray' aria-label='Edit'>
							<IconEdit stroke={1.5} />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Remove referral'>
						<ActionIcon variant='subtle' color='gray' aria-label='Remove'>
							<IconTrash stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				</>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Box p='lg'>
			<Table.ScrollContainer minWidth={300}>
				<Table stickyHeader bg='white' horizontalSpacing='md' highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th tt='uppercase' c='dimmed'>
								Given Name
							</Table.Th>
							<Table.Th tt='uppercase' c='dimmed'>
								Surname
							</Table.Th>
							<Table.Th tt='uppercase' c='dimmed'>
								Email
							</Table.Th>
							<Table.Th tt='uppercase' c='dimmed'>
								Phone
							</Table.Th>
							<Table.Th tt='uppercase' c='dimmed'>
								Actions
							</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody style={{ overflowY: 'auto' }}>
						{rows}
						{rows}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</Box>
	);
};

export default ReferralTable;
