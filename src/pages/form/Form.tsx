import {
	Button,
	Center,
	CloseButton,
	Divider,
	FileButton,
	Grid,
	Image,
	Paper,
	Select,
	Space,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { FormErrors, isEmail, isNotEmpty, useForm } from '@mantine/form';
import React, { useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { ReferralForm } from './FormTypes';
import Label from './Label';

export const FormDetails = () => {
	const [file, setFile] = useState<File | null>(null);
	const countries = useMemo(() => countryList().getLabels(), []);
	const form = useForm({
		initialValues: {
			givenName: '',
			surname: '',
			email: '',
			phone: '',
			addrHomeNameNum: '',
			addrStreet: '',
			addrSuburb: '',
			addrState: '',
			addrPostCode: '',
			addrCountry: '',
			avatar: '',
		} as ReferralForm,
		validate: {
			givenName: isNotEmpty('Given name is required'),
			surname: isNotEmpty('Surname is required'),
			email: isEmail('Invalid email'),
			phone: isNotEmpty('Phone number is required'),
			addrState: isNotEmpty('State is required'),
			addrPostCode: isNotEmpty('Postcode is required'),
			addrCountry: isNotEmpty('Country is required'),
		},
	});

	const gridColProps = {
		span: {
			xs: 12,
			sm: 6,
			md: 6,
			lg: 6,
			xl: 6,
		},
	};

	/**
	 * Handle errors when submitting form
	 * @param errors {FormErrors}
	 */
	const handleErrors = (errors: FormErrors) => {
		console.log('errors', errors);
	};

	/**
	 * Handler on Submit referral
	 * @param values {ReferralForm}
	 */
	const createReferral = (values: ReferralForm) => {
		console.log(values);
		// call api here once ready
	};

	/**
	 * Handler for avatar change
	 * @param uploadedFile {File | null}
	 */
	const uploadAvatar = (uploadedFile: File | null) => {
		if (uploadedFile && uploadedFile.type.startsWith('image')) {
			form.setFieldValue('avatar', uploadedFile);
			setFile(uploadedFile);
		} else {
			setFile(null);
			form.setFieldValue('avatar', '');
		}
	};

	/**
	 * Remove selected avatar
	 */
	const removeAvatar = () => {
		form.setFieldValue('avatar', '');
		setFile(null);
	};

	return (
		<form onSubmit={form.onSubmit(createReferral, handleErrors)} noValidate>
			<Text c='dimmed' tt='capitalize' fw={700}>
				PERSONAL DETAILS
			</Text>
			<Divider my='sm' />
			<Grid grow>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='Given Name' />} {...form.getInputProps('givenName')} required />
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='Surname' />} {...form.getInputProps('surname')} required />
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='Email' />} {...form.getInputProps('email')} type='email' required />
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='Phone' />} {...form.getInputProps('phone')} required />
				</Grid.Col>
			</Grid>

			<Text c='dimmed' tt='capitalize' fw={700} mt='lg'>
				Address
			</Text>
			<Divider my='sm' mb='lg' />

			<Grid grow>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='Home name or #' />} {...form.getInputProps('addrHomeNameNum')} />
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='Street' />} {...form.getInputProps('addrStreet')} />
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='Suburb' />} {...form.getInputProps('addrSuburb')} />
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='State' />} {...form.getInputProps('addrState')} required />
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<TextInput label={<Label label='Postcode' />} {...form.getInputProps('addrPostCode')} required />
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<Select
						data={countries}
						searchable
						clearable
						label={<Label label='Country' />}
						{...form.getInputProps('addrCountry')}
						required
					/>
				</Grid.Col>
			</Grid>

			<Space h='xl' />

			<Grid>
				<Grid.Col {...gridColProps}>
					<FileButton onChange={uploadAvatar} accept='image/png,image/jpeg'>
						{(props) => (
							<Button {...props} variant='default' fullWidth size='lg' type='button' key='upload-btn'>
								Upload avatar
							</Button>
						)}
					</FileButton>
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<Button variant='filled' fullWidth size='lg' type='submit' key='submit-btn'>
						Create Referral
					</Button>
				</Grid.Col>
			</Grid>
			{file && (
				<Center mt='md'>
					<Paper withBorder radius='md' pos='relative'>
						<Tooltip label='Remove avatar'>
							<CloseButton
								aria-label='Remove avatar'
								pos='absolute'
								bg='white'
								radius='lg'
								size='sm'
								onClick={removeAvatar}
							/>
						</Tooltip>

						<Image h={150} w={130} src={URL.createObjectURL(file)} radius='md' />
					</Paper>
				</Center>
			)}
		</form>
	);
};

export default FormDetails;
