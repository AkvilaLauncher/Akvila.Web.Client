import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TPostSignInRequest, TPostSignUpRequest } from '@/shared/api/contracts';
import { DASHBOARD_PAGES } from '@/shared/routes';
import { authService } from '@/shared/services';
import { isAxiosError } from '@/shared/lib/isAxiosError/isAxiosError';

export const useRegistration = () => {
  const route = useRouter();

  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (data: TPostSignUpRequest) => authService.signUp(data),
    onSuccess: () => {
      toast.success('Successful registration', {
        description: 'Welcome to the platform',
      });

      route.push(DASHBOARD_PAGES.PROFILES);
    },
    onError: (error) => {
      isAxiosError({
        toast,
        error,
        customDescription: 'Authorization service error. Contact the platform administrator',
      });
    },
  });
};

export const useLogin = () => {
  const route = useRouter();

  return useMutation({
    mutationKey: ['signin'],
    mutationFn: (data: TPostSignInRequest) => authService.signIn(data),
    onSuccess: () => {
      toast.success('Successful authorization', {
        description: 'Welcome to the platform',
      });
      route.push(DASHBOARD_PAGES.PROFILES);
    },
    onError: (error) => {
      isAxiosError({
        toast,
        error,
        customDescription: 'Authorization service error. Contact the platform administrator',
      });
    },
  });
};
