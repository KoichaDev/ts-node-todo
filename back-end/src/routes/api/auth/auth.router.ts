import express from 'express';
import { handleLogin } from './auth.controller';

const auth = express();

auth.post('/auth', handleLogin);

export default auth;
