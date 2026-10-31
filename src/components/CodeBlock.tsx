import { useRef, useState, type ComponentPropsWithoutRef } from "react";

// Wraps a markdown code block with a header bar holding a copy button.
export default function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    async function copy() {
        const text = preRef.current?.textContent ?? "";
        try {
            await navigator.clipboard.writeText(text.replace(/\n$/, ""));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked (e.g. insecure context): leave the button as is.
        }
    }

    return (
        <div className="code-block">
            <div className="code-block-bar">
                <button type="button" className="code-copy" onClick={copy} aria-live="polite">
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre ref={preRef} {...props} />
        </div>
    );
}
