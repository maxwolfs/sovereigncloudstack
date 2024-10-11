/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource theme-ui */

import { Box, Grid, useThemeUI } from 'theme-ui';
import Link from 'next/link';

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
    const { theme } = useThemeUI();

    return (
        <>
            {/* Footer section */}
            <Grid
                columns={[1, 4, 6, 6]}
                gap={[4, 20, 20, 40]}
                sx={{
                    alignContent: 'center',
                    gridColumn: '1 / -1',
                    width: '100%',
                    minHeight: '50vh',
                    mt: [0, 4, 4, 7],
                    py: 3,
                    bg: theme.colors?.primary,
                    px: ['20px', '20px', '20px', '40px'],
                }}
            >
                {/* <Box
                    sx={{
                        gridColumn: ['1 / -1', '1 / 2', '1 / 2', '3 / 4'],
                        display: 'flex',
                        alignItems: 'start',
                    }}
                >
                    <Box sx={{ display: 'grid' }}>
                        <Link
                            sx={{ color: '#fff', textDecoration: 'none' }}
                            href={'#'}
                        >
                            Case Studies
                        </Link>
                    </Box>
                </Box> */}
                <Box
                    sx={{
                        gridColumn: ['1 / -1', '1 / 2', '1 / 2', '4 / 5'],
                    }}
                >
                    <Box sx={{ display: 'grid' }}>
                        <Link
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: [1, 2, 2, 2],
                            }}
                            href='https://docs.scs.community/community'
                        >
                            Community
                        </Link>
                        <Link
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: [1, 2, 2, 2],
                            }}
                            href='https://docs.scs.community/'
                        >
                            Documentation
                        </Link>
                        <Link
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: [1, 2, 2, 2],
                            }}
                            href='https://scs.community/de/news/'
                        >
                            News
                        </Link>
                    </Box>
                </Box>
                <Box
                    sx={{
                        gridColumn: ['1 / -1', ' 3 / 4', '3 / 4', '5 / 6'],
                    }}
                >
                    <Box sx={{ display: 'grid' }}>
                        <Link
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: [1, 2, 2, 2],
                            }}
                            href='https://scs.community/de/jobs/'
                        >
                            Open Positions
                        </Link>
                    </Box>
                </Box>
                <Box
                    sx={{
                        gridColumn: ['1 / -1', ' 3 / 4', '3 / 4', '6 / 6'],
                    }}
                >
                    <Box sx={{ display: 'grid' }}>
                        <Link
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: [1, 2, 2, 2],
                            }}
                            href='https://scs.community/de/imprint/'
                        >
                            Impressum
                        </Link>
                        <Link
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: [1, 2, 2, 2],
                            }}
                            href='https://scs.community/de/dataprotection/'
                        >
                            Datenschutz
                        </Link>
                    </Box>
                </Box>
            </Grid>
        </>
    );
};

export default Footer;