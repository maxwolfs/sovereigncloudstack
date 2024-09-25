import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';

const clientId = process.env.GITHUB_CLIENT_ID;
const redirectUri = process.env.REDIRECT_URL;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const url = `https://github.com/login/oauth/authorize?${querystring.stringify(
        {
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: 'repo user',
        }
    )}`;
    res.redirect(url);
};

export default handler;
