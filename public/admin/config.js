document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    const codeMatch = document.location.search.match(/code=([^&]+)/);
    if (codeMatch) {
        console.log('Authorization code found:', codeMatch[1]);
        // If code is found, redirect to callback endpoint
        document.location.href = `/api/auth/callback?${document.location.search.slice(
            1
        )}`;
    } else {
        const tokenInStorage = localStorage.getItem('netlify-cms-user');
        console.log('Token in localStorage:', tokenInStorage);
        if (!tokenInStorage) {
            const tokenCookie = document.cookie
                .split('; ')
                .find((row) => row.startsWith('access_token='));
            console.log('Token in cookie:', tokenCookie);
            if (tokenCookie) {
                const token = tokenCookie.split('=')[1];
                if (token) {
                    // Store token in localStorage
                    localStorage.setItem(
                        'netlify-cms-user',
                        JSON.stringify({ token })
                    );
                    // Reload to apply the token
                    console.log(
                        'Token stored in localStorage, reloading /admin'
                    );
                    window.location.href = '/admin';
                }
            } else {
                console.log(
                    'No token found in localStorage or cookies, redirecting to /api/auth'
                );
                // Redirect to /api/auth if no token is found
                window.location.href = '/api/auth';
            }
        }
    }
});
