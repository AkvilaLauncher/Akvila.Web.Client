'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { IntegrationFormSchemaType, integrationSchema } from '../lib/static';

import { useEditIntegration, useGetActiveAuthIntegrations } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Icons } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';
import { AuthenticationType } from '@/shared/enums';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onOpenChange: (open: boolean) => void;
}

export function AuthenticationFormAzuriom({ className, onOpenChange, ...props }: SignInFormProps) {
  const { data: integration } = useGetActiveAuthIntegrations();

  const { mutateAsync, isPending } = useEditIntegration();

  const form = useForm<IntegrationFormSchemaType>({
    values: {
      endpoint:
        integration?.authType === AuthenticationType.AUTHENTICATION_TYPE_AZURIOM
          ? String(integration.endpoint)
          : '',
      authType:
        integration?.authType === AuthenticationType.AUTHENTICATION_TYPE_AZURIOM
          ? integration.authType
          : AuthenticationType.AUTHENTICATION_TYPE_AZURIOM,
    },
    resolver: zodResolver(integrationSchema),
  });

  const onSubmit: SubmitHandler<IntegrationFormSchemaType> = async (
    data: IntegrationFormSchemaType,
  ) => {
    await mutateAsync(data).then(() => {
      onOpenChange(false);
    });
  };

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <Form {...form}>
        <form className="flex flex-col space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel>Enter a link to your website</FormLabel>
            <FormControl>
              <Input placeholder="Enter a link to your website" {...form.register('endpoint')} />
            </FormControl>
            {form.formState.errors.endpoint && (
              <FormMessage>{form.formState.errors.endpoint.message}</FormMessage>
            )}

            <Alert variant="warning">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                Azuriom has a problem that will prevent other people from entering your servers!
                <br />
                <a href="https://gml-launcher.github.io/Gml.Docs/gml-auth-azuriom.html">
                  <strong className="underline">Read this article </strong>
                </a>
                to learn more.
              </AlertDescription>
            </Alert>
          </FormItem>

          <Button
            type="submit"
            className="w-fit ml-auto"
            disabled={isPending || !form.formState.isDirty}
          >
            {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
