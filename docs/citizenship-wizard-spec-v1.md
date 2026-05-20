# British Citizenship (Naturalisation) Wizard v1 — Spec Doc

**Reviewer:** Imran Shah, Director / Principal Solicitor (SRA #509359, admitted 2012)
**Status:** ✅ **APPROVED — 20 May 2026.** Wholesale sign-off on the question wording, route copy, and routing logic below. Paid traffic cleared on the back of LLM Council framework approval (see `ilr-citizenship-wizards-council-transcript-2026-05-20.md`).

Imran confirmed the five most-material items in the spec:

| Item | Confirmed |
|---|---|
| s.6(1) (5-year residence) and s.6(2) (spouse of British citizen) wording accurate | ✅ |
| 12-month-post-ILR wait rule under s.6(1) BNA 1981, Schedule 1 | ✅ |
| 90-day / 450-day absence test for residence requirement still current | ✅ |
| "British by birth — wrong page" option removed; link to gov.uk check tool instead | ✅ |
| Good-character test (s.41A BNA) is treated as a separate solicitor-needed branch, not a checkbox | ✅ |

All `[VERIFY]` items in this draft are confirm-during-build items, not blocking redlines.

**Date locked:** 20 May 2026 · **Wizard logic version:** v1.0 · **Target live date:** 15 June 2026 (D26)

**Live URLs (planned):**
- Standalone: `https://www.abrahamssolicitors.co.uk/citizenship-wizard/`
- Pattern A embed: `https://www.abrahamssolicitors.co.uk/british-citizenship/`
- Pattern B entry card: `/immigration/`, hub page on `/visa-wizard/` (chooser), result-card cross-link from `/ilr-wizard/`

---

## How to use this document

This spec is the source of truth for the Citizenship wizard. Question text, route copy, and routing logic in production must match this document. Drift is detected at quarterly Statement-of-Changes review.

`[VERIFY]` markers indicate items that need a live gov.uk cross-check at build time (fees, processing times) but do not block shipping. They become git-tracked changes against this file when refreshed.

The wizard is purely advisory — output is "the route most relevant to discuss is X", never a prediction of approval. SRA Standard 8.1 / 8.6 / 8.8 framing already in place via the Council review.

This wizard is **deliberately shorter than the ILR wizard.** Citizenship is largely a gating check on top of ILR; many of the prerequisites (B1 English, Life in UK Test) are already evidenced at the ILR stage and don't need re-asking.

---

## Council mandates already baked in

1. Pure decision tree, no AI, no LLM (deterministic output, no hallucinated cites)
2. No "Strong / Likely / Time-barred" eligibility labels — neutral routing language only
3. Result shown BEFORE email capture (no email-then-result pattern)
4. SalesHub write only on explicit visitor opt-in (GDPR/PECR consent gate)
5. Any "not sure" answer → forced solicitor-consultation route (no guess)
6. "British by birth" option removed — instead, the top of the wizard links to the gov.uk "check if you can become British" tool for users who land on the wrong page
7. Imran Shah named on every result + page footer, SRA #509359 + admitted 2012 + SRA verify link
8. "Last reviewed: May 2026" stamp throughout
9. Plain English in question text — statutory cites (s.6(1), s.6(2), s.41A) move to result footnotes only
10. Hover tooltips on every acronym (ILR, EUSS, B1, BNA, s.6(1), s.6(2))
11. Confidence-level badge on every actionable result (high / medium / low)
12. Result-card naming uses plain English ("Standard citizenship route" not "s.6(1) Naturalisation")
13. Anonymised routing-decision log retained 6 years for SRA evidence trail

---

## The 4 questions (verbatim copy)

### Q1. Do you currently hold ILR or Settled Status under the EU Settlement Scheme?

Helper text: *"ILR (Indefinite Leave to Remain) or EUSS Settled Status is the standard prerequisite for naturalisation. If you're not sure, that's normal — we'll help you check on the call."*

| Value | Visible label |
|---|---|
| `yes-12-plus` | Yes — I've held ILR or Settled Status for 12 months or more |
| `yes-under-12` | Yes — but for less than 12 months |
| `no-on-visa` | No — I'm currently on a visa (Skilled Worker, Spouse, Student, etc.) |
| `not-sure` | I'm not sure what status I currently have |

> Above this question, the page links to gov.uk's "Check if you can become a British citizen" tool, captioned: *"Born in the UK or to British parents? You may already be British — check on gov.uk."*

### Q2. How long have you continuously lived in the UK?

Helper text: *"Count from the date you arrived with leave to enter or leave to remain. Don't include visitor stays before your first long-term visa."*

| Value | Visible label |
|---|---|
| `under-3y` | Less than 3 years |
| `3-5y` | 3–5 years |
| `5y-plus` | 5 years or more |
| `6y-plus` | 6 years or more |
| `not-sure` | I'm not sure |

### Q3. Is your spouse or civil partner a British citizen?

Helper text: *"There's a shorter naturalisation route for spouses of British citizens — 3 years' residence instead of 5, and no separate 12-month-post-ILR wait."*

| Value | Visible label |
|---|---|
| `yes` | Yes |
| `no` | No |
| `not-married` | I'm not married / not in a civil partnership |

### Q4. UK absences — have you been outside the UK more than 90 days in the last 12 months, OR more than 450 days in the last 5 years?

Helper text: *"This is the standard naturalisation absence test. Going over isn't automatically fatal — caseworkers exercise discretion — but it does need careful framing in the application."*

| Value | Visible label |
|---|---|
| `no` | No — under both limits |
| `yes-once` | Yes — slightly over once |
| `yes-multiple` | Yes — significantly over |
| `not-sure` | I'm not sure / I'd need to add it up |

---

## Why only 4 questions (vs ILR's 8)

The Citizenship wizard deliberately omits questions on Life in the UK Test, English language B1, and good-character details:

- **Life in UK Test / B1 English** — these were evidenced at the ILR stage. Anyone holding ILR for 12+ months has already passed them. Re-asking adds friction and false-confidence risk.
- **Criminal record / good-character** — the s.41A "good character" test is too nuanced for a wizard to route. We handle this at the consultation stage. The wizard says "we'll cover good character on the call" and doesn't ask.
- **Dependants / children registering as British** — child registration (MN1) is a separate application family, deferred to a future wizard.

This is by Council recommendation. If the data shows users want to self-check English/Life-in-UK status, we add an optional Q5/Q6 in v1.1.

---

## The 5 routing outcomes

Each outcome has: route name, statutory citation, summary text, "what to think about next" considerations, a tone (positive/mixed/needs-review), and a confidence-level badge (high/medium/low). Listed in **precedence order** — the first rule that matches wins.

### Routing precedence (the order matters)

```
1. ANY answer is "not sure"                     → Solicitor consultation needed
2. Q1 === "no-on-visa"                          → Get ILR first
3. Q1 === "yes-under-12" AND Q3 !== "yes"       → Wait — 12 months post-ILR (s.6(1))
4. Q4 === "yes-multiple"                        → Absence-based discretion case
5. Q3 === "yes" AND Q2 === "3-5y" || "5y-plus" || "6y-plus"
                                                 → Standard citizenship route (spouse — s.6(2))
6. Q1 === "yes-12-plus" AND Q2 === "5y-plus" || "6y-plus"
                                                 → Standard citizenship route (5-year — s.6(1))
7. Q2 === "under-3y"                            → Not yet eligible (residence)
8. (default — anything else)                    → Solicitor consultation needed
```

> **[VERIFY]** At build, confirm spouse-of-British (s.6(2)) does NOT have a 12-month-post-ILR wait — the wait is only on the 5-year s.6(1) route.

### Outcome 1 — Standard citizenship route (5-year, s.6(1))
**Citation:** British Nationality Act 1981, section 6(1) + Schedule 1
**Confidence:** High
**Summary:** *"With ILR held for 12+ months and 5+ years' continuous residence, the standard naturalisation route under section 6(1) of the British Nationality Act 1981 is the route most relevant to discuss. The Home Office processing time is currently around 6 months."*
**Considerations:**
- Documentary evidence is decisive — most refusals come from the absence test or good-character disclosure, not eligibility itself
- A solicitor review of the SOL form before submission is the highest-leverage step
- A naturalisation ceremony is required after approval (you book this yourself)
- Your country may or may not allow dual nationality — confirm with their consulate before you naturalise

> **[VERIFY]** Confirm £1,580 application fee + £80 ceremony fee + £19.20 biometrics as of May 2026 — check at gov.uk before publishing.

### Outcome 2 — Standard citizenship route (spouse, s.6(2))
**Citation:** British Nationality Act 1981, section 6(2) + Schedule 1
**Confidence:** High
**Summary:** *"As the spouse or civil partner of a British citizen with 3+ years of continuous UK residence, the spouse route under section 6(2) is shorter than the standard route — no 12-month wait after ILR, just the 3-year residence + good character + language requirements."*
**Considerations:**
- You do need to hold ILR (or EUSS Settled Status) at the date of application — but there's no waiting period after you get it
- The 90-day / 450-day absence test still applies
- Good-character test applies the same way as the standard route
- Spouse must be a British citizen at the date of your naturalisation application (and at the ceremony)

### Outcome 3 — Wait 12 months post-ILR (s.6(1))
**Citation:** British Nationality Act 1981, Schedule 1, paragraph 1(2)(b)
**Confidence:** High
**Summary:** *"You've got ILR but it's been less than 12 months. For the standard 5-year route you need to have held ILR for at least 12 months at the date of application. The date is firm — apply too early and the application is refused with fee lost."*
**Considerations:**
- Calculate from the date your ILR was granted (on the BRP, not when you got the card in the post)
- Use the waiting period to take the Life in UK Test if you haven't, get your B1 certificate, and gather absence evidence
- If your spouse is a British citizen, you can apply now under the spouse route (s.6(2)) — see Outcome 2

### Outcome 4 — Absence-based discretion case
**Citation:** British Nationality Act 1981, Schedule 1, paragraph 1(3) — Home Office discretion
**Confidence:** Medium — discretion outcomes are case-specific
**Summary:** *"Your absences exceed the standard limits. The good news is the Home Office can exercise discretion — but the case needs to be made carefully. The wrong framing in the SOL form turns a discretionary refusal into a fee-loss."*
**Considerations:**
- The standard limits — 90 days in last 12 months, 450 days in last 5 years — are guidance, not absolutes
- Discretion is most likely to be exercised when absences were for compelling reasons (work secondment, family emergency, study abroad)
- A solicitor-drafted personal statement explaining the absences is the highest-leverage piece of work
- An absence-based refusal can usually be re-applied for — but waiting until the count is clean is often faster

### Outcome 5 — Get ILR first
**Citation:** British Nationality Act 1981, Schedule 1, paragraph 1(2)(c)
**Confidence:** High
**Summary:** *"To naturalise under the standard or spouse route, you need ILR (or EUSS Settled Status) at the date of application. Your current visa status doesn't yet meet that. The right next step is the ILR application — try our ILR wizard for that, or book a consultation."*
**Considerations:**
- Naturalisation timelines work backwards from when you can apply for ILR
- For most visa routes, ILR comes after 5 years of continuous residence
- Some routes (10-year long residence, refugee/HP) have different ILR clocks — see the ILR wizard
- Cross-link to: `/ilr-wizard/`

### Outcome 6 — Not yet eligible (residence)
**Citation:** British Nationality Act 1981, Schedule 1, paragraph 1(2)(a)
**Confidence:** High
**Summary:** *"You need at least 3 years (spouse route) or 5 years (standard route) of continuous UK residence before you can naturalise. You're not there yet, but you can use this time to plan."*
**Considerations:**
- Keep documents organised from day 1 — payslips, tenancy agreements, utility bills, GP records
- Watch absences — stay under 90 days/year if you can
- Take the Life in UK Test now if you haven't (no urgency, but removes a step later)
- The clock for naturalisation starts from the date you began your continuous residence

### Outcome 7 — Solicitor consultation needed (catch-all)
**Citation:** Multiple — depends on facts
**Confidence:** Low — by design (any "not sure" answers route here)
**Summary:** *"Your answers suggest a fact pattern where a 4-question tool can't safely guide you. We routinely advise clients in this situation — book a free 30-minute eligibility call with Imran Shah (named solicitor, SRA #509359) and we'll talk you through the right route."*
**Considerations:**
- "Not sure" answers and complex absence histories carry too much weight to be routed by a wizard
- A free 30-minute call is non-committal — bring whatever documents you have to hand
- Most callers leave the call knowing exactly what their next step is

---

## Disclaimer copy shown to the visitor

### On every page (top banner)
> *"This wizard is a guide to which naturalisation route may apply, **not legal advice** and not a prediction of outcome. Home Office decisions turn on the full evidence of your case. Reviewed by Imran Shah — SRA #509359 · admitted 2012 · verify on SRA register. Last reviewed: May 2026."*

### On every result page (footnote)
> *"Indicative only. Not legal advice. Eligibility is confirmed only after full document review. Reviewed by Imran Shah — SRA #509359. Last reviewed: May 2026."*

### Above the wizard (entry banner)
> *"Born in the UK or to British parents? You may already be British — [check on gov.uk](https://www.gov.uk/check-british-citizen) before using this tool."*

### On the email-capture step
> *"We'll send you a copy of your result. By submitting you agree we can email you about your citizenship enquiry. We won't add you to marketing lists, and we won't call unless you specifically ask."*

### Standalone page footer
> *"This page is general guidance, not legal advice. UKVI fees and Home Office processing times change periodically — confirm current rates at gov.uk before applying. Past results do not guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm #809071. Last reviewed: May 2026 by Imran Shah (SRA #509359). Reviewed quarterly against Statements of Changes to the Immigration Rules."*

---

## What gets captured into SalesHub (CRM)

When (and only when) the visitor clicks "Email me the result" and enters their name + email:

```
Source field: citizenship-wizard-standalone:<route-id>
              OR citizenship-wizard-embed:british-citizenship:<route-id>

Service:      "British Citizenship (wizard)"

Message:      Citizenship Wizard route: <Outcome name>
              Confidence: <high|medium|low>
              Citation: <Statutory cite>
              Q1 → answer
              Q2 → answer
              Q3 → answer
              Q4 → answer

Plus:         name, email, phone (optional), gclid, msclkid, traffic_source

CRM tag:      wizard_type = citizenship
              source_wizard_chain = "ilr-completed" (if user came from /ilr-wizard/ cross-link)
```

---

## Routing-decision log (SRA evidence trail)

Every wizard run — including those that DON'T capture email — is logged anonymously for 6 years:

```
Row schema:
  timestamp        ISO 8601
  wizard_type      "citizenship"
  q1..q4           answer values
  route_id         outcome that fired (e.g. "standard-citizenship-5yr-s6-1")
  confidence       high|medium|low
  result_shown     bool
  email_captured   bool  (denormalised flag, no email value stored)
  came_from_ilr    bool  (true if referer was /ilr-wizard/ result page)
```

Storage: PublishOS KV under key `abrahams:wizard:citizenship:log:<yyyy-mm-dd>` (append-only per-day buckets). Retention 6 years from creation, then purged. Imran reviews a sample of 30 logs at each quarterly Statement-of-Changes refresh.

---

## Telemetry (GTM dataLayer events)

Fire on every wizard interaction:

| Event | When | Used for |
|---|---|---|
| `wizard_start` | Wizard widget mounts, with `wizard_type: 'citizenship'` | Top-of-funnel count |
| `wizard_question_answered` | Each "Continue" click, with `question_id` | Drop-off analysis per question |
| `wizard_result_shown` | Result screen displayed, with `route_id` + `confidence` | True engagement count |
| `wizard_email_capture_opened` | "Email me the result" clicked | Intent-to-convert signal |
| `ec_form_submit` | Email form submitted | Existing — feeds Google/Bing Ads Enhanced Conversions |
| `wizard_entry_card_clicked` | Pattern B card clicked from `/visa-wizard/` hub or `/immigration/` | Click-through rate per host page |
| `wizard_ilr_to_citizenship_handoff` | User clicks "Plan your citizenship" from `/ilr-wizard/` result | Cross-wizard funnel measurement |

No PII is sent to GTM until `ec_form_submit`.

---

## Potential v1.1 improvements (post-launch, not blockers)

These were debated during the Council session and deferred to a v1.1 cycle pending live conversion data:

- Opt-in "Email me a personalised PDF checklist + timeline" at the result step
- Optional Q5/Q6 asking the user to self-confirm Life in UK Test + B1 status (only if data shows users want this)
- Child Registration (MN1) wizard as a separate sibling — referenced from spouse-route outcome where applicable
- Programmatic SEO landing pages per route combination (deferred — revisit Q3 2026)
- Calendar booking embed at every actionable result

---

## Live URL refresh cycle

Quarterly Statement-of-Changes review commitment (publicly stated):
- October 2026 SoC review — Imran
- April 2027 SoC review — Imran
- October 2027 — etc.

Each review = a redline against this spec doc, applied to wizard logic, and the "Last reviewed" date updated. Audit log in git via the commit history of `docs/citizenship-wizard-spec-v1.md` and the relevant widget config file.

---

## After this sign-off

1. ✅ Spec doc locked at v1.0-final — this commit
2. ✅ Paid traffic cleared on the wizard — flip Google Ads citizenship campaign URL whenever marketing is ready
3. **Engine refactor already done as part of ILR build (D0–D2)** — Citizenship JSON config sits in `src/lib/wizards/citizenship.ts`
4. **Build (D22–D24):** standalone `/citizenship-wizard/` page + Pattern A embed on `/british-citizenship/`
5. **Launch (D26 = 15 June 2026)**
6. **2-week measurement window** — pull GTM events filtered to `wizard_type = 'citizenship'`. Pass criteria: form completion ≥ 2× the current Citizenship LP baseline, wizard → enquiry conversion ≥ 35%, no QS drop, mobile LCP < 2.5s.
7. **Phase 3+ pipeline review (D33 = 22 June 2026):** with both ILR + Citizenship wizards live, revisit Council Advisor C's expansion roadmap — FLR(M), MN1 Child Registration, Dependent visa, Skilled-Worker switch, EUSS late application.
