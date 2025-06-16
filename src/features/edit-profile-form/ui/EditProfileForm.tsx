import React from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEditProfile } from '@/shared/hooks';
import {
  EditProfileFormSchemaType,
  EditProfileSchema,
  ProfileExtendedBaseEntity,
} from '@/shared/api/contracts';
import { Form, FormField, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { Icons } from '@/shared/ui/icons';
import { DASHBOARD_PAGES } from '@/shared/routes';
import { Switch } from '@/shared/ui/switch';

interface EditProfileFormProps {
  profile?: ProfileExtendedBaseEntity;
}

export const EditProfileForm = (props: EditProfileFormProps) => {
  const { profile } = props;

  const { push } = useRouter();

  const { mutateAsync, isPending } = useEditProfile();
  const form = useForm<EditProfileFormSchemaType>({
    values: {
      name: profile?.profileName || '',
      displayName: profile?.displayName || '',
      description: profile?.description || '',
      jvmArguments: profile?.jvmArguments || '',
      gameArguments: profile?.gameArguments || '',
      icon: profile?.iconBase64 || '',
      priority: profile?.priority || 0,
      background: profile?.background || '',
      isEnabled: profile?.isEnabled,
    },
    resolver: zodResolver(EditProfileSchema),
  });

  const onSubmit: SubmitHandler<EditProfileFormSchemaType> = async (
    body: EditProfileFormSchemaType,
  ) => {
    const formUpdate = new FormData();
    formUpdate.append('name', body.name);
    formUpdate.append('displayName', body.displayName);
    formUpdate.append('originalName', profile?.profileName || '');
    formUpdate.append('description', body.description);
    formUpdate.append('icon', body.icon?.[0]);
    formUpdate.append('enabled', body.isEnabled?.toString() ?? 'true');
    formUpdate.append('priority', body.priority?.toString() ?? '0');

    if (body.background && body.background[0]) {
      formUpdate.append('background', body.background[0]);
    }

    if (body.jvmArguments) {
      formUpdate.append('jvmArguments', body.jvmArguments);
    }

    if (body.gameArguments) {
      formUpdate.append('gameArguments', body.gameArguments);
    }

    await mutateAsync(formUpdate);

    if (form.formState.dirtyFields.name) {
      return push(`${DASHBOARD_PAGES.PROFILE}/${body.name}`);
    }

    form.reset(body);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-8 w-full lg:w-[58rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <h6 className="text-sm font-bold">Status</h6>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Profile display in the launcher
              </p>
            </div>
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <FormField
                control={form.control}
                name="isEnabled"
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <h6 className="text-sm font-bold">Name</h6>
              <p className="text-sm text-gray-700 dark:text-gray-300">Displayed in the directory</p>
            </div>
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <Input type="text" placeholder="Enter a profile name" {...form.register('name')} />
              {form.formState.errors.name && (
                <FormMessage>{form.formState.errors.name.message?.toString()}</FormMessage>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <h6 className="text-sm font-bold">Display name</h6>
              <p className="text-sm text-gray-700 dark:text-gray-300">Displayed in launcher</p>
            </div>
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <Input
                type="text"
                placeholder="Enter display name"
                {...form.register('displayName')}
              />
              {form.formState.errors.displayName && (
                <FormMessage>{form.formState.errors.displayName.message?.toString()}</FormMessage>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <h6 className="text-sm font-bold">Description</h6>
              <p className="text-sm text-gray-700 dark:text-gray-300">Displayed in launcher</p>
            </div>
            <div className="flex flex-col items-end gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {form.watch('description')?.length} of 1000
              </p>
              <Textarea
                placeholder="Enter a server description"
                rows={5}
                {...form.register('description')}
              />
              {form.formState.errors.description && (
                <FormMessage>{form.formState.errors.description.message?.toString()}</FormMessage>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <h6 className="text-sm font-bold">Jvm Arguments</h6>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Java virtual machine startup parameters
              </p>
            </div>
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <Input
                type="text"
                placeholder="Enter your jvm arguments"
                {...form.register('jvmArguments')}
              />
              {form.formState.errors.jvmArguments && (
                <FormMessage>{form.formState.errors.jvmArguments.message?.toString()}</FormMessage>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <h6 className="text-sm font-bold">Game Arguments</h6>
              <p className="text-sm text-gray-700 dark:text-gray-300">Client startup parameters</p>
            </div>
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <Input
                type="text"
                placeholder="Enter your game arguments"
                {...form.register('gameArguments')}
              />
              {form.formState.errors.gameArguments && (
                <FormMessage>{form.formState.errors.gameArguments.message?.toString()}</FormMessage>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <h6 className="text-sm font-bold">Priority</h6>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                The higher the number, the higher the profile in the list
              </p>
            </div>
            <div className="flex flex-col gap-y-1 w-full md:min-w-96 mb-2 lg:mb-0">
              <Input type="number" placeholder="Change priority" {...form.register('priority')} />
              {form.formState.errors.priority && (
                <FormMessage>{form.formState.errors.priority.message?.toString()}</FormMessage>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button disabled={isPending || form.formState.disabled || !form.formState.isDirty}>
              {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
