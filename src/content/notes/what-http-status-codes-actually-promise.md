---
title: "What HTTP status codes actually promise (and how APIs quietly break that promise)"
date: 2026-09-03
tags: ["API Design", "HTTP", "Error Handling"]
---

I ran into a small but instructive mess recently while integrating with a third-party API: a single 403 response whose description string covered two completely different failure causes, one of which needed automatic handling and the other of which needed a human. It turned into a good excuse to think through something I'd been fuzzy on for years — what HTTP status codes are actually *for*, and where the line sits between what belongs in the status line versus what belongs in the response body.

## The mental model that actually holds up

Status codes describe the *transport-layer* outcome of a request. They're a small, stable, coarse-grained enumeration — never meant to carry business-domain nuance. The response body is where the fine-grained, extensible, "why exactly" reasoning belongs. Most confusion I've seen (including my own) comes from trying to make the status code do the body's job, or vice versa.

A rule of thumb I've started applying: if the *why* behind an error can vary independently of the *what*, that why belongs in the body, not squeezed into whichever status code seems closest.

## The codes people mix up, and why

| Code | What it actually means | Where it usually goes wrong |
|---|---|---|
| 400 | The request is malformed before anyone even reads the intent — bad JSON, wrong type, missing field | Used for "syntactically valid but semantically wrong" cases that should be 422 |
| 401 | *I don't know who you are* — no or invalid credentials | Used when credentials are actually fine but permissions aren't (that's 403's job) |
| 403 | *I know exactly who you are, and you still can't do this* | Turned into a junk drawer for several unrelated business reasons stuffed into one string |
| 404 | The resource genuinely doesn't exist at this address | Used lazily as a stand-in for "hidden 403," or inconsistently, which itself leaks information |
| 409 | The request is fine, but reality moved since you last checked | Frequently skipped entirely in favor of a generic 400, losing the "retry with fresh state" signal |
| 422 | Grammatically perfect, logically impossible — valid shape, invalid combination of values | Nearly always missing; teams collapse business-rule violations into 400 and lose a distinct, actionable signal |

The quick tests I now use when designing or reviewing an API:
- **401 vs 403** — would re-authenticating (new token, different credentials) fix this? Yes → 401. No → 403.
- **403 vs 404** — does confirming "this exists but you can't see it" leak something sensitive? Yes → 404. No → 403.
- **400 vs 422** — is the request malformed independent of any business rule? → 400. Does it only fail because of domain logic? → 422.

## Structured error bodies: adopting the shape without the substance

RFC 9457 (Problem Details, successor to RFC 7807) exists precisely to give APIs a machine-readable way to communicate the specific business reason behind a failure — a `type` field meant to be a stable, dereferenceable identifier per failure cause, alongside `title`, `status`, `detail`, and room for extension fields.

The trap I ran into: an API can adopt the *shape* of this standard — the JSON envelope with `type`/`title`/`status`/`detail` — without honoring its *purpose*. If `type` is just the human-readable description slugified into kebab-case, you've gained a parseable envelope but not actually gained the ability to distinguish causes programmatically. Worth checking for this explicitly when consuming (or designing) a "structured" error response — a structured wrapper around ambiguous prose is still ambiguous.

## When the API won't tell you the real reason

Sometimes you're stuck consuming an API you don't control, and the error body genuinely doesn't disambiguate between causes that need very different handling on your end (say, "retry this" vs. "this is an expected, non-error outcome"). A few things that helped:

- **Push the disambiguation upstream of the call, not into the response.** If part of the ambiguity is credential-related (e.g., "is my token even carrying the permissions I think it has?"), that's often something you can verify *before* sending the request rather than trying to infer it *after* getting an ambiguous response back. Decoding a JWT's claims client-side to confirm scope, for instance, turns "the API says X or Y happened" into "I already know X didn't happen, so it must be Y."
- **Don't build generic retry logic around an ambiguous status code.** If a 403-equivalent response can mean either "transient, my credentials are stale" or "permanent, this action is genuinely not allowed," a blind retry either loops forever against something that will never resolve, or masks a real misconfiguration behind apparent success once it eventually works. Retry only the specific sub-case you've confirmed is transient — and confirm it by fixing the actual cause (e.g., forcing a fresh credential fetch) rather than repeating the identical failing call.
- **Correlation IDs are for humans, not for branching logic.** Logging them is worth doing on every ambiguous error, but they're for escalating to the API owner's support channel later — not something your own code can use to decide how to handle the response in the moment.

## The broader takeaway

None of this is exotic — it's mostly just holding status codes to their original, narrow contract and pushing business nuance into the body where it belongs. But it's strikingly easy for an API (including ones I've built myself) to drift into overloading a status code as a shortcut, especially under deadline pressure where "just return 403 for anything auth-adjacent" feels like it saves time. It rarely does — it just moves the cost onto whoever has to consume the API later and reverse-engineer what actually happened.
