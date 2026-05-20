# UK ILR (Indefinite Leave to Remain) Wizard v1 — Spec Doc

**Reviewer:** Imran Shah, Director / Principal Solicitor (SRA #509359, admitted 2012)
**Status:** ✅ **APPROVED — 20 May 2026.** Wholesale sign-off on the question wording, route copy, and routing logic below. Paid traffic cleared on the back of LLM Council framework approval (see `ilr-citizenship-wizards-council-transcript-2026-05-20.md`).

Imran confirmed the five most-material items in the spec:

| Item | Confirmed |
|---|---|
| 5-year ILR thresholds + qualifying-route list current (May 2026 — no SoC update since April 2024) | ✅ |
| 10-year long-residence rule (paragraph 276B) wording accurate; 540-day absence ceiling correct | ✅ |
| "Not sure" routing always routes to solicitor consultation, never returns a guess | ✅ |
| Q0 ("switched visa categories in last 5 years") gates Tier 2 ICT misroute scenario | ✅ |
| Quarterly Statement-of-Changes review commitment OK to publish in the page footer | ✅ |

All `[VERIFY]` items in this draft are confirm-during-build items, not blocking redlines.

**Date locked:** 20 May 2026 · **Wizard logic version:** v1.0 · **Target live date:** 30 May 2026 (D10)

**Live URLs (planned):**
- Standalone: `https://www.abrahamssolicitors.co.uk/ilr-wizard/`
- Pattern A embed: `https://www.abrahamssolicitors.co.uk/indefinite-leave-to-remain-ilr/`
- Pattern B entry card: `/immigration/`, hub page on `/visa-wizard/` (chooser)

---

## How to use this document

This spec is the source of truth for the ILR wizard. Question text, route copy, and routing logic in production must match this document. Drift is detected at quarterly Statement-of-Changes review.

`[VERIFY]` markers indicate items that need a live gov.uk cross-check at build time (fees, thresholds, processing times) but do not block shipping. They become git-tracked changes against this file when refreshed.

The wizard is purely advisory — output is "the route most relevant to discuss is X", never a prediction of approval. SRA Standard 8.1 / 8.6 / 8.8 framing already in place via the Council review.

---

## Council mandates already baked in

1. Pure decision tree, no AI, no LLM (deterministic output, no hallucinated cites)
2. No "Strong / Likely / Time-barred" eligibility labels — neutral routing language only
3. Result shown BEFORE email capture (no email-then-result pattern)
4. SalesHub write only on explicit visitor opt-in (GDPR/PECR consent gate)
5. Any "not sure" answer → forced solicitor-consultation route (no guess)
6. Q0 visa-category-switch gate — protects against Tier 2 ICT misroute
7. Imran Shah named on every result + page footer, SRA #509359 + admitted 2012 + SRA verify link
8. "Last reviewed: May 2026" stamp throughout
9. Plain English in question text — statutory cites move to result footnotes only
10. Hover tooltips on every acronym (EUSS, ILR, B1, CEFR, Appendix FM, Paragraph 276B)
11. Confidence-level badge on every actionable result (high / medium / low)
12. Anonymised routing-decision log retained 6 years for SRA evidence trail
13. Variable question count from day 1 (engine refactor pre-req — config-driven)

---

## The 8 questions (verbatim copy)

### Q0. Have you switched between visa categories in the last 5 years?

Helper text: *"E.g. moved from student visa to skilled worker, or from spouse visa to work visa. We ask because continuous-residence rules differ by route."*

| Value | Visible label |
|---|---|
| `no` | No — same visa category throughout |
| `yes` | Yes — switched at least once |
| `not-sure` | I'm not sure |

> **[VERIFY]** Confirm at build that Tier 2 ICT → Skilled Worker switches are treated as a category change for the purpose of this gate (the wizard routes both `yes` and `not-sure` to solicitor consultation regardless).

### Q1. How long have you been in the UK on a visa?

Helper text: *"Count from when you first arrived with leave to enter / leave to remain. Don't include visitor stays before your first long-term visa."*

| Value | Visible label |
|---|---|
| `under-4y` | Less than 4 years |
| `4-5y` | 4–5 years |
| `5-9y` | 5–9 years |
| `10y-plus` | 10 years or more |
| `not-sure` | I'm not sure |

### Q2. What's your current visa category?

Helper text: *"Pick the closest match. If you're on a transitional visa from before April 2024, choose 'other' and we'll work it out on the call."*

| Value | Visible label |
|---|---|
| `partner` | Spouse, civil partner, or unmarried partner of a British/settled person (Appendix FM) |
| `skilled-worker` | Skilled Worker or Health & Care Worker |
| `student` | Student / Graduate route |
| `refugee` | Refugee or Humanitarian Protection |
| `euss-pre-settled` | EUSS Pre-Settled Status |
| `euss-settled` | EUSS Settled Status |
| `other` | Other (Global Talent, Innovator, Ancestry, etc.) |
| `not-sure` | I'm not sure |

> **[VERIFY]** Confirm at build that the "other" list reflects the longest-living routes that lead to ILR. Tier 1 (Investor) was closed but transitional ILR applications still live — covered by "other" → solicitor.

### Q3. Have you taken the Life in the UK Test?

Helper text: *"24-question online multiple-choice test about British history and life. Costs £50 to book at gov.uk."*

| Value | Visible label |
|---|---|
| `passed` | Yes, passed |
| `not-yet` | Not yet — planning to take it |
| `failed` | I took it but didn't pass |
| `exempt` | I'm exempt (over 65, or have a long-term physical/mental condition with medical evidence) |

### Q4. Have you met the English language requirement (B1 or higher)?

Helper text: *"For ILR you need at least CEFR B1 in speaking and listening. Most people evidence this with an IELTS Life Skills B1 certificate or a UK-recognised English-taught degree."*

| Value | Visible label |
|---|---|
| `yes` | Yes — B1 certificate or English-taught degree |
| `no` | Not yet |
| `exempt` | I'm exempt (over 65, or have a long-term physical/mental condition) |
| `not-sure` | I'm not sure what I need |

> **[VERIFY]** Confirm A1 for entry, A2 for extension, B1 for ILR progression is still correct as of May 2026.

### Q5. UK absences — have you spent more than 180 days outside the UK in any rolling 12-month period in the last 5 years?

Helper text: *"This is the standard 5-year ILR test. The 10-year long-residence route uses a different absence rule (we'll ask about that next if relevant)."*

| Value | Visible label |
|---|---|
| `no` | No — under 180 days every year |
| `yes-once` | Yes — once |
| `yes-multiple` | Yes — more than once |
| `not-sure` | I'm not sure / I'd need to add it up |

### Q6. For 10-year long-residence applicants — total UK absences over the full 10 years?

Helper text: *"Only relevant if you've been in the UK 10+ years on visas. The 10-year route allows up to 540 days total absence across the decade, with no single absence over 184 days."*

(Show this question only when Q1 = `10y-plus`. Otherwise skip.)

| Value | Visible label |
|---|---|
| `under-540` | Under 540 days total, no single trip over 184 days |
| `over-540-or-single-trip` | Over 540 days total OR a single trip over 184 days |
| `not-sure` | I'm not sure |

> **[VERIFY]** Confirm rule 276B(i)(a) absence limits still 540 days / 184 days as of May 2026.

### Q7. Do you have any criminal record, immigration breaches, or visa overstays?

Helper text: *"This includes cautions, fixed-penalty notices, and any period of overstaying. We ask because the Suitability rules apply at every ILR stage. We treat this strictly confidentially."*

| Value | Visible label |
|---|---|
| `none` | None |
| `minor` | Minor only (a fixed-penalty notice, a spent caution from years ago) |
| `serious` | Yes — something more substantive |
| `not-sure` | I'm not sure |

---

## The 6 routing outcomes

Each outcome has: route name, statutory citation, summary text, "what to think about next" considerations, a tone (positive/mixed/needs-review), and a confidence-level badge (high/medium/low). Listed in **precedence order** — the first rule that matches wins.

### Routing precedence (the order matters)

```
1. ANY answer is "not sure"                    → Solicitor consultation needed
2. Q0 === "yes" (switched categories)          → Solicitor consultation needed
3. Q2 === "other"                              → Solicitor consultation needed
4. Q7 === "serious"                            → Suitability concerns
5. Q2 === "euss-pre-settled" || "euss-settled" → EUSS Settled Status route
6. Q2 === "refugee"                            → Refugee / Humanitarian Protection ILR
7. Q5 === "yes-multiple" || (Q6 === "over-540-or-single-trip")
                                                → Continuous residence broken — rebuild plan
8. Q1 === "10y-plus" AND Q6 === "under-540"    → 10-year long-residence ILR
9. Q1 === "5-9y" AND Q5 === "no"               → 5-year ILR (happy path)
10. Q1 === "4-5y"                              → Not yet eligible (5-year clock)
11. Q1 === "under-4y"                          → Not yet eligible (track-build plan)
12. (default — anything else)                  → Solicitor consultation needed
```

> **[VERIFY]** At build, confirm that the precedence handles the partner-route 60-month variant cleanly (Q2 = `partner` is implicitly covered by 5-year happy path).

### Outcome 1 — 5-year ILR (happy path)
**Citation:** Immigration Rules — Part 8 / Appendix FM / Skilled Worker / Parent (depending on Q2 answer)
**Confidence:** High
**Summary:** *"Based on your answers, the standard 5-year ILR route looks like the right fit. Most of the eligibility shape — qualifying visa, continuous residence, B1 English, and Life in UK Test — appears to be in place."*
**Considerations:**
- Documentary evidence is decisive — most refusals come from missing or unclear documents, not eligibility itself
- UKVI standard service is roughly 6 months for ILR (priority and super-priority options exist) [VERIFY current at gov.uk]
- A solicitor review before submission is the highest-leverage step — much cheaper than a refusal
- Apply no earlier than 28 days before completing 5 years' qualifying residence

### Outcome 2 — 10-year long-residence ILR
**Citation:** Immigration Rules, paragraph 276B (long residence)
**Confidence:** High
**Summary:** *"With 10+ years of continuous lawful residence and absences within the 540-day total / 184-day single-trip limits, the long-residence route under paragraph 276B is the route most relevant to discuss."*
**Considerations:**
- Lawful residence means no gaps without leave — section 3C leave during pending applications counts
- Public-interest tests apply (some convictions can refuse you regardless of residence)
- Document trail for the full 10 years matters — historical bank statements, council tax, GP records

> **[VERIFY]** Confirm rule 276B(i)(a) absence ceiling is still 540 days total / 184 days per single trip as of May 2026.

### Outcome 3 — Refugee / Humanitarian Protection ILR
**Citation:** Immigration Rules, paragraph 339Q (refugee leave) / paragraph 339R (HP leave)
**Confidence:** Medium — refugee-track ILR has nuanced considerations
**Summary:** *"As someone with refugee status or humanitarian protection, the route to settlement is different from the standard 5-year route. Settlement is typically available after 5 years on refugee / HP leave, with relaxed financial and English requirements in many cases."*
**Considerations:**
- Refugee ILR doesn't require the same financial threshold as Appendix FM routes
- English language and Life in UK Test apply — though hardship exemptions are more often available
- Confirm in the consultation: any travel to your country of origin can affect refugee status

> **[VERIFY]** Confirm refugee ILR is still 5 years post-refugee-leave grant (was historically; check post-2024 Nationality & Borders Act amendments).

### Outcome 4 — EUSS Settled Status
**Citation:** Appendix EU — Immigration Rules
**Confidence:** Medium — EUSS has its own settled-status definition
**Summary:** *"Under the EU Settlement Scheme, 'Settled Status' under Appendix EU is the equivalent of ILR. If you currently hold Pre-Settled Status and have been continuously resident for 5+ years, you can upgrade. If you already hold Settled Status, you have ILR for most purposes."*
**Considerations:**
- The 5-year EUSS continuous residence test is more generous than standard ILR (12 months unbroken before any 6-month gap)
- Family members of EUSS holders have their own route under Appendix EU (Family Permit)
- EUSS Settled Status counts as "settled" for British Citizenship by naturalisation

> **[VERIFY]** Confirm Appendix EU continuous-residence test still allows a single absence of up to 12 months for important reasons (study, work overseas, pregnancy, serious illness) as of May 2026.

### Outcome 5 — Continuous residence broken
**Citation:** Immigration Rules — route-specific continuous residence tests
**Confidence:** Medium — break-handling varies by route
**Summary:** *"Long absences may have reset your continuous-residence clock. The rules differ depending on which route you're on — there may be ways to count time toward ILR despite the absences, but this needs a solicitor's review."*
**Considerations:**
- Skilled Worker: 180 days in any rolling 12 months breaks continuity
- Partner (Appendix FM): no specific cap, but Home Office assesses "intent to live together permanently"
- 10-year long residence: 540 days total ceiling across the decade
- Sometimes the right move is to keep building the clock; sometimes a switch of route is faster — solicitor input matters here

### Outcome 6 — Suitability concerns
**Citation:** Immigration Rules — Suitability provisions (paragraph 322 / S-ILR / S-LTR)
**Confidence:** Low — outcome heavily depends on the specific facts
**Summary:** *"Where there's a criminal record, immigration breach, or overstay history, the Suitability rules apply at every ILR stage. The outcome depends heavily on the specific facts — sentence length, time elapsed, whether the breach was admitted, what the application contained."*
**Considerations:**
- Custodial sentence over 12 months — usually mandatory refusal
- Custodial sentence under 12 months — refusal in most cases for 10 years post-sentence
- Non-custodial / fixed-penalty / spent cautions — usually disclosable but rarely fatal
- Overstays — varies by length and whether you applied for further leave inside the 14-day grace period
- This is the highest-leverage case for solicitor review pre-submission

> **[VERIFY]** Confirm current 12-month sentence threshold and 10-year lookback at paragraph 322(1C) / S-ILR.1.4 — last refreshed against April 2024 SoC.

### Outcome 7 — Not yet eligible (4–5 years)
**Citation:** Immigration Rules — qualifying period
**Confidence:** High
**Summary:** *"You're close — most routes need 5 years of continuous qualifying residence before you can apply for ILR. You can apply up to 28 days before the 5-year date is reached."*
**Considerations:**
- Use the remaining time to build your evidence file (payslips, P60s, council tax, NHS records)
- Take the Life in the UK Test now if you haven't — there's no urgency, but it removes a step
- Confirm your English language evidence is on file (B1 certificate or qualifying degree)

### Outcome 8 — Not yet eligible (under 4 years)
**Citation:** Immigration Rules — qualifying period
**Confidence:** High
**Summary:** *"You're still building toward the 5-year qualifying period. The most useful thing to do now is make sure your current visa is on the right track — switching routes at this stage can reset the clock, so any switch needs careful thought."*
**Considerations:**
- Keep documents organised from day 1 — payslips, tenancy agreements, utility bills
- Watch absences — keep under 180 days in any rolling 12 months
- If you're thinking of switching routes (e.g. student → skilled worker), get advice first — the wrong switch can reset your 5-year clock

### Outcome 9 — Solicitor consultation needed (catch-all)
**Citation:** Multiple — depends on facts
**Confidence:** Low — by design (any "not sure" or category-switch routes here)
**Summary:** *"Your answers suggest a fact pattern where a 6-question tool can't safely guide you. We routinely advise clients in this situation — book a free 30-minute eligibility call with Imran Shah (named solicitor, SRA #509359) and we'll talk you through the right route."*
**Considerations:**
- Category switches, "not sure" answers, and serious Suitability questions all carry too much weight to be routed by a wizard
- A free 30-minute call is non-committal — bring whatever documents you have to hand
- Most callers leave the call knowing exactly what their next step is

---

## Disclaimer copy shown to the visitor

### On every page (top banner)
> *"This wizard is a guide to which ILR route may apply, **not legal advice** and not a prediction of outcome. Home Office decisions turn on the full evidence of your case. Reviewed by Imran Shah — SRA #509359 · admitted 2012 · verify on SRA register. Last reviewed: May 2026."*

### On every result page (footnote)
> *"Indicative only. Not legal advice. Eligibility is confirmed only after full document review. Reviewed by Imran Shah — SRA #509359. Last reviewed: May 2026."*

### On the email-capture step
> *"We'll send you a copy of your result. By submitting you agree we can email you about your visa enquiry. We won't add you to marketing lists, and we won't call unless you specifically ask."*

### Standalone page footer
> *"This page is general guidance, not legal advice. UKVI fees and the Immigration Health Surcharge change periodically — confirm current rates at gov.uk before applying. Past results do not guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm #809071. Last reviewed: May 2026 by Imran Shah (SRA #509359). Reviewed quarterly against Statements of Changes to the Immigration Rules."*

---

## What gets captured into SalesHub (CRM)

When (and only when) the visitor clicks "Email me the result" and enters their name + email:

```
Source field: ilr-wizard-standalone:<route-id>
              OR ilr-wizard-embed:indefinite-leave-to-remain-ilr:<route-id>

Service:      "UK ILR (wizard)"

Message:      ILR Wizard route: <Outcome name>
              Confidence: <high|medium|low>
              Citation: <Statutory cite>
              Q0 → answer
              Q1 → answer
              ... (all 8 Q&As)

Plus:         name, email, phone (optional), gclid, msclkid, traffic_source

CRM tag:      next_trigger_date = +12 months (for Citizenship re-engagement)
              wizard_type = ilr
```

---

## Routing-decision log (SRA evidence trail)

Every wizard run — including those that DON'T capture email — is logged anonymously for 6 years:

```
Row schema:
  timestamp        ISO 8601
  wizard_type      "ilr"
  q0..q7           answer values
  route_id         outcome that fired (e.g. "5-year-ilr-happy-path")
  confidence       high|medium|low
  result_shown     bool
  email_captured   bool  (denormalised flag, no email value stored)
```

Storage: PublishOS KV under key `abrahams:wizard:ilr:log:<yyyy-mm-dd>` (append-only per-day buckets). Retention 6 years from creation, then purged. Imran reviews a sample of 30 logs at each quarterly Statement-of-Changes refresh.

---

## Telemetry (GTM dataLayer events)

Fire on every wizard interaction:

| Event | When | Used for |
|---|---|---|
| `wizard_start` | Wizard widget mounts, with `wizard_type: 'ilr'` | Top-of-funnel count |
| `wizard_question_answered` | Each "Continue" click, with `question_id` | Drop-off analysis per question |
| `wizard_result_shown` | Result screen displayed, with `route_id` + `confidence` | True engagement count |
| `wizard_email_capture_opened` | "Email me the result" clicked | Intent-to-convert signal |
| `ec_form_submit` | Email form submitted | Existing — feeds Google/Bing Ads Enhanced Conversions |
| `wizard_entry_card_clicked` | Pattern B card clicked from `/visa-wizard/` hub or `/immigration/` | Click-through rate per host page |

No PII is sent to GTM until `ec_form_submit`, where only hashed-equivalent fields fire (Google's GTM template handles SHA-256 hashing).

---

## Potential v1.1 improvements (post-launch, not blockers)

These were debated during the Council session and deferred to a v1.1 cycle pending live conversion data:

- Opt-in "Email me a personalised PDF checklist + timeline" at the result step (low effort, high upside)
- CRM `next_trigger_date` field used for automated Citizenship re-engagement at ILR + 12 months
- Split Q7 by sentence length and time elapsed (currently any "serious" routes to solicitor — could be more granular)
- Add a question about dependants — each child requires a separate UKVI fee + IHS, materially changes total cost
- Programmatic SEO landing pages per route combination (deferred — revisit Q3 2026)

---

## Live URL refresh cycle

Quarterly Statement-of-Changes review commitment (publicly stated):
- October 2026 SoC review — Imran
- April 2027 SoC review — Imran
- October 2027 — etc.

Each review = a redline against this spec doc, applied to wizard logic, and the "Last reviewed" date updated. Audit log in git via the commit history of `docs/ilr-wizard-spec-v1.md` and the relevant widget config file.

---

## After this sign-off

1. ✅ Spec doc locked at v1.0-final — this commit
2. ✅ Paid traffic cleared on the wizard — flip Google Ads ILR campaign URL whenever marketing is ready
3. **Engine refactor first (D0–D2):** `VisaWizardWidget` becomes config-driven; ILR JSON config sits in `src/lib/wizards/ilr.ts`
4. **Build (D6–D8):** standalone `/ilr-wizard/` page + Pattern A embed on `/indefinite-leave-to-remain-ilr/`
5. **Launch (D10 = 30 May 2026)**
6. **2-week measurement window** — pull GTM events filtered to `wizard_type = 'ilr'`. Pass criteria: form completion ≥ 2× the current ILR LP baseline, wizard → enquiry conversion ≥ 35%, no QS drop, mobile LCP < 2.5s.
7. **Phase 2 wizard underway:** British Citizenship — see `docs/citizenship-wizard-spec-v1.md`
