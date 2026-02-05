import { createPagesFunctionHandler } from '@remix-run/node';

import * as build from '../build/server';

export const onRequest = createPagesFunctionHandler({ build });
