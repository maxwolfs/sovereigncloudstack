/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Grid, Text } from 'theme-ui';
import { Section } from '@/types/types';

interface ThirdSectionProps {
    section: Section;
}

const ThirdSection: React.FC<ThirdSectionProps> = ({ section }) => {
    const { headline1, text } = section;
    return (
        <Box
            sx={{
                maxWidth: '1920px',
                m: 'auto',
                background: 'url(/images/bg3.webp)',
                backgroundSize: ['cover', 'cover', 'cover', 'cover'],
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                pt: [7],
                px: ['20px', '20px', '20px', '40px'],
            }}
        >
            <Grid
                columns={[1, null, 6]}
                gap={[4, 20, 20, 40]}
                sx={{
                    gridColumn: '1 / -1',
                    width: '100%',
                    maxWidth: '1920px',
                    m: 'auto',
                    gridTemplateRows: '300px',
                }}
            >
                <Box
                    sx={{
                        gridColumn: ['1 / -1', null, '1 / 7'],
                        zIndex: ['-1000', '-1000', '-1000', '-1000'],
                        mt: [5, 4, 4, 7],
                    }}
                >
                    <Text
                        variant='heading'
                        sx={{
                            fontSize: [6, 7, 7, 8],
                        }}
                    >
                        {headline1}
                    </Text>
                </Box>
                <Box
                    sx={{
                        gridColumn: ['1 / -1', null, '5 / 7'],
                        mt: [0, 4, 4, 6],
                        mb: [4, 4, 4, 6],
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            background: 'background',
                            boxShadow: 'default',
                        }}
                    >
                        <Text variant='body' sx={{ fontSize: [0, 1, 1, 2] }}>
                            {text}
                        </Text>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default ThirdSection;
