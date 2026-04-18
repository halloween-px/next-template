'use client';

import { DefaultInfoForm } from '@/features/site-project/forms/default-info-form/default-info-form';

/** Контент модалки; оболочка Dialog — в `ModalBaseLayout` через `ModalProvider`. */
export function CreateSiteProjectModal() {
	return <DefaultInfoForm />;
}
