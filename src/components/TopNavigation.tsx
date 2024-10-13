import React from 'react';
import { Box, useThemeUI, Text } from 'theme-ui';
import CustomButton from './CustomButton';
import { Link } from 'gatsby-link';
import { StaticImage } from 'gatsby-plugin-image';
import LanguageSwitcher from './LanguageSwitcher';
import { navigate } from 'gatsby';

interface TopNavigationProps {
    setShowOverlay: Function;
    showOverlay: boolean;
    logoSrc: string;
}

const TopNavigation: React.FC<TopNavigationProps> = (
    props: TopNavigationProps
) => {
    const { theme } = useThemeUI();
    const { logoSrc, setShowOverlay, showOverlay } = props;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                width: '100%',
                bg: theme.colors?.background,
                // pt: showOverlay ? 0 : 3
                py: 3,
                background: theme.colors?.boxBackground,
                boxShadow: theme.colors?.boxShadow,
            }}
        >
            <Box
                sx={{
                    maxWidth: '1920px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mx: 'auto',
                    pl: 4,
                }}
            >
                <Box
                    sx={{
                        alignSelf: 'flex-start',
                    }}
                >
                    <LanguageSwitcher />

                    <Box
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowOverlay(!showOverlay);
                        }}
                    >
                        <Text sx={{ fontSize: 4 }}>
                            {showOverlay ? '✕' : '☰'}
                        </Text>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CustomButton
                        variant='secondary'
                        label='Zur SCS-Dokumentation →'
                        href='https://docs.scs.community'
                    />
                    <Box
                        sx={{
                            cursor: 'pointer',
                            width: '100%',
                            mt: 3,
                        }}
                    >
                        <img
                            alt='scs logo'
                            src='/logo/scs-horizontal-black.svg'
                            onClick={() => navigate('/')}
                            style={{ width: '100%' }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TopNavigation;
