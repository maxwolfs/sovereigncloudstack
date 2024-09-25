/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

const AdminPage = () => {

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
