'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { DatabaseIcon, ImagesIcon, UsersIcon } from 'lucide-react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { EditSettingsPlatformSchema, EditSettingsPlatformSchemaType } from '../lib/zod';
import { extractProtocol } from '../lib/utils';

import { Protocol, ProtocolOption, StorageType, StorageTypeOption } from '@/shared/enums';
import { useEditSettingsPlatform, useSettingsPlatform } from '@/shared/hooks';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Button } from '@/shared/ui/button';
import { Icons } from '@/shared/ui/icons';
import { Switch } from '@/shared/ui/switch';
import { Input } from '@/shared/ui/input';
import { enumValues } from '@/shared/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import { Skeleton } from '@/shared/ui/skeleton';
import curseforge from '@/assets/logos/curseforge.ico';
import vk from '@/assets/logos/vk.svg';

export const EditSettingsPlatformForm = () => {
  const { data: platform, isLoading } = useSettingsPlatform();
  const { mutateAsync, isPending } = useEditSettingsPlatform();

  const form = useForm<EditSettingsPlatformSchemaType>({
    disabled: isLoading,
    resolver: zodResolver(EditSettingsPlatformSchema),
    defaultValues: {
      registrationIsEnabled: false,
      storageType: StorageType.STORAGE_TYPE_LOCALSTORAGE,
      textureProtocol: Protocol.HTTPS,
      curseForgeKey: '',
      vkKey: '',
      storageHost: '',
      storageLogin: '',
      storagePassword: '',
    },
  });

  React.useEffect(() => {
    if (platform && !isLoading) {
      form.reset({
        registrationIsEnabled: platform.registrationIsEnabled || false,
        storageType: platform.storageType || StorageType.STORAGE_TYPE_LOCALSTORAGE,
        curseForgeKey: platform.curseForgeKey || '',
        vkKey: platform.vkKey || '',
        storageHost: platform.storageHost || '',
        storageLogin: platform.storageLogin || '',
        storagePassword: '',
        textureProtocol: platform.textureProtocol,
      });
    }
  }, [platform, isLoading, form]);

  const currentProtocol = extractProtocol(process.env.NEXT_PUBLIC_BACKEND_URL);

  const watchRegistration = form.watch('registrationIsEnabled');
  const watchStorageType = form.watch('storageType');
  const isFormS3Storage = Number(watchStorageType) === StorageType.STORAGE_TYPE_S3;

  const onSubmit: SubmitHandler<EditSettingsPlatformSchemaType> = async (
    body: EditSettingsPlatformSchemaType,
  ) => {
    await mutateAsync(body);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4 w-full lg:w-[58rem]">
          <div className="flex flex-col gap-y-4 gap-x-8">
            <FormField
              control={form.control}
              name="registrationIsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between w-full rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex flex-row items-center gap-x-1 mb-2">
                      <UsersIcon className="mr-2 h-4 w-4" />
                      <h6 className="text-sm font-bold">
                        Registration of new users ({watchRegistration ? 'Allowed' : 'Forbidden'})
                      </h6>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Allows new users to register on the site
                    </p>
                  </div>
                  <FormControl>
                    {isLoading ? (
                      <Skeleton className="w-12 h-6" />
                    ) : (
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-6 w-full rounded-lg border p-4">
              <FormField
                control={form.control}
                name="textureProtocol"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex flex-row items-center gap-x-1 mb-2">
                        <ImagesIcon className="mr-2 h-4 w-4" />
                        <h6 className="text-sm font-bold">HTTP type for the skin service</h6>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Texture Transfer Protocol for Minecraft client
                      </p>
                    </div>
                    {isLoading ? (
                      <Skeleton className="w-32 h-10" />
                    ) : (
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <FormControl className="max-w-32">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a protocol" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {enumValues(Protocol).map(([protocol, value]) => (
                            <SelectItem key={protocol} value={String(value)}>
                              {ProtocolOption[`OPTION_${value}` as keyof typeof ProtocolOption]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormItem>
                )}
              />
              {currentProtocol !== form.watch('textureProtocol') && !isLoading && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Warning!</AlertTitle>
                  <AlertDescription>
                    Texture and backend data transfer protocols <strong>don&apos;t match</strong>.
                    There may be errors when loading textures or their complete lack.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full rounded-lg border p-4">
            <div className="flex flex-col gap-y-1 w-1/2">
              <div className="flex flex-row items-center gap-x-1 mb-2">
                <DatabaseIcon className="mr-2 h-4 w-4" />
                <h6 className="text-sm font-bold">Storage</h6>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Current repository where the launcher is stored
              </p>
            </div>
            <div className="flex flex-col w-1/2">
              <FormField
                control={form.control}
                name="storageType"
                render={({ field }) => (
                  <FormItem>
                    {isLoading ? (
                      <Skeleton className="w-full h-10" />
                    ) : (
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select storage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={String(StorageType.STORAGE_TYPE_LOCALSTORAGE)}>
                            {StorageTypeOption.STORAGE_TYPE_LOCALSTORAGE}
                          </SelectItem>
                          <SelectItem value={String(StorageType.STORAGE_TYPE_S3)}>
                            {StorageTypeOption.STORAGE_TYPE_S3}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isFormS3Storage && (
            <div className="flex flex-col gap-y-4 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                <div className="flex flex-col gap-y-1 min-w-96 mb-2 lg:mb-0">
                  <h6 className="text-sm font-bold">S3 Storage Host</h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Specify the host address of your S3 repository
                  </p>
                </div>
                <div className="flex flex-col gap-y-1 min-w-96 mb-2 lg:mb-0">
                  <FormField
                    control={form.control}
                    name="storageHost"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {isLoading ? (
                            <Skeleton className="w-full h-10" />
                          ) : (
                            <Input type="text" placeholder="Enter the storage host" {...field} />
                          )}
                        </FormControl>
                        {form.formState.errors.storageHost && !isLoading && (
                          <FormMessage>
                            {form.formState.errors.storageHost.message?.toString()}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                <div className="flex flex-col gap-y-1 min-w-96 mb-2 lg:mb-0">
                  <h6 className="text-sm font-bold">Access Key</h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Specify the access key to access your S3 storage
                  </p>
                </div>
                <div className="flex flex-col gap-y-1 min-w-96 mb-2 lg:mb-0">
                  <FormField
                    control={form.control}
                    name="storageLogin"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {isLoading ? (
                            <Skeleton className="w-full h-10" />
                          ) : (
                            <Input
                              type="text"
                              placeholder="Enter the storage Access Key"
                              {...field}
                            />
                          )}
                        </FormControl>
                        {form.formState.errors.storageLogin && !isLoading && (
                          <FormMessage>
                            {form.formState.errors.storageLogin.message?.toString()}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                <div className="flex flex-col gap-y-1 min-w-96 mb-2 lg:mb-0">
                  <h6 className="text-sm font-bold">Secret Key</h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Specify the secret key to access your S3 storage
                  </p>
                </div>
                <div className="flex flex-col gap-y-1 min-w-96 mb-2 lg:mb-0">
                  <FormField
                    control={form.control}
                    name="storagePassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {isLoading ? (
                            <Skeleton className="w-full h-10" />
                          ) : (
                            <Input
                              type="text"
                              placeholder="Enter the storage Secret Key"
                              {...field}
                            />
                          )}
                        </FormControl>
                        {form.formState.errors.storagePassword && !isLoading && (
                          <FormMessage>
                            {form.formState.errors.storagePassword.message?.toString()}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-row items-center justify-between w-full rounded-lg border p-4">
            <div className="flex flex-col gap-y-1 w-1/2">
              <div className="flex flex-row items-center gap-x-1 mb-2">
                <Image src={curseforge} alt="Curseforge" className="w-4 h-4" />
                <h6 className="text-sm font-bold">CurseForge Api Key</h6>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                To automatically download mods from CurseForge.
              </p>
            </div>
            <div className="flex flex-col w-1/2">
              <FormField
                control={form.control}
                name="curseForgeKey"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {isLoading ? (
                        <Skeleton className="w-full h-[88px]" />
                      ) : (
                        <Input type="text" placeholder="Enter API Key" {...field} />
                      )}
                    </FormControl>
                    {!isLoading && (
                      <>
                        <FormMessage />
                        <Button variant="link" asChild className="p-0">
                          <a
                            href="https://console.curseforge.com/?#/api-keys"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Api Key
                          </a>
                        </Button>
                      </>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between w-full rounded-lg border p-4">
            <div className="flex flex-col gap-y-1 w-1/2">
              <div className="flex flex-row items-center gap-x-1 mb-2">
                <Image src={vk} alt="VK" className="w-4 h-4" />
                <h6 className="text-sm font-bold">VK Api Key</h6>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                To automatically download news from VK.
              </p>
            </div>
            <div className="flex flex-col w-1/2">
              <FormField
                control={form.control}
                name="vkKey"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {isLoading ? (
                        <Skeleton className="w-full h-[88px]" />
                      ) : (
                        <Input type="text" placeholder="Enter API Key" {...field} />
                      )}
                    </FormControl>
                    {!isLoading && (
                      <>
                        <FormMessage />
                        <Button variant="link" asChild className="p-0">
                          <a
                            href="https://dev.vk.com/ru/admin/apps-list"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Api Key
                          </a>
                        </Button>
                      </>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            {isLoading ? (
              <Skeleton className="w-24 h-10" />
            ) : (
              <Button disabled={isPending || form.formState.disabled || !form.formState.isDirty}>
                {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
