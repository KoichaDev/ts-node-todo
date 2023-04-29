import express from 'express';
import { handleLogin, handleLogout, handleSignUp } from './auth.controller';

const auth = express();

auth.post('/login', handleLogin);
auth.post('/logout', handleLogout);
auth.post('/sign-up', handleSignUp);

export default auth;
