import { createBrowserHistory } from 'history';
import { config } from '../config';

export const history = createBrowserHistory({
    basename: config.baseName,
});
