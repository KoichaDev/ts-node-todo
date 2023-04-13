'use strict';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());

app.use(express.json());

app.get('/auth', (req, res) => {});

export default app;
