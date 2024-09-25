/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Grid, Text } from 'theme-ui';
import { Section } from '@/types/types';
import CustomButton from '../CustomButton';

interface SecondSectionProps {
    section: Section;
}

const SecondSection: React.FC<SecondSectionProps> = ({ section }) => {
    const { headline1, boxes } = section;
    return (
        <Box
            sx={{
                maxWidth: '1920px',
                m: 'auto',
                background: 'url(/images/bg1.webp)',
                backgroundSize: ['cover', 'cover', 'cover', 'cover'],
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                pt: [7],
                px: ['20px', '20px', '20px', '40px'],
            }}
        >
            <Grid
                columns={[1, null, 3]}
                gap={[4, 20, 20, 40]}
                sx={{
                    gridColumn: '1 / -1',
                    gridTemplateRows: [null, null, null, '100px'],
                    width: '100%',
                    maxWidth: '1920px',
                    m: 'auto',
                }}
            >
                <Box
                    sx={{
                        gridColumn: ['1 / -1', null, '2 / 7'],
                        zIndex: ['-1000', '-1000', '-1000', '-1000'],
                        mb: [0, 4, 4, 7],
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
            </Grid>
            <Grid
                columns={[1, null, 3]}
                gap={[4, 4, 4, '40px']}
                sx={{
                    gridColumn: '1 / -1', // Span across all columns
                    gridTemplateRows: [null, null, null, '300px'],
                    width: '100%', // Full width,
                    maxWidth: '1920px',
                    m: 'auto',
                    pt: [7],
                }}
            >
                {boxes?.map((box, index) => (
                    <Box
                        key={index}
                        sx={{
                            background: 'background',
                            boxShadow: 'default',
                        }}
                    >
                        <Text variant='bold' sx={{ fontSize: [1, 2, 2, 2] }}>
                            {box.title}
                            <br />
                        </Text>
                        <Text variant='body' sx={{ fontSize: [1, 2, 2, 2] }}>
                            {box.text}
                        </Text>
                        {box.button && (
                            <Box sx={{ my: [1, 2, 3, 4] }}>
                                <CustomButton
                                    variant='primary'
                                    label={box.button.label}
                                    href={box.button.href}
                                />
                            </Box>
                        )}
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default SecondSection;
