export interface Referral {
	id?: string;
	givenName: string;
	surname: string;
	email: string;
	phone: string;
	addrHomeNameNum?: string;
	addrStreet?: string;
	addrSuburb?: string;
	addrState: string;
	addrPostCode: string;
	addrCountry: string | null;
	avatar?: string | File;
}
