// types.ts

export interface MetaData {
    description: string;
    og_description: string;
    og_url: string;
    og_site_name: string;
    og_title: string;
    og_type: string;
    og_image: string;
}

export interface Button {
    label: string;
    href: string;
}

export interface News {
    date: string;
    title: string;
    body: string;
    linkUrl: string;
    linkText: string;
}

export interface Section {
    type: 'hero' | 'text' | 'second' | 'third' | 'fourth';
    headline1?: string;
    headline2?: string;
    text1?: {
        title: string;
        button?: Button;
    };
    title?: string;
    text?: string;
    news?: News;
    boxes?: Array<{
        title: string;
        text: string;
        button?: Button;
    }>;
    personas?: Array<{
        title: string;
        text: string;
    }>;
    linkUrl: string;
    linkText?: string;
}

export interface Content {
    title: string;
    meta: MetaData;
    sections: Section[];
}
