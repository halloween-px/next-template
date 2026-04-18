'use client';

import { ModalBaseLayout } from '@/components/modals-layouts/modal-base-layout';
import { useModalStore } from '@/stores/modal-store';

export const ModalProvider = () => {
	const modals = useModalStore((s) => s.modals);

	return (
		<>
			{modals.map((modal) => {
				const ModalComponent = modal.component;
				return (
					<ModalBaseLayout
						key={modal.id}
						modalId={modal.id}
						title={modal.title}
						description={modal.description}
						size={modal.size}>
						<ModalComponent />
					</ModalBaseLayout>
				);
			})}
		</>
	);
};
