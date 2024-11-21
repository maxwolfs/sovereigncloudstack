export const formatLocalizedDate = (dateString: string, language: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};
