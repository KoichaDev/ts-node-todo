import { Secret } from 'jsonwebtoken';

// It's not secret, but use process.env.ACCESS_TOKEN_SECRET and  process.env.REFRESH_TOKEN_SECRET after you have fixed the typing issue
export const ACCESS_TOKEN: Secret = '1be7a1849feaba9f7de2dd5503c7fc4487383646647eba675f1286d87a78cd53a2fca0ed7ab7a49e65f482d5d4e9a6df6c223413f8fa34b99989a918660ff3d8';
export const REFRESH_TOKEN: Secret = '9fe8d67ca0c99bece6af706b6276b8cb839a4d95cdc16400b27d1b3374d7118c1e6fcc957616374bffe550a41774f50d24e6d4a482689d38ffd88d5fb17e034b';
