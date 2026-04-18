'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/kit/components/ui/alert-dialog';
import { Badge } from '@/kit/components/ui/badge';
import { Button } from '@/kit/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { Checkbox } from '@/kit/components/ui/checkbox';
import { Input } from '@/kit/components/ui/input';
import { Label } from '@/kit/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/kit/components/ui/radio-group';
import { Slider } from '@/kit/components/ui/slider';
import { Switch } from '@/kit/components/ui/switch';
import { Textarea } from '@/kit/components/ui/textarea';
import { ChevronUp, Search } from 'lucide-react';

export function FormsControlsShowcaseCard() {
	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<CardTitle className='text-base'>Формы и контролы</CardTitle>
				<CardDescription>Кнопки, поля, диалоги</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-6'>
				<div className='flex flex-wrap gap-2'>
					<Button size='sm'>Button</Button>
					<Button size='sm' variant='secondary'>
						Secondary
					</Button>
					<Button size='sm' variant='outline'>
						Outline
					</Button>
					<Button size='sm' variant='ghost'>
						Ghost
					</Button>
				</div>

				<div className='mt-4 flex flex-col gap-3 rounded-xl border border-border/60 bg-background/40 p-4 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<p className='text-sm font-medium'>Two-factor authentication</p>
						<p className='mt-0.5 text-xs text-muted-foreground'>
							Verify via email or phone number.
						</p>
					</div>
					<Button size='sm' variant='secondary' className='shrink-0'>
						Enable
					</Button>
				</div>

				<div className='flex flex-col gap-6'>
					<Label className='sr-only'>Volume</Label>
					<Slider defaultValue={[42]} max={100} step={1} aria-label='Volume' />
				</div>

				<div className='relative'>
					<Label htmlFor='preview-name' className='sr-only'>
						Name
					</Label>
					<Input id='preview-name' placeholder='Name' className='pr-10' />
					<Search
						className='pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground'
						aria-hidden
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label htmlFor='preview-message' className='sr-only'>
						Message
					</Label>
					<Textarea
						id='preview-message'
						placeholder='Message'
						rows={4}
						className='min-h-[100px] resize-none'
					/>
				</div>

				<div className='flex flex-wrap items-center gap-3 md:gap-4'>
					<Badge>Badge</Badge>
					<Badge variant='secondary'>Secondary</Badge>
					<Badge variant='outline'>Outline</Badge>
					<div className='mx-1 hidden h-6 w-px bg-border sm:block' aria-hidden />
					<RadioGroup defaultValue='a' className='flex items-center gap-3'>
						<RadioGroupItem value='a' id='rg-a' aria-label='Option A' />
						<RadioGroupItem value='b' id='rg-b' aria-label='Option B' />
					</RadioGroup>
					<div className='flex items-center gap-3'>
						<Checkbox defaultChecked id='cb1' aria-label='Checked' />
						<Checkbox id='cb2' aria-label='Unchecked' />
					</div>
				</div>

				<div className='flex flex-wrap items-center gap-3'>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant='outline' size='sm'>
								Alert Dialog
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete your data from our
									servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<div className='inline-flex rounded-md shadow-xs'>
						<Button variant='outline' size='sm' className='rounded-r-none border-r-0'>
							Left
						</Button>
						<Button
							variant='outline'
							size='icon'
							className='size-8 rounded-none border-r-0 px-0'
							aria-label='Expand'>
							<ChevronUp className='size-4' />
						</Button>
						<Button variant='outline' size='sm' className='rounded-l-none'>
							Right
						</Button>
					</div>

					<div className='flex items-center gap-2'>
						<Label htmlFor='airplane' className='text-sm text-muted-foreground'>
							Mode
						</Label>
						<Switch id='airplane' defaultChecked aria-label='Toggle' />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
