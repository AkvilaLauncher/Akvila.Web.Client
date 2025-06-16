import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

import { GenerateLauncherDialog } from '@/widgets/generate-launcher-dialog';
import { ChooseAuthenticationMethodDialog } from '@/widgets/choose-authentication-method-dialog';
import { ConnectTexturesDialog } from '@/widgets/connect-textures-dialog';
import { ConnectSentryDialog } from '@/widgets/connect-sentry-dialog';
import { ConnectDiscordDialog } from '@/widgets/connect-discord-dialog';
import { IntegrationCard } from '@/entities/IntegrationCard';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { DASHBOARD_PAGES } from '@/shared/routes';
import {
  DATA_TEST_ID_DIALOG_AUTHENTICATION_METHOD,
  DATA_TEST_ID_DIALOG_CONNECT_DISCORD,
  DATA_TEST_ID_DIALOG_CONNECT_SENTRY,
  DATA_TEST_ID_DIALOG_CONNECT_TEXTURES,
  DATA_TEST_ID_DIALOG_GENERATE_LAUNCHER,
  DATA_TEST_ID_DIALOG_NEWS_PROVIDER,
} from '@/shared/constants/data';
import { Button } from '@/shared/ui/button';
import { HREF_DISCORD } from '@/shared/constants';
import { NewsProviderDialog } from '@/widgets/news-provider-dialog';

export const IntegrationsPage = () => {
  return (
    <>
      <Breadcrumbs
        current={'Integrations'}
        breadcrumbs={[{ value: 'Home', path: DASHBOARD_PAGES.HOME }]}
      />
      <div className="flex flex-col items-start py-4">
        <div className="flex justify-between w-full">
          <h1 className="text-xl font-bold mb-4">Integrations</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <IntegrationCard
              title="Authentication"
              description="Synchronization and management of user data on the platform"
              dialog={<ChooseAuthenticationMethodDialog />}
              testid={DATA_TEST_ID_DIALOG_AUTHENTICATION_METHOD}
            />
            <IntegrationCard
              title="Skin service"
              description="Add integration with the skin service, to display skins and cloaks in-game"
              dialog={<ConnectTexturesDialog />}
              testid={DATA_TEST_ID_DIALOG_CONNECT_TEXTURES}
            />
            <IntegrationCard
              title="Discord"
              description="Synchronization of the Launcher and your Discord server"
              dialog={<ConnectDiscordDialog />}
              testid={DATA_TEST_ID_DIALOG_CONNECT_DISCORD}
            />
            <IntegrationCard
              title="News"
              description="Display news from social networks or your website"
              dialog={<NewsProviderDialog />}
              testid={DATA_TEST_ID_DIALOG_NEWS_PROVIDER}
            />
          </div>
          <div className="flex justify-between w-full">
            <h1 className="text-xl font-bold">Launcher</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <IntegrationCard
              title="Launcher build"
              description="Create a Launcher for Windows, Linux and MacOS platforms in a couple of clicks"
              dialog={<GenerateLauncherDialog />}
              testid={DATA_TEST_ID_DIALOG_GENERATE_LAUNCHER}
            />
          </div>
          <div className="flex justify-between w-full">
            <h1 className="text-xl font-bold">Extra</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <IntegrationCard
              title="Sentry"
              description={'Connecting a platform for bug tracking and application monitoring'}
              dialog={<ConnectSentryDialog />}
              testid={DATA_TEST_ID_DIALOG_CONNECT_SENTRY}
            />
            <IntegrationCard
              title="Need integration?"
              description="Send in an application and we'll work something out"
              dialog={
                <Link target="_blank" href={HREF_DISCORD}>
                  <Button size="sm" variant="outline" className="w-fit">
                    <LinkIcon className="mr-2" size={16} />
                    Support
                  </Button>
                </Link>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
