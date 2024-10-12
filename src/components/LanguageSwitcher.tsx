import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { Box, NavLink, Text } from 'theme-ui';

const LanguageSwitcher = () => {
    const { language, changeLanguage } = useI18next();

    return (
        <Box sx={{ alignSelf: 'center' }}>
            <NavLink
                onClick={() => changeLanguage('de')}
                sx={{
                    textDecoration: 'none',
                    color: 'text',
                    cursor: 'pointer',
                }}
            >
                <Text
                    variant={language == 'en' ? 'body' : 'bold'}
                    sx={{ fontSize: [0, 1, 1, 2] }}
                >
                    de
                </Text>
            </NavLink>
            <Text variant='body' sx={{ fontSize: [0, 1, 1, 2] }}>
                {` / `}
            </Text>
            <NavLink
                onClick={() => changeLanguage('en')}
                sx={{
                    textDecoration: 'none',
                    color: 'text',
                    cursor: 'pointer',
                }}
            >
                <Text
                    variant={language == 'de' ? 'body' : 'bold'}
                    sx={{ fontSize: [0, 1, 1, 2] }}
                >
                    en
                </Text>
            </NavLink>
        </Box>
    );
};

export default LanguageSwitcher;
