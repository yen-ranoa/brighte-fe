import { notifications } from '@mantine/notifications';

export const showNotif = (title: string, message: string, isError?: boolean) => {
	notifications.show({
		title,
		message,
		color: isError ? 'red' : 'green',
	});
};

export const createObjectUrl = (obj: Blob | MediaSource) => {
	return URL.createObjectURL(obj);
};
