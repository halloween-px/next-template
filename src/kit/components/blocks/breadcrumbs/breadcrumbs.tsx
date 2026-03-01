import { Container } from '@/kit/components/shared/container';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/kit/components/ui/breadcrumb';
import { Link } from '@/kit/components/ui/link';
import React from 'react';

type TSegment = {
	label: string;
	href: string;
};

type TBreadcrumbProps = {
	showHome?: boolean;
	homeLink?: string;
	segments?: Array<TSegment>;
};

const Breadcrumbs = ({ showHome = true, homeLink, segments }: TBreadcrumbProps) => {
	const breadcrumbsSegments = segments || [];

	if (breadcrumbsSegments.length === 0) {
		return null;
	}

	return (
		<Container>
			<Breadcrumb>
				<BreadcrumbList>
					{showHome && (
						<>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link variant={'link'} href={homeLink || '/'}>
										Главная
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</>
					)}
					{breadcrumbsSegments.map((segment, index, arr) => (
						<React.Fragment key={index}>
							<BreadcrumbItem>
								{arr.length === index + 1 && <BreadcrumbPage>{segment.label}</BreadcrumbPage>}
								<BreadcrumbLink asChild>
									<Link variant={'link'} href={segment.href}>
										{segment.label}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{index < breadcrumbsSegments.length - 1 && <BreadcrumbSeparator />}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</Container>
	);
};

export default Breadcrumbs;
