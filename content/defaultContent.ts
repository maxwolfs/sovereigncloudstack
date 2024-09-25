// defaultContent.ts
import { Content } from '@/types/types';

export const defaultContent: Content = {
    title: '⚠️ Default Title - Please Update',
    meta: {
        description: '⚠️ Default description - Please update this description.',
        og_description:
            '⚠️ Default OG description - Please update this description.',
        og_url: 'https://defaulturl.com',
        og_site_name: '⚠️ Default Site Name - Please update',
        og_title: '⚠️ Default OG Title - Please update',
        og_type: 'website',
        og_image: '/images/default-share.webp',
    },
    sections: [
        {
            type: 'hero',
            headline1: '⚠️ Default Headline 1 - Please Update',
            headline2: '⚠️ Default Headline 2 - Please Update',
            text1: {
                title: '⚠️ Default Text 1 - Please Update',
                button: { label: 'Learn More', href: '/' },
            },
            linkUrl: ''
        },
        {
            type: 'text',
            title: '⚠️ Default Text Section Title - Please Update',
            text: '⚠️ Default Text Section Content - Please Update',
            linkUrl: ''
        },
        {
            type: 'fourth',
            headline1: '⚠️ Default Title 1 - Please Update',
            headline2: '⚠️ Default Title 2 - Please Update',
            text: '⚠️ Default Text - Please Update',
            linkUrl: '/',
            linkText: '⚠️ Default Link Text - Please Update',
            personas: [
                {
                    title: '⚠️ Default Persona 1 - Please Update',
                    text: '⚠️ Default Text 1 - Please Update',
                },
                {
                    title: '⚠️ Default Persona 2 - Please Update',
                    text: '⚠️ Default Text 2 - Please Update',
                },
                {
                    title: '⚠️ Default Persona 3 - Please Update',
                    text: '⚠️ Default Text 3 - Please Update',
                },
            ],
        },
    ],
};
