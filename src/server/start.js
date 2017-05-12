import {server} from 'universal-webpack';

import settings from '../../webpack/universal-webpack-settings.json';
import configuration from '../../webpack/webpack.config';

server(configuration, settings);
