import React, { useEffect, useState } from 'react';
import TopNavigation from './TopNavigation';
import MenuOverlay from './MenuOverlay';
import Footer from './Footer';
import BackgroundAnimation from './BackgroundAnimation'; // Import der Animation
import { Box } from 'theme-ui';

interface LayoutProps {
    children: React.ReactNode;
    pageContext?: {
        frontmatter?: {
            enableAnimation?: boolean; // Frontmatter-Wert für Animation
        };
    };
}

const Layout: React.FC<LayoutProps> = ({ children, pageContext }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [logoSrc] = useState('/logo/scs-horizontal-black.svg');
    const [isAnimationEnabled, setAnimationEnabled] = useState(
        pageContext?.frontmatter?.enableAnimation ?? true // Default-Wert aus Frontmatter
    );
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
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Hintergrundanimation */}
            {isAnimationEnabled && <BackgroundAnimation />}

            {showOverlay && (
                <MenuOverlay
                    showOverlay={showOverlay}
                    setShowOverlay={setShowOverlay}
                    logoSrc={logoSrc}
                    isAnimationEnabled={isAnimationEnabled}
                    toggleAnimation={() => setAnimationEnabled(!isAnimationEnabled)}
                />
            )}

            {/* Navigation */}
            <TopNavigation
                setShowOverlay={setShowOverlay}
                logoSrc={logoSrc}
                showOverlay={showOverlay}
            />

            {/* Hauptinhalt */}
            <Box
                as='main'
                sx={{
                    flex: '1 0 auto',
                    mt: ['80px', '100px'], // Abhängig von der Höhe der Navigation
                }}
            >
                {children}
            </Box>

            <Footer
                isAnimationEnabled={isAnimationEnabled}
                toggleAnimation={() => setAnimationEnabled(!isAnimationEnabled)}
            />
        </Box>
    );
};

export default Layout;
