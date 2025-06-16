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
import { Button } from '@/shared/ui/button';
import { useClearNotifications } from '@/shared/hooks';

interface ClearNotificationModelParams {
  description: string;
  className?: string;
}

export const ClearNotificationModel = ({
  description,
  className,
}: ClearNotificationModelParams) => {
  const { mutateAsync, isPending } = useClearNotifications();

  const onSubmit = () => {
    mutateAsync();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className={className}>
          {description}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Warning</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to clear all notifications. This action is irreversible and all your
            notifications will be deleted. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {isPending ? <></> : <>Cancel</>}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
