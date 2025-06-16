import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@radix-ui/react-icons';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useCreateGameServer } from '@/shared/hooks';
import {
  AddGameServerScheme,
  AddGameServerSchemeType,
  ProfileExtendedBaseEntity,
} from '@/shared/api/contracts';
import { Icons } from '@/shared/ui/icons';

type AddGameServerDialogParams = {
  profile?: ProfileExtendedBaseEntity;
};

export const CreateGameServerDialog = ({ profile }: AddGameServerDialogParams) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = () => setOpen((prev) => !prev);

  const form = useForm<AddGameServerSchemeType>({
    resolver: zodResolver(AddGameServerScheme),
  });

  const { mutateAsync, isPending } = useCreateGameServer();

  const onSubmit: SubmitHandler<AddGameServerSchemeType> = async (
    body: AddGameServerSchemeType,
  ) => {
    await mutateAsync({
      profileName: profile?.profileName || '',
      ...body,
    });

    form.reset();
    onOpenChange();
    window.location.reload(); //TODO: update server list without reloading the page
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-fit gap-2">
          <PlusIcon width={16} height={16} />
          Add server
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adding a server</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel>Enter server name</FormLabel>
              <FormControl>
                <Input placeholder="Enter server name" {...form.register('name')} />
              </FormControl>
              {form.formState.errors.name && (
                <FormMessage>{form.formState.errors.name.message}</FormMessage>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Enter the server address</FormLabel>
              <FormControl>
                <Input placeholder="Enter the server address" {...form.register('address')} />
              </FormControl>
              {form.formState.errors.address && (
                <FormMessage>{form.formState.errors.address.message}</FormMessage>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Enter the server port</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the server port"
                  {...form.register('port', { valueAsNumber: true })}
                />
              </FormControl>
              {form.formState.errors.port && (
                <FormMessage>{form.formState.errors.port.message}</FormMessage>
              )}
            </FormItem>
            <div className="flex justify-end">
              <Button disabled={isPending || !form.formState.isDirty}>
                {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
