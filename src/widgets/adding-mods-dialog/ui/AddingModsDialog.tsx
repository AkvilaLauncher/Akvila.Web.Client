import React, { useCallback, useEffect, useState } from 'react';
import { DownloadIcon, FileIcon, HeartFilledIcon, PlusIcon } from '@radix-ui/react-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { debounce } from 'lodash';

import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { ProfileExtendedBaseEntity } from '@/shared/api/contracts';
import { Badge } from '@/shared/ui/badge';
import { useSearchMods } from '@/shared/hooks/useMods';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Form, FormControl, FormItem } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Icons } from '@/shared/ui/icons';
import { SearchFormSchemaType } from '@/widgets/adding-mods-dialog/lib/static';
import { Card } from '@/shared/ui/card';
import { AddingModsSelectVersionDialog } from '@/widgets/adding-mods-select-version-dialog';
import modrinth from '@/assets/logos/modrinth.png';
import curseforge from '@/assets/logos/curseforge.ico';
import { formatNumber } from '@/shared/lib/utils';
import { ModType } from '@/shared/enums';
import { useSettingsPlatform } from '@/shared/hooks/useSettings';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface ProfileModDialog {
  profile?: ProfileExtendedBaseEntity;
  modDirection: string;
  modType: ModType;
}

export function AddingModsDialog({ profile, modDirection, modType }: ProfileModDialog) {
  const form = useForm<SearchFormSchemaType>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { ref, inView } = useInView();
  const { data: platformSettings, isLoading: isLoadingSettings } = useSettingsPlatform();

  // Check if CurseForge API key exists
  const hasCurseForgeKey = !!platformSettings?.curseForgeKey;
  const isCurseForge = modType === ModType.CURSE_FORGE;
  const isButtonDisabled = isCurseForge && !hasCurseForgeKey;

  // UseCallback to memoize the search function
  const handleSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    [],
  );

  const {
    data: searchMods,
    status,
    error,
    fetchNextPage,
    refetch,
  } = useSearchMods(profile?.profileName ?? '', searchQuery, modType);

  // Effect for automatic search when changing searchQuery
  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery, refetch]);

  // Effect for pagination
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const onSubmit: SubmitHandler<SearchFormSchemaType> = (content: SearchFormSchemaType) => {
    handleSearch(content.name);
  };

  // Add an input change handler for live search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <Drawer>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DrawerTrigger
                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap
                rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
                disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 w-max"
                disabled={isButtonDisabled}
              >
                <Button variant="secondary" className="w-max gap-2" disabled={isButtonDisabled}>
                  {modType === ModType.MODRINTH ? (
                    <Image src={modrinth} alt="Modrinth" className="w-4 h-4" />
                  ) : (
                    <Image src={curseforge} alt="Curseforge" className="w-4 h-4" />
                  )}
                  Install
                  <PlusIcon width={16} height={16} />
                </Button>
              </DrawerTrigger>
            </div>
          </TooltipTrigger>
          {isButtonDisabled && (
            <TooltipContent>
              <p>CurseForge API key is required. Please add it in Settings.</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex flex-col md:flex-row md:flex-wrap gap-2">
            <div className="flex items-center gap-2">
              Mods Installation Wizard
              <Badge className="cursor-pointer text-sm bg-blue-500 text-white hover:bg-opacity-100 hover:bg-blue-500">
                {modDirection}
              </Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="cursor-pointer h-7 text-sm bg-white bg-opacity-10 text-white text-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-black">
                {modType === 1 ? (
                  <>
                    <Image src={modrinth} alt="Modrinth" className="w-4 h-4 mr-2" />
                    Modrinth
                  </>
                ) : (
                  <>
                    <Image src={curseforge} alt="Curseforge" className="w-4 h-4 mr-2" />
                    CurseForge
                  </>
                )}
              </Badge>
              <Badge className="cursor-pointer text-sm bg-white bg-opacity-10 text-white text-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-black">
                Minecraft: {profile?.minecraftVersion}
              </Badge>
              <Badge className="cursor-pointer text-sm bg-white bg-opacity-10 text-white text-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-black">
                Loader: {profile?.launchVersion}
              </Badge>
              <Badge className="cursor-pointer text-sm bg-white bg-opacity-10 text-white text-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-black">
                Filter: Mods
              </Badge>
            </div>
          </DrawerTitle>
          <Form {...form}>
            <form className="flex gap-3 items-end mt-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Start looking for a mod"
                    {...form.register('name')}
                    onChange={(e) => {
                      form.register('name').onChange(e); // For react-hook-form
                      handleInputChange(e); // For live search
                    }}
                  />
                </FormControl>
              </FormItem>

              <Button type="submit" className="w-fit ml-auto" disabled={status === 'pending'}>
                {status === 'pending' && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Search
              </Button>
            </form>
          </Form>
        </DrawerHeader>
        <DrawerFooter className="h-[400px] md:h-[650px] overflow-y-auto">
          {searchMods && !!searchMods.length ? (
            <div className="flex flex-col gap-4">
              {searchMods.map((mod, index) => (
                <Card key={mod?.id} className="py-4 px-5">
                  <div className="flex gap-4 h-full">
                    <Avatar className="w-8 h-8 mt-2">
                      <AvatarImage src={mod?.iconUrl} alt="Icon" />
                      <AvatarFallback>
                        <FileIcon />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col h-full">
                      <h3 className="flex items-center font-bold text-sm gap-2">
                        {mod?.name}
                        <Badge className="gap-1 cursor-pointer text-sm bg-white bg-opacity-10 text-white text-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-black">
                          <DownloadIcon width={16} height={16} />
                          {formatNumber(mod?.downloadCount)}
                        </Badge>
                        <Badge className="gap-1 cursor-pointer text-sm bg-white bg-opacity-10 text-white text-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-black">
                          <HeartFilledIcon className="text-red-500" width={16} height={16} />
                          {formatNumber(mod?.followsCount)}
                        </Badge>
                      </h3>
                      <p className="text-muted-foreground mb-3">{mod?.description}</p>
                      <AddingModsSelectVersionDialog
                        profile={profile}
                        modDirection={modDirection}
                        modData={mod}
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <div ref={ref} className="flex items-center justify-center p-5">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FileIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-lg font-bold">Nothing found</p>
              <p className="text-muted-foreground">
                Try changing the query or check the filtering options.
              </p>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
