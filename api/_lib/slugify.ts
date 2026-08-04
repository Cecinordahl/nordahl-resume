const COMBINING_DIACRITICS = /[̀-ͯ]/g;

export function slugify(title: string): string {
    return title
        .toLowerCase()
        .normalize("NFKD")
        .replace(COMBINING_DIACRITICS, "") // strip accents (e.g. "å" -> "a" after NFKD)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);
}
