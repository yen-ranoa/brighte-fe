import { createContext } from 'react';
import { Referral } from '../types/Referral';

export const SelectedReferralContext = createContext<{
	selectedReferral: Referral | null;
	setSelectedReferral: (val: Referral | null) => void;
}>({
	selectedReferral: null,
	setSelectedReferral: () => {},
});
