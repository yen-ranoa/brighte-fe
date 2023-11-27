import { Referral } from '../types/Referral';
import { api } from './api';

export const referralApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getReferralsList: builder.query<Referral[], void>({
			query: () => 'referral',
		}),
		getReferral: builder.query<Referral, void>({
			query: (id) => `referral/${id}`,
		}),
		createReferral: builder.mutation<Referral, FormData>({
			query: (body) => ({
				url: 'referral',
				method: 'POST',
				body,
				formData: true,
			}),
		}),
		updateReferral: builder.mutation<Referral, { id: string; form: FormData }>({
			query: (data) => {
				const { id, form } = data;
				return {
					url: `referral/${id}`,
					method: 'PUT',
					body: form,
					formData: true,
				};
			},
		}),
		deleteReferral: builder.mutation<Referral, String>({
			query: (id) => ({
				url: `referral/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useCreateReferralMutation,
	useDeleteReferralMutation,
	useGetReferralQuery,
	useGetReferralsListQuery,
	useLazyGetReferralQuery,
	useLazyGetReferralsListQuery,
	useUpdateReferralMutation,
} = referralApi;
