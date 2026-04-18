import type { TContacts } from '../types';
import { CONTACTS_ID, CONTACTS_TYPES, defaultContactsPreset } from './_contacts.constants';

export const contactsConfigV2: TContacts = {
	id: CONTACTS_ID,
	type: CONTACTS_TYPES.V2,
	content: defaultContactsPreset(),
};
