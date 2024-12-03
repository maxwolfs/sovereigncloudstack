import React, { useEffect, useState } from 'react';
import TopNavigation from './TopNavigation';
import MenuOverlay from './MenuOverlay';
import Footer from './Footer';
import { Box } from 'theme-ui';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [logoSrc, setLogoSrc] = useState('/logo/scs-horizontal-black.svg');

    useEffect(() => {
        if (showOverlay) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showOverlay]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            {showOverlay && (
                <MenuOverlay
                    showOverlay={showOverlay}
                    setShowOverlay={setShowOverlay}
                    logoSrc={logoSrc}
                />
            )}

            <TopNavigation
                setShowOverlay={setShowOverlay}
                logoSrc={logoSrc}
                showOverlay={showOverlay}
            />
            <Box
                as="main"
                sx={{
                    flex: '1 0 auto',
                    mt: ['80px', '100px'], // Abhängig von der Höhe der Navigation
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;