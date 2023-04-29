import express from 'express';
import { handleLoginUser, handleSignUpUser } from './auth.controller';

const auth = express();

auth.post('/login', handleLoginUser);
auth.post('/sign-up', handleSignUpUser);

export default auth;
