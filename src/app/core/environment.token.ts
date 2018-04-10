import { InjectionToken } from '@angular/core';

export interface EnvConfig {
  production: boolean;
  api: {
    url: string,
    token: string,
    unit: string,
  };
}

export const ENVIRONMENT = new InjectionToken<EnvConfig>('environment');
