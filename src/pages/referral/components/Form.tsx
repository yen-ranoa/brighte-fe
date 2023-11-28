import {
	Button,
	Center,
	CloseButton,
	Divider,
	FileButton,
	Flex,
	Grid,
	Image,
	Paper,
	Select,
	Space,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import Label from '../../../components/FormLabel';
import { NumberInput } from '../../../components/MaskedNumberInput';
import { SelectedReferralContext } from '../../../context/SelectedReferralContext';
import { createObjectUrl, showNotif } from '../../../helpers/utils';
import {
	useCreateReferralMutation,
	useLazyGetReferralsListQuery,
	useUpdateReferralMutation,
} from '../../../services/referralApi';
import { Referral } from '../../../types/Referral';

export const FormDetails = () => {
	const [file, setFile] = useState<string>('');
	const countries = useMemo(() => countryList().getLabels(), []);

	const [createReferral, { isLoading: isCreateLoading }] = useCreateReferralMutation();
	const [updateReferral, { isLoading: isUpdateLoading }] = useUpdateReferralMutation();
	const [getReferralList] = useLazyGetReferralsListQuery();
	const { selectedReferral, setSelectedReferral } = useContext(SelectedReferralContext);

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
		} as Referral,
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

	useEffect(() => {
		// if there is selectedReferral, populate the form
		if (selectedReferral) {
			form.setValues(selectedReferral);
			setFile(selectedReferral.avatar as string);
		}
	}, [selectedReferral]);

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
	 * Handles clearing the form
	 */
	const clearForm = () => {
		form.reset();
		form.clearErrors();
		form.setFieldValue('addrCountry', null);
		setFile('');
		setSelectedReferral(null);
	};

	/**
	 * Common success handler for create and update referral builder form
	 * @param response {Referral}
	 * @param isCreate {boolean}
	 */
	const formSuccessHandling = (response: Referral, isCreate: boolean) => {
		const title = isCreate ? 'Create' : 'Update';
		if (response.id) {
			showNotif(`${title} Referral Success`, `Successfully ${title}d a referral.`);
			getReferralList();
			clearForm();
		}
	};

	/**
	 * Common error handler for create and update referral builder form
	 * @param err  {Error}
	 * @param isCreate {boolean}
	 */
	const formErrHandling = (err: Error, isCreate: boolean) => {
		const title = isCreate ? 'Create' : 'Update';
		showNotif(`${title} Referral Failed`, err.message || 'Something went wrong. Please try again.', true);
	};

	/**
	 * Handler on Submit referral
	 * @param values {Referral}
	 */
	const onCreateReferral = (values: Referral) => {
		const formData = new FormData();
		for (const key in values) {
			if (Object.prototype.hasOwnProperty.call(values, key)) {
				if (
					(selectedReferral && selectedReferral[key as keyof Referral] !== values[key as keyof Referral]) ||
					!selectedReferral
				) {
					formData.append(key, values[key as keyof Referral] || '');
				}
			}
		}
		if (selectedReferral && values.id) {
			updateReferral({ id: values.id, form: formData })
				.unwrap()
				.then((response) => formSuccessHandling(response, false))
				.catch((err: Error) => formErrHandling(err, false));
		} else {
			createReferral(formData)
				.unwrap()
				.then((response) => formSuccessHandling(response, true))
				.catch((err: Error) => formErrHandling(err, true));
		}
	};

	/**
	 * Handler for avatar change
	 * @param uploadedFile {File | null}
	 */
	const uploadAvatar = (uploadedFile: File | null) => {
		console.log(uploadedFile);
		if (uploadedFile && uploadedFile.type.startsWith('image')) {
			form.setFieldValue('avatar', uploadedFile);
			setFile(createObjectUrl(uploadedFile));
			console.log(createObjectUrl(uploadedFile));
		} else {
			removeAvatar();
		}
	};

	/**
	 * Remove selected avatar
	 */
	const removeAvatar = () => {
		form.setFieldValue('avatar', '');
		setFile('');
		console.log('remiove avatar');
	};

	return (
		<form onSubmit={form.onSubmit(onCreateReferral)} noValidate>
			<Flex justify='space-between' align='center'>
				<Text c='dimmed' tt='capitalize' fw={700}>
					PERSONAL DETAILS
				</Text>
				<Button variant='subtle' onClick={clearForm}>
					Clear form
				</Button>
			</Flex>
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
					<NumberInput label={<Label label='Phone' />} mask='0000-000-000' {...form.getInputProps('phone')} required />
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
					<NumberInput
						mask='00000'
						label={<Label label='Postcode' />}
						{...form.getInputProps('addrPostCode')}
						required
					/>
				</Grid.Col>
				<Grid.Col {...gridColProps}>
					<Select
						data={countries}
						searchable
						clearable
						label={<Label label='Country' />}
						key='select-countries'
						{...form.getInputProps('addrCountry')}
						required
					/>
				</Grid.Col>
			</Grid>

			<Space h='md' />

			{file && (
				<Center mt='md'>
					<Paper withBorder radius='xl' pos='relative'>
						<Tooltip label='Remove avatar'>
							<CloseButton
								aria-label='Remove avatar'
								pos='absolute'
								bg='white'
								radius='xl'
								size='sm'
								onClick={removeAvatar}
							/>
						</Tooltip>

						<Image h={150} w={130} src={file} radius='xl' />
					</Paper>
				</Center>
			)}
			<Space h='md' />

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
					<Button
						variant='filled'
						fullWidth
						size='lg'
						type='submit'
						key='submit-btn'
						loading={isCreateLoading || isUpdateLoading}
					>
						{selectedReferral ? 'Update' : 'Create'} Referral
					</Button>
				</Grid.Col>
			</Grid>
		</form>
	);
};

export default FormDetails;
