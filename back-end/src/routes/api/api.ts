import express from 'express';
import auth from './auth/auth.router';

const api = express();

api.use(auth);

export default api;
