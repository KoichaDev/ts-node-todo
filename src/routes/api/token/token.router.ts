import express from 'express';
import { handleRefreshToken } from './token.controller';

const token = express.Router();

token.get('/refresh', handleRefreshToken);

export default token;
