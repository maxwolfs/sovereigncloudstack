/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const AdminPage = () => {
    useEffect(() => {
        console.log('Checking authentication status');
        const tokenInStorage = localStorage.getItem('netlify-cms-user');
        console.log('Token in localStorage:', tokenInStorage);
        if (!tokenInStorage) {
            const tokenCookie = document.cookie
                .split('; ')
                .find((row) => row.startsWith('access_token='));
            console.log('Token in cookie:', tokenCookie);
            if (!tokenCookie) {
                console.log('No token found, redirecting to /api/auth');
                // Redirect to /api/auth if no token is found
                window.location.href = '/api/auth';
            }
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Content Manager</title>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
                <meta name='robots' content='noindex' />
            </Head>
            {/* Include the CMS script */}
            <Script
                src='https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
                strategy='beforeInteractive'
            />
            <Script src='/admin/config.js' strategy='afterInteractive' />
        </div>
    );
};

export default AdminPage;
