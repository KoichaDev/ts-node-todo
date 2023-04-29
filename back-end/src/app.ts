'use strict';
import express from 'express';
import helmet from 'helmet';
import api from './routes/api/api';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import originCredentials from './middleware/originCredentials';

import { ALLOWED_ORIGINS } from './config/cors';

const app = express();

app.use(helmet());
app.use(originCredentials)

app.use(
	cors({
		origin: ALLOWED_ORIGINS,
	})
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(api);
export default app;
