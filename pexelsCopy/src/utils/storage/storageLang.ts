export function getLanguage() {
  const lang: string = <string>localStorage.getItem('pexels/lang');
  return !lang ? 'en' : lang;
}

export function setLanguage(lang: string) {
  localStorage.setItem('pexels/lang', lang);
}
