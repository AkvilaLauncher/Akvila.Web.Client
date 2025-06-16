import { Button } from '@/shared/ui/button';
import { useSolveSentryErrors } from '@/shared/hooks';
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

export const SolveAllErrorsButton = () => {
  const { mutateAsync, isPending } = useSolveSentryErrors();
  const SolveAllErrors = async () => {
    await mutateAsync();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-start gap-x-2">
          <Button variant="outline">Mark all errors as solved</Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            All errors will be marked resolved and will be irrevocably deleted from history and
            charts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={SolveAllErrors}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
