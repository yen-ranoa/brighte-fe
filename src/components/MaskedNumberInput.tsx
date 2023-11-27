import { Input, InputProps } from '@mantine/core';
import { ReactNode } from 'react';
import { IMaskInput } from 'react-imask';

interface Props extends InputProps {
	label?: string | ReactNode;
	mask?: string;
}
export const NumberInput: React.FC<Props> = (props) => {
	const { label, error, mask, required, ...others } = props;
	return (
		<Input.Wrapper label={label} error={error} required={required}>
			<Input component={IMaskInput} mask={mask} {...others} error={error} />
		</Input.Wrapper>
	);
};
