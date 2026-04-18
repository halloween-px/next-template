import {
	contactsConfigV1,
	contactsConfigV2,
	contactsConfigV3,
	CONTACTS_TYPES,
} from '@/kit/components/blocks/contacts/config/_contacts';
import type { TContacts } from '@/kit/components/blocks/contacts/types';

export { CONTACTS_TYPES };

export const contactsConfigs: Record<string, TContacts> = {
	[CONTACTS_TYPES.V1]: contactsConfigV1,
	[CONTACTS_TYPES.V2]: contactsConfigV2,
	[CONTACTS_TYPES.V3]: contactsConfigV3,
};
