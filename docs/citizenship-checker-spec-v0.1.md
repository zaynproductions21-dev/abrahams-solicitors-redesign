# British Citizenship Registration Entitlement Checker — Spec v0.1 (DRAFT for council review)

**Client:** Abrahams Solicitors (SRA-regulated UK immigration firm, Bradford + London)
**Named solicitor:** Imran Shah, SRA #509359
**Draft date:** 2026-07-04
**Context:** £150/day Google Ads immigration campaign; existing wizards for naturalisation, ILR, spouse visa, skilled worker, visit-visa refusal
**Trigger:** User request following review of https://www.gov.uk/check-british-citizenship

---

## Problem statement

Users land on `gov.uk/check-british-citizenship`, get a dry yes/no answer about whether they're British by birth or descent, and have **no obvious next step**. This is especially acute when the answer is: "you're NOT British but you may qualify to REGISTER under s.4A / s.4B / s.4D / s.4L / s.3(1) of the British Nationality Act 1981" — gov.uk actively omits registration routes from the checker.

That gap is where our legal service is genuinely differentiated. We do registration applications. Gov.uk doesn't sell that follow-through.

## Positioning

**NOT** a gov.uk clone. Positioned as: **"You asked gov.uk 'am I British?' — here's what to do next."**

Target long-tail queries where gov.uk is weak:
- "am I British by descent"
- "British citizenship through grandparent"
- "Windrush citizenship registration"
- "s.4B British citizenship"
- "s.4L unfairness discretion"
- "consular birth registration"
- "British Overseas Territories citizen naturalisation"

## Wizard flow (6 questions, plain English)

1. **Where were you born?** UK / British Overseas Territory / abroad to a British parent / abroad to non-British parents / not sure
2. **What was your father's status at your birth?** British / non-British / not sure / not applicable
3. **What was your mother's status at your birth?** British / non-British / not sure / not applicable
4. **Are you a citizen of a British Overseas Territory (BOT)?** Yes (specify) / No / Not sure
5. **Your age now?** Under 18 / 18+
6. **Have you ever tried to obtain a British passport?** Never / Applied & refused / Applied & granted

## Outputs (one of)

| Route | Trigger pattern | Action guidance |
|---|---|---|
| **Already British (birth in UK, post-1983 with qualifying parent)** | Q1=UK, at least one parent British/settled | Confirm; how to obtain first passport; solicitor for pre-1983 or contested cases |
| **British by descent — needs consular registration** | Q1=abroad-to-British-parent | Consular birth registration process; solicitor helpful |
| **s.4A registration** (BOTC → British) | Q4=BOTC, adult | Explain routine s.4A route |
| **s.4B registration** (born-in-UK stateless / long-resident child) | Q1=UK, no British parent, under-18 | Explain s.4B route |
| **s.4D** (BOTC minor → British) | Q4=BOTC minor | Explain s.4D route |
| **s.3(1) minor at HS discretion** | Under-18, complex parentage | Discretionary route explanation |
| **s.4L unfairness discretion** (Windrush-adjacent) | Refused-passport-earlier + long UK residence | Historic unfairness route explanation |
| **Not British, no registration route** | Adult, no British parent, no BOT, no UK birth | Cross-link to existing `/citizenship-wizard/` (naturalisation) |
| **Complex or "not sure"** | Any "not sure" answer | Solicitor consultation |

## Design (follows existing wizard pattern)

- Progress bar; one question at a time (matches new AM calculator wizard)
- Confidence badges: HIGH / MEDIUM / LOW on every actionable route
- Every route ends with "Book free 30-min call" CTA
- Legal citations shown (statute + year, e.g. "British Nationality Act 1981, s.4A")
- Always couched: **"your answers suggest X"** — never definitive
- Solicitor approval band (SRA #509359 verification link)
- Same wizard-widget.tsx pattern as ilr-wizard, skilled-worker-wizard, visa-wizard

## Scope OUT (deliberate)

- **Deprived-of-citizenship cases** — rare, complex, high-stakes, consultation-only
- **Renouncing / reinstating British nationality** — niche, low search volume
- **Adoption to non-British-citizen edge cases** — <1% of queries
- **Second-generation-abroad descent restrictions** — flag as "book a call"

## Success metrics (90-day)

- Ranks page 1 for **≥3 registration long-tail queries** in the target list
- Delivers **≥5 warm leads/month** via the "book a call" CTA (comparable to existing citizenship-wizard baseline)
- Doesn't cannibalise `/citizenship-wizard/` traffic (naturalisation) — differentiated primary keyword sets
- Zero misrouting complaints in first 30 days post-launch

## Risk register (pre-council)

1. **Legal accuracy** — nationality statute is one of the most technical areas in UK law; wrong routing could send someone down a dead-end. *Mitigation:* (a) always-couched "our tool suggests X — book a call to confirm" wording, (b) solicitor sign-off before ship, (c) explicit disclaimer at top of results
2. **SEO cannibalisation** — new wizard vs existing `/citizenship-wizard/` could split link equity. *Mitigation:* hard cross-linking, differentiated title tags, distinct primary keyword sets
3. **Content freshness** — nationality routes change (s.4L only came in via NABA 2022). *Mitigation:* annual review flag baked into the config file header
4. **Build cost** — ~4 hrs config + build + ~2 hrs Imran Shah solicitor review

## Recommendation for council

Approve, approve with changes, or reject — please give specific reasoning. If APPROVED WITH CHANGES, list up to 3 concrete edits to the spec above.
