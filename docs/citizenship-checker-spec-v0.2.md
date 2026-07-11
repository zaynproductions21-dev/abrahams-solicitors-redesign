# British Citizenship Registration Entitlement Checker — Spec v0.2 (POST-COUNCIL, awaiting solicitor sign-off)

**Client:** Abrahams Solicitors (SRA-regulated UK immigration firm, Bradford + London)
**Named solicitor:** Imran Shah, SRA #509359
**Version:** v0.2 (incorporates 10 v0.1-council must-haves — Council report `docs/citizenship-checker-council-report-2026-07-09.html`, verdict APPROVED WITH CHANGES, risk MEDIUM)
**Status:** Awaiting Imran Shah's redline sign-off before code

---

## Council changes baked in (all v0.1 must-haves)

- ✅ 6 → 8 questions (adds s.1(3) automatic-British + s.1(4) 10-yr-residence coverage)
- ✅ Static passage-level HTML route explainers below the wizard
- ✅ Author E-E-A-T block (byline + dated stamp + SRA link + schema)
- ✅ Route titles human-first, statute-second
- ✅ Route-appropriate CTAs (no blanket "book a call")
- ✅ "Not sure" branching capped
- ✅ URL / H1 / title-tag differentiation locked
- ✅ Hardcoded top-of-results disclaimer banner
- ✅ Routing decision matrix appendix (below) — awaiting Imran sign-off before code
- ✅ Quarterly statute review cadence (not annual)

---

## Positioning

**NOT** a gov.uk clone. Positioned as: **"You asked gov.uk 'am I British?' — here's what to do next, especially if the answer is 'you can register'."**

Target long-tail queries where gov.uk is weak or absent:
- "am I British by descent"
- "British citizenship through grandparent"
- "Windrush citizenship registration"
- "s.4B British citizenship"
- "s.4L unfairness discretion"
- "consular birth registration"
- "British Overseas Territories citizen naturalisation"
- "s.1(3) automatic British citizenship"

## URL / H1 / title lockdown

| Field | Value |
|---|---|
| **URL** | `/british-citizenship-registration-checker/` |
| **H1** | British Citizenship Registration Entitlement Checker |
| **Title tag** | `Am I British? Registration Entitlement Checker | Abrahams Solicitors` |
| **Primary keyword** | British citizenship **registration** |
| **NOT targeting** | "naturalisation" (owned by existing `/citizenship-wizard/`) |
| **Cross-links** | Descriptive-anchor block on both wizards linking to the other + hub page `/british-citizenship/` |

## Wizard flow — 8 questions (was 6)

1. **Where were you born?**
   - UK / British Overseas Territory / abroad to a British parent / abroad to non-British parents / not sure
2. **What was your father's status at your birth?**
   - British / non-British / not sure / not applicable
3. **What was your mother's status at your birth?**
   - British / non-British / not sure / not applicable
4. **NEW — What is your parents' current UK immigration status?** *(covers s.1(3) — parent later settled/naturalised while applicant was still under 18)*
   - One or both now have ILR or British citizenship / on a UK visa but not ILR yet / no UK status / not sure / not applicable
5. **NEW — Have you lived in the UK for most of your life since birth?** *(covers s.1(4) — 10-year UK residence rule for those born in UK)*
   - Yes — 10+ years continuous UK residence since birth / partial UK residence / mainly lived abroad / not sure
6. **Are you a citizen of a British Overseas Territory (BOT)?**
   - Yes (which one) / No / Not sure
7. **Your age now?**
   - Under 18 / 18+
8. **Have you ever tried to obtain a British passport?**
   - Never / Applied and refused / Applied and granted

### "Not sure" cap rule (new)

- **≥2 "not sure" answers** → soft explainer route, NOT immediate CTA funnel. Copy: "Nationality routes hinge on details you may not have to hand. Rather than guess, we'll email you a document checklist so you can gather the facts first — no call needed until you're ready."

## Outputs (route mapping — full truth table in appendix)

Route titles are **human-first, statute-second** — the statute goes in parentheses at the end, never in the headline.

| Human-first route title | Statute basis | CTA style |
|---|---|---|
| **You're already British — here's how to get evidence** *(post-1983 UK birth, at least one parent British/settled)* | BNA 1981 s.1(1) | First-passport guide + document checklist — **no call button** |
| **You may automatically be British at birth because your parent settled while you were still a child (legal basis: s.1(3))** | BNA 1981 s.1(3) | Free 30-min call — evidence gathering |
| **You may be entitled to register as British because you've lived in the UK for 10+ years since birth (legal basis: s.1(4))** | BNA 1981 s.1(4) | Free 30-min call — application prep |
| **You may be British by descent — but you'll need consular birth registration** *(abroad-to-British-parent)* | BNA 1981 s.2 + consular process | Consular registration guide + call button |
| **You can register as a British citizen because you're already a British Overseas Territories citizen (legal basis: s.4A)** | BNA 1981 s.4A | Documents guide + call button |
| **You may be able to register as British because you were born here and lived here your whole life (legal basis: s.4B / s.4D)** — stateless minor and BOTC minor routes | BNA 1981 s.4B / s.4D | Free call — safeguarding + application prep |
| **You may qualify to naturalise instead — here's how** *(adult, no British parent, no BOT, no UK birth registration route)* | BNA 1981 s.6(1) | Cross-link to `/citizenship-wizard/` (naturalisation) |
| **This looks complex — a call is the right next step** *(any ≥2 "not sure"; discretionary s.4L / s.3(1) HS routes; contested cases)* | s.3(1), s.4L, or fact-sensitive | Free 30-min call with named solicitor |
| **Windrush-specific route — priority callback, no funnel** *(refused-passport + long UK residence + 1960s-1980s indicators)* | s.4L unfairness discretion / historical anomaly review | **Skips standard CTA funnel** — direct named-solicitor callback within one working hour |

### Windrush-specific triage rule

If Q7 = refused-passport AND Q4/Q5 indicators suggest 1960s-1980s Commonwealth arrival: the wizard routes to a **Windrush-specific outcome page** that:
1. Acknowledges the Windrush injustice explicitly (empathetic tone)
2. Skips the standard "book a 30-min slot" funnel
3. Offers a **priority named-solicitor callback within 1 working hour**
4. Provides links to Windrush Compensation Scheme + JCWI + Windrush Justice Clinic (external, non-competing)
5. Explicitly states **no fee for the initial callback**

## Static route explainers (SEO / GEO layer — NEW)

Below the interactive wizard, render each of the 9 route explanations as a **static, crawlable H2 section** so AI Overviews, ChatGPT, and Perplexity can extract passage-level answers.

Each route section:
- `<h2>` heading = the human-first route title (statute name in parentheses at end)
- 150–250 words of static content
- Numbered "who this applies to" list (crawlable)
- FAQ subsection with FAQPage schema
- HowTo subsection with HowTo schema (for routes that map to a document-prep flow)
- "Next step" CTA at the bottom of each section

Wizard becomes the **interactive layer** OVER indexable content, not a replacement for it.

## Author E-E-A-T block (NEW)

Rendered near the top of the page and again in the footer:

- **Visible byline:** "Reviewed by Imran Shah, Solicitor, SRA #509359 · Last reviewed [DATE]"
- **Person schema** (JSON-LD) with `sameAs` link to Imran's SRA register entry
- **LegalService schema** on the page as a whole
- **Sources / References section** at page bottom, citing:
  - British Nationality Act 1981 (link to legislation.gov.uk)
  - Nationality and Borders Act 2022 (NABA 2022 — s.4L introduction)
  - Home Office nationality policy guidance (link to gov.uk)
- **"How this checker is kept accurate" note:** references quarterly review cadence + council report reference

## Legal disclaimer banner (hardcoded — top of results)

Rendered as a persistent banner above every wizard result page. Exact copy:

> **This checker gives general information only, not legal advice.** No solicitor-client relationship is created until we accept your instructions in writing. Abrahams Solicitors is authorised and regulated by the Solicitors Regulation Authority (SRA #809071). If you rely on the checker's suggestion to make an application decision, please confirm with a qualified solicitor first.

## Scope OUT (deliberate — deferred to v2 or later)

Captured from the Expansionist advisor but not blocking v0.1 ship:
- Email nurture sequence per route (v2)
- Paid tier CTA ladder — £29 letter / £149 review / £499 form-prep / £1,500 full app (v2)
- 8 dedicated pillar pages per route (v2)
- Backlink outreach sprint (v2 — after initial ranking data)

Permanently out of scope:
- Deprived-of-citizenship cases (consultation-only)
- Renouncing / reinstating British nationality (low search volume)
- Adopted-by-non-British-citizen edge cases

## Success metrics (90-day)

- Ranks page 1 for **≥3 registration long-tail queries** in the target list
- Delivers **≥5 warm leads/month** via CTA
- Doesn't cannibalise `/citizenship-wizard/` — GSC 30-day monitoring
- Windrush route delivers ≥1 priority callback (validates the empathetic triage design)

## Design (follows existing wizard pattern)

- One question at a time, progress bar (matches AM calculator wizard)
- Confidence badges: HIGH / MEDIUM / LOW on every actionable route
- Legal citations displayed in the format: "Legal basis: British Nationality Act 1981, s.4A"
- Always couched: "your answers suggest X" — never "you are X"
- Same wizard-widget.tsx pattern as ilr-wizard, skilled-worker-wizard, visa-wizard

## Freshness / review cadence (NEW — quarterly, not annual)

- Config file header field: `LAST_REVIEWED_BY_IMRAN: "YYYY-MM-DD"` and `NEXT_REVIEW_DUE: "YYYY-MM-DD"` (quarterly)
- Nationality statute drifts (NABA 2022 introduced s.4L; forthcoming BOTC amendments in view)
- Quarterly review flag: 2026-10-10, 2027-01-10, 2027-04-10, 2027-07-10

---

## APPENDIX A — Routing Decision Matrix (Q1-Q8 truth table)

**⚠️ THIS SECTION AWAITS IMRAN SHAH'S SIGN-OFF BEFORE ANY CODE IS WRITTEN. ⚠️**

Truth table maps each (Q1, Q3, Q4, Q5, Q6, Q7, Q8) input tuple to a single route. Q2 is diagnostic-only (paired with Q3 for parental-status analysis).

### Route priority (higher wins where multiple would fit)

1. **Windrush triage** — Q8=refused + Q5=10+ years UK + implied 1960s-80s arrival pattern
2. **You're already British** — Q1=UK + Q3=British-at-birth
3. **s.1(3) automatic-British-later** — Q1=UK + Q3=non-British + Q4=parent-now-ILR-or-British
4. **s.1(4) 10-yr UK residence** — Q1=UK + Q3=non-British + Q4=parent-not-ILR + Q5=10+ years
5. **s.4A BOTC → British** — Q6=Yes (any BOT) + Q7=adult
6. **s.4B stateless minor** — Q1=UK + Q3=neither British + Q5=continuous UK + Q7=under-18
7. **s.4D BOTC minor** — Q6=Yes + Q7=under-18
8. **British by descent — consular registration** — Q1=abroad-to-British-parent + Q3=British-at-birth
9. **Naturalise instead** — Q1=abroad-to-non-British + adult + no BOT + no s.1/s.4 route applies
10. **Complex / call needed** — ≥2 "not sure" OR discretionary s.4L/s.3(1) fact pattern

*(Full truth table with all 4×4×4×4×3×2×3 combinations to be attached as a spreadsheet for Imran's sign-off before code.)*

### Deferred to consultation-only in v1 (not routed by wizard)

- **s.3(1) minor at HS discretion** — always outputs "Complex — call needed" in v1
- **s.4L unfairness discretion** — routed via Windrush triage when Windrush indicators present; otherwise "Complex — call needed"

---

## APPENDIX B — Copy tone rules

- **Never lead with statute in a route title.** Statute in parens at end, never at start.
- **Always couched.** "Your answers suggest…" / "You may be able to…" / "It looks like you could…" — never "You are entitled to X."
- **Empathetic on discretionary/Windrush routes.** Acknowledge that nationality is emotional and personal.
- **CTA-appropriate.** Simple routes → guide + optional call. Discretionary → call. Windrush → priority callback.
- **Plain English first.** Any statute name explained on first appearance ("s.4A — a route that lets British Overseas Territories citizens register as British citizens").

---

## APPENDIX C — Deferred to v2 (captured, not blocking)

1. **PDF checklist per route** — email-gated download
2. **Route-tagged 5-email nurture sequence** — for wizard completions that didn't book
3. **Paid tier CTA ladder** — £29 letter / £149 review / £499 form-prep / £1,500 full app
4. **8 dedicated pillar pages** — one per route, indexable, linked from the wizard result screen
5. **Backlink outreach sprint** — Windrush advocacy (JCWI, Runnymede Trust, Windrush Justice Clinic), Commonwealth associations, university international student services

---

## Ready to build when

- [ ] Imran Shah signs off on the routing decision matrix (Appendix A)
- [ ] Imran Shah signs off on the copy tone rules (Appendix B)
- [ ] Imran Shah confirms Windrush triage escalation path (priority callback within 1 working hour)
- [ ] Imran Shah confirms first-reviewed date + first quarterly review-due date

Once signed: 4-6 hr build (was 4hr in v0.1 — +2hr for static route explainer content + schema wiring); ship to preview → solicitor walkthrough → merge → deploy.
