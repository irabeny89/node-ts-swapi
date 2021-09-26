import { app } from './utils/express';
import config from './config';

const { host, port } = config;
// start the server using config settings
app.listen(port, () => console.log('server up: %s', `${host}:${port}`));
