import { Center, LoadingOverlay, Table } from '@mantine/core';
import React, { useMemo } from 'react';

interface TableProps {
	columnHeaders: { [key: string]: any };
	rows: Array<{
		[key: string]: any;
	}>;
}

export const CommonTable = ({ data, isLoading = false }: { data: TableProps; isLoading: boolean }) => {
	const rows = useMemo(() => {
		const { columnHeaders } = data;
		const keys = Object.keys(columnHeaders);
		return (
			<Table.Tbody style={{ overflowY: 'auto' }}>
				{data.rows.length ? (
					data.rows.map((row, index: number) => (
						<Table.Tr key={row.id}>
							{keys.map((col) => (
								<Table.Td key={`row-${index}-${col}`}>{row[col]}</Table.Td>
							))}
						</Table.Tr>
					))
				) : (
					<Table.Tr key='no-referrals'>
						<Table.Td colSpan={5}>
							<Center>No referrals available</Center>
						</Table.Td>
					</Table.Tr>
				)}
			</Table.Tbody>
		);
	}, [data]);

	const headers = useMemo(() => {
		const { columnHeaders } = data;
		const keys = Object.keys(columnHeaders);
		return (
			<Table.Thead>
				<Table.Tr>
					{keys.map((col) => (
						<Table.Th key={col} tt='uppercase' c='dimmed' align='left'>
							{data.columnHeaders[col]}
						</Table.Th>
					))}
				</Table.Tr>
			</Table.Thead>
		);
	}, [data]);

	return (
		<Table.ScrollContainer minWidth={300}>
			<Table stickyHeader bg='white' horizontalSpacing='md' highlightOnHover>
				{headers}
				{isLoading ? <LoadingOverlay visible /> : rows}
			</Table>
		</Table.ScrollContainer>
	);
};

export default CommonTable;
