export type RepoDates = { createdAt: string; pushedAt: string };

const CACHE_TTL_MS = 60 * 60 * 1000;

export function parseGithubRepo(url: string): { owner: string; repo: string } | null {
    try {
        const parsed = new URL(url);
        if (parsed.hostname !== "github.com") return null;
        const [owner, repo] = parsed.pathname.replace(/^\/|\/$/g, "").split("/");
        if (!owner || !repo) return null;
        return { owner, repo: repo.replace(/\.git$/, "") };
    } catch {
        return null;
    }
}

function cacheKey(owner: string, repo: string): string {
    return `gh-repo-dates:${owner}/${repo}`;
}

function readCache(owner: string, repo: string): RepoDates | null {
    try {
        const raw = sessionStorage.getItem(cacheKey(owner, repo));
        if (!raw) return null;
        const parsed = JSON.parse(raw) as RepoDates & { fetchedAt: number };
        if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
        return parsed;
    } catch {
        return null;
    }
}

function writeCache(owner: string, repo: string, dates: RepoDates) {
    try {
        sessionStorage.setItem(cacheKey(owner, repo), JSON.stringify({ ...dates, fetchedAt: Date.now() }));
    } catch {
        // sessionStorage unavailable or full — caching is just an optimization, skip it
    }
}

export async function fetchRepoDates(url: string): Promise<RepoDates | null> {
    const parsed = parseGithubRepo(url);
    if (!parsed) return null;
    const { owner, repo } = parsed;

    const cached = readCache(owner, repo);
    if (cached) return cached;

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!res.ok) return null;

    const data = await res.json();
    const dates: RepoDates = { createdAt: data.created_at, pushedAt: data.pushed_at };
    writeCache(owner, repo, dates);
    return dates;
}

export function formatMonthYear(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
