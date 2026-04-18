import type { TContacts } from '../types';
import { CONTACTS_ID, CONTACTS_TYPES, defaultContactsPreset } from './_contacts.constants';

export const contactsConfigV3: TContacts = {
	id: CONTACTS_ID,
	type: CONTACTS_TYPES.V3,
	content: defaultContactsPreset(),
};
