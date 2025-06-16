'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Ubuntu_Mono } from 'next/font/google';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArrowBigDownDash, ChevronsUpDown, Package2Icon } from 'lucide-react';

import { useConnectionHub } from '../lib/useConnectionHub';

import {
  JavaVersionBaseEntity,
  ProfileExtendedBaseEntity,
  RestoreProfileSchemaType,
} from '@/shared/api/contracts';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Progress } from '@/shared/ui/progress';
import { Textarea } from '@/shared/ui/textarea';
import { Icons } from '@/shared/ui/icons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';
import { Separator } from '@/shared/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { useGetJavaVersions } from '@/shared/hooks';

interface DownloadClientHubProps {
  profile?: ProfileExtendedBaseEntity;
  isLoading?: boolean;
}

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
});

export function DownloadClientHub(props: DownloadClientHubProps) {
  const [javaVersionsOpen, setJavaVersionsOpen] = useState(false);
  const onOpenJavaVersionsChange = () => setJavaVersionsOpen((prev) => !prev);

  const {
    onDownloadDistributive,
    onDownloadJavaDistributive,
    onBuildDistributive,
    isDisable,
    isPacked,
    isConnected,
    percentStage,
    percentAllStages,
    logs,
  } = useConnectionHub(props);

  const javaVersions = useGetJavaVersions();

  const form = useForm<RestoreProfileSchemaType>();

  const onSubmit: SubmitHandler<RestoreProfileSchemaType> = async (
    data: RestoreProfileSchemaType,
  ) => {
    if (!data.javaVersion) {
      onDownloadDistributive();
      return;
    }

    const selectedJavaVersion = JSON.parse(data.javaVersion) as JavaVersionBaseEntity;
    onDownloadJavaDistributive(selectedJavaVersion);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <h5 className="flex items-center gap-x-3 text-xl font-bold">
          Management
          {!isConnected && (
            <sup className="text-xs text-gray-400">Connecting to the console...</sup>
          )}
        </h5>
        <div className="grid grid-rows-3 grid-cols-1 xl:grid-rows-2 xl:grid-cols-2 min-[1920px]:grid-cols-[400px_400px_1fr] min-[1920px]:grid-rows-1 gap-6">
          {/* Step 1 card */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col h-full rounded-lg border bg-card text-card-foreground shadow-sm p-6 gap-3">
                <div className="flex flex-col gap-y-1">
                  <h6 className="text-xl font-bold">Step one</h6>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    The client needs to be downloaded
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="javaVersion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select the Java version</FormLabel>
                      <FormControl>
                        <Popover open={javaVersionsOpen} onOpenChange={onOpenJavaVersionsChange}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full flex justify-between items-center"
                            >
                              <span className="truncate grow mr-2 text-start">
                                {field.value && (JSON.parse(field.value) as JavaVersionBaseEntity)
                                  ? `${(JSON.parse(field.value) as JavaVersionBaseEntity).name}@${(JSON.parse(field.value) as JavaVersionBaseEntity).version}`
                                  : 'Default'}
                              </span>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Command>
                              <CommandInput placeholder="Version search..." />
                              <CommandList>
                                <CommandEmpty>Version not found</CommandEmpty>
                                <CommandGroup>
                                  <CommandItem
                                    onSelect={() => {
                                      form.resetField('javaVersion');
                                      onOpenJavaVersionsChange();
                                    }}
                                  >
                                    <div className="flex items-center gap-x-5">
                                      <div className="flex flex-col gap-y-1">
                                        <span className="font-bold">Default</span>
                                        <span className="text-muted-foreground">
                                          Use default Java version
                                        </span>
                                      </div>
                                    </div>
                                  </CommandItem>
                                  <Separator className="my-2" />
                                  {javaVersions.data &&
                                    javaVersions.data.map((version, i) => (
                                      <CommandItem
                                        value={JSON.stringify(version)}
                                        key={`${version.name}-${version.version}-${i}`}
                                        onSelect={() => {
                                          field.onChange(JSON.stringify(version));
                                          onOpenJavaVersionsChange();
                                        }}
                                      >
                                        <div className="flex items-center gap-x-5">
                                          <span className="font-extrabold text-md">
                                            {version.majorVersion}
                                          </span>
                                          <div className="flex flex-col gap-y-1">
                                            <span className="font-bold">{version.name}</span>
                                            <span className="text-muted-foreground">
                                              {version.version}
                                            </span>
                                          </div>
                                        </div>
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-2 mt-auto">
                  <Button
                    className="w-fit font-semibold"
                    disabled={
                      !isConnected || isDisable || !props.profile || !props.profile.hasUpdate
                    }
                  >
                    {isDisable && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    <ArrowBigDownDash width={16} height={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </form>
          </Form>

          {/* Step 2 card */}
          <div className="flex flex-col rounded-lg text-card-foreground shadow-sm relative ">
            <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm justify-between p-6 gap-3 h-full">
              <div className="flex flex-col gap-y-1">
                <h6 className="text-xl font-bold">Step two</h6>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The profile needs to be compiled
                </p>
              </div>

              <Button
                className="w-fit"
                onClick={onBuildDistributive}
                disabled={!isConnected || isDisable || !props.profile || !props.profile.hasUpdate}
              >
                {isDisable && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                <Package2Icon width={16} height={16} className="mr-2" />
                Compile
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 col-span-1 xl:col-span-2 min-[1920px]:col-span-1">
            <Textarea
              ref={textareaRef}
              value={logs ? logs.join('\n') : ''}
              className={cn('h-80 max-h-80 font-sans', ubuntuMono.variable)}
              readOnly
            />
          </div>
        </div>

        {Boolean(isDisable) && Boolean(isPacked) && (
          <div className="grid gap-y-4">
            <div>
              <div className="flex flex-col">
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between">
                    <span>{percentStage}%</span>
                    <span>Overall progress: {percentAllStages}%</span>
                  </div>
                  <div className="relative">
                    <Progress className="h-2 absolute opacity-70" value={percentStage} />
                    <Progress className="h-2 absolute opacity-50" value={percentAllStages} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
