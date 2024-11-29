import React from 'react';
import { Box, Text, useThemeUI } from 'theme-ui';

interface ButtonProps {
    href?: string;
    label: string;
    onClick?: (e: any) => void;
    variant: string;
}

const CustomButton: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { href, label, variant } = props;
    const { theme } = useThemeUI();
    return (
        <a
            style={{
                textDecoration: 'none',
                color: theme.colors?.background as string,
            }}
            href={href}
            // target='_blank'
            // rel='noopener noreferrer'
        >
            <Box
                sx={{
                    variant: 'buttons.' + variant,
                }}
            >
                <Text sx={{ fontSize: [0, 1, 2, 2] }}>{label}</Text>
            </Box>
        </a>
    );
};

export default CustomButton;
