'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignUpFormSchemaType, signUpSchema } from '@/features/auth-credentials-form/lib/static';
import { useRegistration } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Icons } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { mutateAsync, isPending } = useRegistration();

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormSchemaType> = async (data: SignUpFormSchemaType) => {
    mutateAsync(data);
  };

  return (
    <div className={cn('grid gap-4', className)} {...props}>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel>Enter login</FormLabel>
            <FormControl>
              <Input placeholder="Enter login" {...form.register('login')} />
            </FormControl>
            {form.formState.errors.login && (
              <FormMessage>{form.formState.errors.login.message}</FormMessage>
            )}
          </FormItem>

          <FormItem>
            <FormLabel>Enter email</FormLabel>
            <FormControl>
              <Input placeholder="Enter email" {...form.register('email')} />
            </FormControl>
            {form.formState.errors.email && (
              <FormMessage>{form.formState.errors.email.message}</FormMessage>
            )}
          </FormItem>

          <FormItem>
            <FormLabel>Enter password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter password" {...form.register('password')} />
            </FormControl>
            {form.formState.errors.password && (
              <FormMessage>{form.formState.errors.password.message}</FormMessage>
            )}
          </FormItem>

          <FormItem>
            <FormLabel>Repeat password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Repeat password"
                {...form.register('confirmPassword')}
              />
            </FormControl>
            {form.formState.errors.confirmPassword && (
              <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>
            )}
          </FormItem>

          <Button className="w-full" disabled={isPending}>
            {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </form>
      </Form>
    </div>
  );
}
