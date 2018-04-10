import { EnvConfig } from '../app/core/environment.token';

export const environment: EnvConfig = {
  production: true,
  api: {
    url: `http://api.openweathermap.org/data/2.5/`,
    token: 'e41461f4abde3ad00782aba29fc8f8eb',
    unit: 'metric',
  },
};
