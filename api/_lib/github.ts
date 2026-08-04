const GITHUB_API = "https://api.github.com";
const OWNER = "Cecinordahl";
const REPO = "nordahl-resume";
const BRANCH = "main";

function authHeaders(): Record<string, string> {
    const token = process.env.NOTES_GITHUB_TOKEN;
    if (!token) throw new Error("NOTES_GITHUB_TOKEN is not set");
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };
}

export async function fileExists(path: string): Promise<boolean> {
    const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, {
        headers: authHeaders(),
    });
    if (res.status === 200) return true;
    if (res.status === 404) return false;
    // Anything else (401 bad credentials, 403 missing permission, 5xx, ...) is a
    // real problem, not "the file doesn't exist" — surface it instead of silently
    // proceeding as if the slug were free.
    const body = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${body}`);
}

export async function createFile(path: string, content: string, message: string): Promise<void> {
    const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
        method: "PUT",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
            message,
            content: Buffer.from(content, "utf-8").toString("base64"),
            branch: BRANCH,
        }),
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`GitHub API error ${res.status}: ${body}`);
    }
}
