/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Text } from 'theme-ui';

interface TextSectionProps {
    title: string;
    text: string;
}

const TextSection: React.FC<TextSectionProps> = ({ title, text }) => {
    return (
        <Box
            sx={{
                maxWidth: '1920px',
                m: 'auto',
                px: ['20px', '40px'],
                py: [5, 6],
                background: 'url(/images/bg1.webp)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <Text
                variant='heading'
                sx={{
                    fontSize: [6, 7, 7, 8],
                    mb: 4,
                }}
            >
                {title}
            </Text>
            <Text
                variant='body'
                sx={{
                    fontSize: [2, 3, 3, 4],
                }}
            >
                {text}
            </Text>
        </Box>
    );
};

export default TextSection;
