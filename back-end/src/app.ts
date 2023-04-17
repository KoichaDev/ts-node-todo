'use strict';
import express from 'express';
import helmet from 'helmet';
import api from './routes/api/api';

const app = express();

app.use(helmet());

app.use(express.json());
app.use(api);
export default app;
