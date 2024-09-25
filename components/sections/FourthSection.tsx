/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Grid, Text } from 'theme-ui';
import { Section } from '@/types/types';
import Link from 'next/link';

interface FourthSectionProps {
    section: Section;
}

const FourthSection: React.FC<FourthSectionProps> = ({ section }) => {
    const { headline1, headline2, text, personas } = section;
    return (
        <Box
            sx={{
                maxWidth: '1920px',
                m: 'auto',
                background: 'url(/images/bg1.webp)',
                backgroundSize: ['cover', 'cover', 'cover', 'cover'],
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                pt: [5, 5, 5, 6],
                px: ['20px', '20px', '20px', '40px'],
            }}
        >
            <Grid
                columns={[2, 4, 4, 6]}
                gap={[4, 20, 20, 40]}
                sx={{
                    gridTemplateRows: [null, null, null, '300px'],
                }}
            >
                <Box
                    sx={{
                        gridColumn: ['1 / -1', null, '1 / 7'],
                        zIndex: ['-1000', '-1000', '-1000', '-1000'],
                    }}
                >
                    <Text
                        variant='heading'
                        sx={{
                            fontSize: [6, 7, 7, 8],
                        }}
                    >
                        {headline1} <br /> {headline2}
                    </Text>
                </Box>
                <Box
                    sx={{
                        gridColumn: ['2 / 2', '4 / 4', '4 / 4', '6 / 6'],
                    }}
                >
                    <Box
                        mb={[3, 3, 3, 4]}
                        sx={{
                            background: 'background',
                            boxShadow: 'default',
                        }}
                    >
                        <Text variant='body' sx={{ fontSize: [1, 1, 1, 1] }}>
                            {text}
                        </Text>
                        <Box>
                            <Text
                                variant='body'
                                sx={{ fontSize: [1, 1, 1, 1] }}
                            >
                                <Link
                                    href={section.linkUrl}
                                    target='_blank'
                                    sx={{
                                        color: 'primary',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {section.linkText}
                                </Link>
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid
                columns={[2, 4, 4, 6]}
                gap={[4, 20, 20, 40]}
                sx={{
                    gridTemplateRows: [null, null, null, '300px'],
                }}
            >
                <Grid
                    columns={[1, 1, 3, 3]}
                    gap={[4, 20, 20, 40]}
                    sx={{
                        gridColumn: '1 / -1',
                        width: '100%',
                        maxWidth: '1920px',
                        m: 'auto',
                        mb: 7,
                        mt: 6,
                    }}
                >
                    {personas?.map((persona, index) => (
                        <Box
                            key={index}
                            sx={{
                                background: 'background',
                                boxShadow: 'default',
                            }}
                        >
                            <Text
                                variant='bold'
                                sx={{ fontSize: [1, 2, 2, 2] }}
                            >
                                {persona.title}
                                <br />
                            </Text>
                            <Text
                                variant='body'
                                sx={{ fontSize: [1, 2, 2, 2] }}
                            >
                                {persona.text}
                            </Text>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default FourthSection;
