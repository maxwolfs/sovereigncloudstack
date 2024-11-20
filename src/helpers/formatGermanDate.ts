export const formatGermanDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};
