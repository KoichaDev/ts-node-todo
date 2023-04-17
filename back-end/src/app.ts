'use strict';
import express from 'express';
import helmet from 'helmet';
import api from './routes/api/api';
import cors from 'cors';

import { ALLOWED_ORIGINS } from './config/cors';

const app = express();

app.use(helmet());

app.use(
	cors({
		origin: ALLOWED_ORIGINS,
	})
);

app.use(express.json());
app.use(api);
export default app;
