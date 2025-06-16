import React from 'react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoIcon, LinkIcon, ImageIcon, TextIcon } from 'lucide-react';

import { DiscordFormSchemaType, integrationSchema } from '../lib/static';

import { useDiscord, useEditDiscord } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/shared/ui/card';
import { Icons } from '@/shared/ui/icons';
import { Input } from '@/shared/ui/input';
import { Separator } from '@/shared/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import discordHint from '@/assets/logos/discord.webp';

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onOpenChange: (open: boolean) => void;
}

export function ConnectDiscordForm({ className, onOpenChange, ...props }: SignInFormProps) {
  const { data } = useDiscord();
  const { mutateAsync, isPending } = useEditDiscord();

  const form = useForm<DiscordFormSchemaType>({
    values: {
      clientId: data?.clientId || '',
      details: data?.details || '',
      largeImageKey: data?.largeImageKey || '',
      largeImageText: data?.largeImageText || '',
      smallImageKey: data?.smallImageKey || '',
      smallImageText: data?.smallImageText || '',
    },
    resolver: zodResolver(integrationSchema),
  });

  const onSubmit: SubmitHandler<DiscordFormSchemaType> = async (data: DiscordFormSchemaType) => {
    await mutateAsync(data).then(() => {
      onOpenChange(false);
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Setting up Discord integration</h2>
        <p className="text-sm text-muted-foreground">
          Connect your Discord server to display user activity in Rich Presence.
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
        <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-sm mt-1 text-blue-600 dark:text-blue-400">
          To set up the integration, you will need to create an application in{' '}
          <a
            href="https://discord.com/developers/applications"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300"
          >
            Discord Developer Portal
          </a>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="setup">
            <LinkIcon className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="preview">
            <ImageIcon className="mr-2 h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6 pt-4">
          <Form {...form}>
            <form className="flex flex-col space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Main settings</CardTitle>
                  <CardDescription>
                    Configure the basic settings to connect to Discord
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client ID</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="Enter the Client ID of your Discord application"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your application ID from the Discord Developer Portal
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Details</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <TextIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="For example: Playing on the server"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Text to be displayed in the user&apos;s status
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Image settings</CardTitle>
                  <CardDescription>
                    Customize the images that will be displayed in Rich Presence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="largeImageKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Large Image Key</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="The key of the big picture"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            The key to the big picture in Rich Presence
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="largeImageText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Large Image Text</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <TextIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="Text when hovering over a large image"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Text that appears when you hover over a large image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="smallImageKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Small Image Key</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="The key of the small image"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Key for the small image in Rich Presence
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="smallImageText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Small Image Text</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <TextIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="Text when hovering over a small image"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Text that appears when you hover over a small image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end pt-2">
                  <Button type="submit" disabled={isPending || !form.formState.isDirty}>
                    {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Save settings
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="preview" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rich Presence preview</CardTitle>
              <CardDescription>This is what your Discord status will look like</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Image //TODO: Replace with actual preview component
                  src={discordHint}
                  alt="discord-hint"
                  className="rounded-md border shadow-sm"
                />
                <div className="mt-6 grid grid-cols-1 gap-2 text-sm">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1 text-center font-bold">1.</div>
                    <div className="col-span-11">
                      Bot name (Assigned when creating a Discord bot)
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1 text-center font-bold">2.</div>
                    <div className="col-span-11">Details field (customizable in the form)</div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1 text-center font-bold">3.</div>
                    <div className="col-span-11">
                      Stage (Controlled automatically by the Launcher)
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1 text-center font-bold">4.</div>
                    <div className="col-span-11">
                      Time (Controlled automatically by the Launcher)
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1 text-center font-bold">5.</div>
                    <div className="col-span-11">
                      largeImageText (Text when hovering over a large image)
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1 text-center font-bold">6.</div>
                    <div className="col-span-11">
                      smallImageText (Text when hovering over a small image)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
