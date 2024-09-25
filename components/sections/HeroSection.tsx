/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Grid, Text, Link } from 'theme-ui';
import CustomButton from '@/components/CustomButton';
import { Section } from '@/types/types';

interface HeroSectionProps {
    section: Section;
}

const HeroSection: React.FC<HeroSectionProps> = ({ section }) => {
    const { headline1, headline2, text1, news } = section;
    return (
        <Box
            sx={{
                maxWidth: '1920px',
                m: 'auto',
                background: 'url(/images/bg3.webp)',
                backgroundSize: ['cover', 'cover', 'cover', 'cover'],
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                mt: 6,
                px: ['20px', '20px', '20px', '40px'],
            }}
        >
            <Grid
                columns={[2, 4, 4, 6]}
                gap={[4, 20, 20, 40]}
                sx={{
                    gridTemplateRows: ['300px', null, null, '100px'],
                }}
            >
                <Box
                    sx={{
                        gridColumn: ['2 / 2', '4 / 4', '4 / 4', '6 / 6'],
                    }}
                >
                    <Box
                        my={[3, 3, 4, 6]}
                        sx={{
                            background: 'background',
                            boxShadow: 'default',
                        }}
                    >
                        <Text variant='bold' sx={{ fontSize: [0, 1, 1, 1] }}>
                            {news?.date}
                            <br />
                            {news?.title}
                            <br />
                        </Text>
                        <Text variant='body' sx={{ fontSize: [0, 1, 1, 1] }}>
                            {news?.body}
                            <Link
                                href={news?.linkUrl}
                                target='_blank'
                                sx={{
                                    color: 'primary',
                                    textDecoration: 'none',
                                }}
                            >
                                {news?.linkText}
                            </Link>
                        </Text>
                    </Box>
                </Box>
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
                        gridColumn: ['1 / -1', null, '4 / 7'],
                        mt: [0, 4, 4, 5],
                    }}
                >
                    <Text variant='body' sx={{ fontSize: [1, 3, 3, 4] }}>
                        {text1?.title}
                    </Text>
                    {text1?.button && (
                        <Box sx={{ my: [1, 2, 3, 4] }}>
                            <CustomButton variant='primary' label={text1.button.label} href={text1.button.href} />
                        </Box>
                    )}
                </Box>
            </Grid>
        </Box>
    );
};

export default HeroSection;
