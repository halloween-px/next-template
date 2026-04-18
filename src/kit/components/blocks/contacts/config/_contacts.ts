/** Barrel: константы и пресеты contacts-v1 / v2 / v3 */
export {
	defaultContactsPreset,
	CONTACTS_ID,
	CONTACTS_TYPE,
	CONTACTS_TYPES,
} from './_contacts.constants';
export { contactsConfigV1 } from './_contactsConfig-v1';
export { contactsConfigV2 } from './_contactsConfig-v2';
export { contactsConfigV3 } from './_contactsConfig-v3';

/** Дефолт сайта — v1 */
import { contactsConfigV1 } from './_contactsConfig-v1';
export const contactsConfig = contactsConfigV1;
