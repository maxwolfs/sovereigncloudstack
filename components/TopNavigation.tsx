/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource theme-ui */

import { Box, useThemeUI, Text } from 'theme-ui';
import CustomButton from './CustomButton';
import Link from 'next/link';

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
                        cursor: 'pointer',
                        alignSelf: 'flex-start',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowOverlay(!showOverlay);
                    }}
                >
                    <Text sx={{ fontSize: 4 }}>{showOverlay ? '✕' : '☰'}</Text>
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
                    <Link href='/'>
                        <img
                            alt='scs logo'
                            src={logoSrc}
                            sx={{
                                width: '100%',
                                maxWidth: ['150px', '150px', '150px', '246px'],
                                mt: 3,
                            }}
                        />
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default TopNavigation;
