import React, { useState } from 'react';
import { ArrowDownIcon, DownloadIcon, FileIcon } from '@radix-ui/react-icons';
import { FilesIcon } from 'lucide-react';

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
import { ModEntity } from '@/shared/api/contracts/mods/schemas';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Separator } from '@/shared/ui/separator';
import { useModInfo } from '@/shared/hooks/useMods';
import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { ModsDependencyTooltip } from '@/widgets/mods-dependency-tooltip';
import { useLoadProfileModsByUrl } from '@/shared/hooks';
import { Icons } from '@/shared/ui/icons';
import { formatNumber, timeAgo } from '@/shared/lib/utils';
import { ModType } from '@/shared/enums';

interface ProfileModDialog {
  profile?: ProfileExtendedBaseEntity;
  modDirection?: string;
  modData?: ModEntity;
}

export function AddingModsSelectVersionDialog({
  profile,
  modDirection,
  modData,
}: ProfileModDialog) {
  const [open, setOpen] = useState(false);
  const loadModsMutate = useLoadProfileModsByUrl();

  const { data: modInfo } = useModInfo({
    profileName: profile?.profileName ?? '',
    modId: modData?.id ?? '',
    modType: modData?.type ?? ModType.CURSE_FORGE,
  });

  const loadFilesByUrl = async (files: string[]) => {
    await loadModsMutate
      .mutateAsync({
        profileName: profile?.profileName ?? '',
        links: files,
        isOptional: modDirection === 'optional',
      })
      .then(() => {
        setOpen(false);
      });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-max mt-auto">
        <Button variant="secondary" className="w-max gap-2">
          Download
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="gap-2 flex items-center flex-wrap">
            <Avatar className="w-8 h-8">
              <AvatarImage src={modData?.iconUrl} alt="Icon" />
              <AvatarFallback>
                <FileIcon />
              </AvatarFallback>
            </Avatar>
            {modData?.name}
            <Separator orientation="vertical" />
            <span className="text-muted-foreground">Select a version</span>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="h-[400px] md:h-[650px] overflow-y-auto">
          {modInfo?.versions && modInfo?.versions.length > 0 ? (
            modInfo?.versions.map((mod, index) => (
              <Card key={mod?.id} className="py-4 px-5">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <h3 className="flex items-center font-bold text-sm gap-2">{mod.versionName}</h3>
                    <div className="flex flex-col md:flex-row gap-2 items-start md:items-center mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          className="w-max gap-2"
                          variant="secondary"
                          onClick={() => loadFilesByUrl(mod.files)}
                        >
                          {loadModsMutate.isPending && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          <ArrowDownIcon />
                          Download
                        </Button>

                        <p className="text-muted-foreground">{timeAgo(mod.datePublished)}</p>
                        <Separator className="h-8 hidden md:block" orientation="vertical" />
                      </div>

                      <div className="flex flex-wrap gap-2 items-center mt-2 md:mt-0">
                        <Badge className="gap-1 cursor-pointer text-sm bg-white bg-opacity-10 text-white text-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-black">
                          <DownloadIcon width={16} height={16} />
                          {formatNumber(mod.downloads)}
                          <span>Downloads</span>
                        </Badge>

                        <Badge className="gap-1 cursor-pointer text-sm bg-white bg-opacity-10 text-white text-opacity-90 hover:bg-opacity-100 hover:bg-white hover:text-black">
                          <FilesIcon width={16} height={16} />
                          {formatNumber(mod.files.length)}
                          <span>Files</span>
                        </Badge>
                      </div>

                      {!!mod.dependencies.length && (
                        <div className="mt-2 md:mt-0 md:inline-block">
                          <ModsDependencyTooltip
                            profile={profile}
                            modType={modData?.type ?? ModType.MODRINTH}
                            dependencies={mod.dependencies}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
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
