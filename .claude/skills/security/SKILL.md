---
name: security
description: Activates Nehemiah, an application security engineer who audits the codebase for selected vulnerability classes, writes a remediation report, and hands off to the product manager to create a developer fix task. Use when the user invokes /security or asks for a security audit.
---

# Security

## Persona

This skill coordinates a security audit. The audit itself is done by **Nehemiah**, the `nehemiah` subagent (`.claude/agents/nehemiah.md`), in its own context — a full-codebase sweep would otherwise flood this conversation. This skill does the two things a subagent can't: ask the user what to audit, and hand the result to `/product`.

---

## Invocation

### Step 1 — Select vulnerability classes

Present the following question to the user using `AskUserQuestion` with `multiSelect: true`:

> "Which vulnerability classes should I audit for?"

Options (present all 24):
- SQL Injection (SQLi)
- Directory Traversal
- Local File Inclusion (LFI)
- Remote File Inclusion (RFI)
- Server-Side Request Forgery (SSRF)
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Open Redirects
- Command Injection
- Insecure HTTP Headers
- Missing Security Headers (CSP, HSTS, X-Frame-Options, etc.)
- CORS Misconfiguration
- Clickjacking
- Sensitive Data Exposure
- Mixed Content (HTTP inside HTTPS)
- SSL/TLS Misconfiguration
- Open Ports / Exposed Services
- Broken Authentication Indicators
- Session Cookie Misconfiguration
- Outdated Libraries / Known CVEs
- Exposed .git / Backup Files
- Information Disclosure (Server Banners, Stack Traces)
- API Endpoint Exposure
- Subdomain Takeover Risks

Wait for the user's selection before proceeding.

---

### Step 2 — Spawn Nehemiah

Spawn the `nehemiah` subagent (Agent tool, `subagent_type: "nehemiah"`) with:
- The exact list of classes the user selected
- Today's date as `YYYY-MM-DD`

Do not audit anything yourself — that's the point of the subagent. Wait for it to return `DONE: <report path>` with the finding counts, then show the user that summary.

If it reports zero findings, stop here: tell the user the selected classes came back clean and skip the handoff.

---

### Step 3 — Hand off to Product

After Nehemiah returns with findings, invoke `/product` and say:

> "Nehemiah has completed a security audit. The report is at `docs/security/nehemiah-report-<YYYY-MM-DD>.md`. Please create a developer task to fix all findings in that report. The task should reference the report as its requirements document. Use Track B (no design work — these are code and config fixes)."

---

## How Product handles the handoff

When `/product` receives this message from Nehemiah, it should:

1. Read the report at the provided path.
2. Create a task file at `.claude/tasks/security-remediation-<YYYY-MM-DD>.md` using the standard task format:

```md
# Task: Security Remediation — <YYYY-MM-DD>

Status: intake

## Problem
The security audit conducted by Nehemiah on <date> identified <N> findings across the following classes: <list>. These represent risks to the application and its users.

## Goal
All findings in `docs/security/nehemiah-report-<YYYY-MM-DD>.md` are resolved and verified.

## Requirements
See `docs/security/nehemiah-report-<YYYY-MM-DD>.md` for the full list of findings and remediation steps. Each finding in that report is a requirement.

## Constraints
- Fixes must not break existing functionality
- Do not introduce new dependencies without justification

## Out of scope
- New features
- Design changes

Track: B
Track reason: security fixes are code and config changes, no new UI surfaces
```

3. Write the task path to `.claude/tasks/.current-task`.
4. Hand off to `/developer` with the task file path and the report path, saying:
   > "This is a fast-track security remediation task (Track B). Fix all findings listed in `docs/security/nehemiah-report-<YYYY-MM-DD>.md`. The task file is at `.claude/tasks/security-remediation-<YYYY-MM-DD>.md`. When done, invoke `/product` to report completion."
