import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_URL = 'http://localhost:4000';

// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: 'referral',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: () => ({}),
});
