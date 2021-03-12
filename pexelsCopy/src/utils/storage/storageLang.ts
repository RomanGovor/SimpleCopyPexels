export function getLanguage() {
    // @ts-ignore
    const lang: string | undefined = localStorage.getItem('pexels/lang');
    return !lang ? 'en' : lang;
}

export function setLanguage(lang: string) {
    localStorage.setItem('pexels/lang', lang);
}
