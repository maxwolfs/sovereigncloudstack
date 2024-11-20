import React from 'react';
import { PageProps } from 'gatsby';
import { Box, Text } from 'theme-ui';

interface PageContext {
  slug: string;
  language: string;
}

const EventPost: React.FC<PageProps<{}, PageContext>> = ({ pageContext }) => {
  const { slug, language } = pageContext;

  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Text as="h1">News Post</Text>
      <Text as="p">Slug: {slug}</Text>
      <Text as="p">Language: {language}</Text>
    </Box>
  );
};

export default EventPost;
