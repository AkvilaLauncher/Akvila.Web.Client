import { isAxiosError as isAxiosErrorBase } from 'axios';
import { toast } from 'sonner';

interface isAxiosErrorParams {
  toast: typeof toast;
  error: Error;
  customDescription?: string;
}

export const isAxiosError = ({ toast, error, customDescription }: isAxiosErrorParams) => {
  if (isAxiosErrorBase(error)) {
    toast.error((error.response && error.response.data.message) || 'Error', {
      description: (error.response && error.response.data.errors[0]) || customDescription,
    });
  }
};
