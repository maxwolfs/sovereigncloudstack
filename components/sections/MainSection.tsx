/** @jsxImportSource theme-ui */
import { Box, Text } from 'theme-ui';

interface MainSectionProps {
    headline1: string;
    headline2: string;
    text1: string;
    text2?: string;
    hasCloudBackground?: boolean;
    isBanner?: boolean;
    children?: React.ReactNode;
}

const MainSection: React.FC<MainSectionProps> = (props) => {
    const {
        headline1,
        headline2,
        text1,
        text2,
        hasCloudBackground = false,
        isBanner = false,
        children,
    } = props;

    return (
        <Box
            sx={{
                maxWidth: '1920px',
                m: 'auto',
                background: hasCloudBackground
                    ? 'url(/images/bg3.webp)'
                    : 'none',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                mt: 6,
                px: ['20px', '40px'],
                py: isBanner ? 4 : 0,
            }}
        >
            <Text variant='heading' sx={{ fontSize: [6, 7, 8] }}>
                {headline1} <br /> {headline2}
            </Text>
            <Text variant='body' sx={{ fontSize: [1, 3, 4] }}>
                {text1}
            </Text>
            {text2 && (
                <Text variant='body' sx={{ fontSize: [1, 3, 4] }}>
                    {text2}
                </Text>
            )}
            {children}
        </Box>
    );
};

export default MainSection;
