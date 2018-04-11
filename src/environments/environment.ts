// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { EnvConfig } from '../app/core/environment.token';

export const environment: EnvConfig = {
  production: false,
  api: {
    url: `http://api.openweathermap.org/data/2.5/`,
    token: 'e41461f4abde3ad00782aba29fc8f8eb',
    unit: 'metric',
  },
};
