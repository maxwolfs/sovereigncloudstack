import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cookie from 'cookie';

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URL;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.query.code as string;

    try {
        const response = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                redirect_uri: redirectUri,
            },
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        const data = response.data;
        const accessToken = data.access_token;

        if (accessToken) {
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('access_token', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'lax',
                    path: '/',
                })
            );
            res.redirect('/admin');
        } else {
            res.status(400).send('Authentication failed');
        }
    } catch (error) {
        console.error('Error during OAuth callback', error);
        res.status(500).send('Internal Server Error');
    }
};

export default handler;
