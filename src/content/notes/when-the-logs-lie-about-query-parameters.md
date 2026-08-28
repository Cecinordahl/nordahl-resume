---
title: "When the Logs Lie About Query Parameters"
date: 2026-08-28
tags: [Observability, HTTP, Debugging]
---

I recently chased down a small but surprisingly slippery issue: a `GET` request was clearly behaving as if a boolean flag was being sent, but the logs made it look like that flag had disappeared. At first glance it looked like a deployment problem or a code regression. It turned out to be neither.

What changed was the logging path, not the request itself.

## The symptom

The situation looked like this:

- the client code added a query parameter to a `GET` request
- the downstream response behaved exactly as if that parameter was present
- the log field I was checking did **not** show the parameter
- older logs seemed to show the value more explicitly than newer ones

That combination is a great recipe for second-guessing everything: the deployed version, the container image, the runtime path, even whether the right method is being called.

## The key distinction: path, query string, and body

What helped most was separating three things that often get blurred together in logs:

- **request URI/path**: the endpoint path without query parameters
- **query string**: the `?key=value` part of the URL
- **request body**: payload content, which is usually empty for `GET` requests

That matters because many logging setups record only the request path in a field like `request_uri`. If I expect that field to contain `?includeSomething=true`, I may be expecting more than that field was ever designed to hold.

In practice, a request can be perfectly valid and still show up in logs as only the path.

## Why older logs looked different

The real clue was that older logs appeared to show request data under something labeled like “request body,” even for `GET` calls.

That usually points to one of two things:

1. the logger was previously capturing request parameters separately and labeling them loosely, or
2. a custom request wrapper exposed data differently than the current framework-provided wrapper

The important lesson for me was this: **a change in request-wrapping or logging infrastructure can change what appears in logs without changing application behavior at all**.

## Framework wrappers vs custom wrappers

A framework caching wrapper typically gives access to the actual body content that passed through the input stream. That is useful for POST/PUT payloads, but it does not magically include query parameters.

So if a team moves from a custom wrapper to a standard content-caching wrapper, the effect can be:

- `POST` bodies still look fine in logs
- `GET` requests suddenly look “empty”
- query flags that were previously visible no longer show up in the same place

That can feel like data stopped being sent, when really the logging became more literal.

## Why deployment checks still mattered

I still found it useful to rule out deployment drift.

When I saw an image version with a content digest attached, that was a good reminder that:

- version tags are human-friendly labels
- digests identify the exact built image
- the running container can be pinned to a specific immutable artifact even if the tag is reused

That said, once the runtime behavior matched the expected feature behavior, deployment mismatch became less likely than observability mismatch.

## What I'd do next time

What worked best was to stop treating log fields as ground truth and instead compare three sources of evidence:

- what the code constructs
- what the downstream system returns
- what the logging layer actually records

If I need to prove that a specific query flag is being sent, I've found these options more reliable than inferring it from a generic `request_uri` field:

- log the fully built outbound URL at debug level
- log the specific boolean/option being used before the call
- inspect a field that explicitly contains the query string or parameter map
- confirm behavior through the response if the flag changes payload shape in an obvious way

## My practical takeaway

When a `GET` parameter “disappears” from logs but the response still behaves correctly, I now assume **logging representation** before I assume **broken behavior**.

That framing saves a lot of time. The bug may not be in the request code at all. It may just be that:

- the path is logged, but not the query string
- the body logger is empty because it's a `GET`
- a wrapper change altered what the logging layer can see

In other words: sometimes the system is doing the right thing, and only the logs have changed shape.