import { Text } from '@mantine/core';
import React from 'react';

export const Label = ({ label }: { label: string }) => {
	return (
		<Text span c='gray' tt='uppercase' size='sm' fw={500}>
			{label}
		</Text>
	);
};

export default Label;
