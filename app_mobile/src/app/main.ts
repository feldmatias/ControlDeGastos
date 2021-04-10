import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as moment from 'moment';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

moment.locale('es');
