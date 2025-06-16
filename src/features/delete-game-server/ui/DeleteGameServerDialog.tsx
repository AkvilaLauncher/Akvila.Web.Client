import { Trash2Icon } from 'lucide-react';

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
} from '@/shared/ui/alert-dialog';
import { useDeleteGameServer } from '@/shared/hooks';
import { Button } from '@/shared/ui/button';

type DeleteGameServerDialogParams = {
  serverName: string;
  profileName: string;
};

export const DeleteGameServerDialog = ({
  profileName,
  serverName,
}: DeleteGameServerDialogParams) => {
  const { mutateAsync, isPending } = useDeleteGameServer();

  const onSubmit = async () => {
    await mutateAsync({ profileName, serverName });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" size="icon">
          <Trash2Icon className="h-5 w-5" />
          <span className="sr-only">Delete server</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Server deletion</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure you want to permanently delete server "${serverName}" in profile "${profileName}"?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onSubmit}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
