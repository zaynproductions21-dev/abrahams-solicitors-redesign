# UK Skilled Worker Triage Wizard v1 — Spec Doc

**Reviewer:** Imran Shah, Immigration & Litigation Solicitor (SRA #509359, admitted 2012)
**Date drafted:** 12 May 2026
**Status:** ✅ **APPROVED — 1 June 2026.** Wholesale sign-off on the question wording, outcome copy, and routing precedence below. Build cleared to ship.
**Phase:** 3 (Phase 1 = Spouse Visa live, Phase 2 = Visit Visa Refusal live, Phase 3 = Skilled Worker — this — and Phase 4 = ILR + Citizenship)
**Date locked:** 1 June 2026 · **Wizard logic version:** v1.0 · **Target live date:** 1 June 2026

---

## Why a Skilled Worker triage wizard

You and the team flagged that **most Skilled Worker enquiries arriving by phone and contact form are not instructable legal work** — they're people in one of these situations:

1. Visa expiring within weeks, no sponsor lined up, asking how to "stay legally"
2. Sponsor licence revoked, in the 60-day grace period, looking for a new sponsor
3. Already overstaying, asking what to do
4. **Job-hunting** — no offer yet, no sponsor, asking us to help them find one
5. Has a real offer + confirmed sponsor, ready to instruct on switching/extension
6. Approaching 5 years on Skilled Worker, ready to instruct on ILR

Cases **4** and parts of **1** account for the largest share of these calls. They are **recruitment work, not legal work** — a solicitor cannot introduce a worker to a licensed sponsor. Every minute the team spends explaining this is a minute not spent on instructable cases.

**Goal:** triage in 60 seconds, kindly deflect the recruitment-need callers to gov.uk's sponsor register + LinkedIn, route the genuinely instructable cases (60-day grace, overstayer, switching, extension, ILR) to the right specialist conversation.

The deflection outcome is the *point* of this wizard. The other outcomes are a nice-to-have.

---

## Council mandates baked in (same as Phase 1 & 2)

1. Pure decision tree, no AI, no LLM
2. **No "Strong / Likely / No-case" eligibility labels** — neutral routing only ("the route most relevant to discuss is X")
3. Result shown BEFORE email capture
4. SalesHub write only on explicit visitor opt-in (GDPR/PECR consent gate)
5. Imran named on every result + footer, "Last reviewed" stamp throughout
6. Plain English in question text — statutory cites move to result footnotes only
7. **Deflection outcome must read kindly** — no callous "we can't help you" copy. Frame as "this is recruitment work, here are the right tools" and leave the door open if their situation changes

---

## The 5 questions (proposed verbatim copy)

### Q1. What best describes your situation right now?

Helper: *"Pick the closest match — if more than one applies, pick the most urgent one."*

| Value | Visible label |
|---|---|
| `visa-expiring` | "My Skilled Worker visa expires within 60 days" |
| `visa-expired` | "My visa has already expired" |
| `sponsor-revoked` | "My sponsor's licence has been revoked or my job has ended" |
| `looking-for-sponsor` | "I need to find a UK employer with a sponsor licence" |
| `have-offer` | "I have a job offer from a UK employer and need to switch/apply" |
| `on-other-visa` | "I'm on a different visa (e.g. student, spouse) and want to switch to Skilled Worker" |
| `ilr-approaching` | "I'm approaching 5 years on Skilled Worker (ILR/settlement)" |
| `extension-due` | "My current Skilled Worker visa is up for extension" |
| `other` | "Other / not sure" |

> **[REDLINE]** These nine buckets cover the recurring call types your team described. Reorder, rename, drop, or add as needed. Particularly: is "extension-due" different enough from "ilr-approaching" to warrant its own bucket, or should they merge?

### Q2. How long have you been in the UK on a work visa?

| Value | Visible label |
|---|---|
| `never` | "I'm not in the UK yet / I've never had a UK work visa" |
| `under-1y` | "Less than 1 year" |
| `1-3y` | "1 to 3 years" |
| `3-5y` | "3 to 5 years" |
| `5y-plus` | "5 years or more" |

> **[VERIFY]** The 5-year bucket is sized to the ILR continuous-residence threshold (Appendix Skilled Worker, paragraph SW 24.1 — Indefinite Leave to Remain after 5 years' continuous residence on Skilled Worker / predecessor Tier 2 routes, subject to salary at extension and English language). Confirm that's still the right cite and the 5-year threshold is unchanged.

### Q3. Do you currently have a job offer from a UK employer with a sponsor licence?

Helper: *"You can check whether an employer is licensed on the gov.uk register of licensed sponsors."*

| Value | Visible label |
|---|---|
| `yes-confirmed` | "Yes — and I've confirmed they hold a sponsor licence" |
| `yes-unsure` | "Yes — but I'm not sure if they hold a sponsor licence" |
| `no-looking` | "No — I'm currently job-hunting / looking for a sponsor" |
| `no-not-yet` | "No — I'm not at the job-hunting stage yet" |

> **[REDLINE]** The deflection routing turns on this question + Q1 together. Should the helper text include a direct gov.uk link to the sponsor register, or keep that for the result page only? My instinct is in-question link improves drop-off rate but happy to defer.

### Q4. Have you overstayed your visa (now or in the past)?

Helper: *"This is important — overstaying changes the strategy substantially. Be honest; this wizard is anonymous."*

| Value | Visible label |
|---|---|
| `never` | "No, I've never overstayed" |
| `within-14d` | "Yes — within the last 14 days" |
| `over-14d-but-applied` | "Yes — over 14 days, but I made an in-time application that was refused" |
| `over-14d` | "Yes — over 14 days and no in-time application" |
| `unsure` | "I'm not sure" |

> **[VERIFY]** The 14-day bucket is sized to the exceptional-circumstances grace period under Paragraph 39E of the Immigration Rules. Confirm Para 39E still applies in current form and the 14-day window framing is correct.

### Q5. What's your priority over the next 3-6 months?

| Value | Visible label |
|---|---|
| `stay-find-new-sponsor` | "Stay in the UK and find a new sponsor / job" |
| `switch-skilled-worker` | "Apply for or switch to Skilled Worker on the offer I have" |
| `extend-skilled-worker` | "Extend my existing Skilled Worker visa" |
| `settle-ilr` | "Apply for ILR / settlement" |
| `switch-family-route` | "Switch to a family visa (spouse, partner, dependant)" |
| `leave-return-later` | "Leave the UK now and come back on a fresh Skilled Worker visa later" |
| `unsure` | "I'm not sure / I want a specialist to advise" |

> **[REDLINE]** The "switch-family-route" outcome will hand the visitor over to the Phase 1 Spouse Visa wizard with a link. Confirm that's the right cross-link rather than a separate consultation.

---

## The 7 routing outcomes (proposed)

Listed in **precedence order** — first rule that matches wins. The deflection outcome (O1) is *not* first in precedence — overstayers and sponsor-revoked cases need urgent legal work even if they have no offer yet.

### Routing precedence

```
1. q4 === "over-14d"                           → O3 Overstayer specialist consultation (urgent)
2. q1 === "sponsor-revoked"
   OR (q1 === "visa-expiring" AND q3 in [no-looking, no-not-yet])
                                                 → O2 60-day grace period — urgent legal review
3. q1 === "visa-expired"                       → O3 Overstayer specialist consultation
4. q1 === "looking-for-sponsor"
   OR (q3 === "no-looking" AND q5 === "stay-find-new-sponsor")
                                                 → O1 Job search, not legal work (kind deflection)
5. q5 === "switch-family-route"                → O6 Cross-link to Spouse Visa wizard
6. q1 === "ilr-approaching" AND q2 === "5y-plus"
   OR q5 === "settle-ilr"                       → O5 ILR application — settlement work
7. q3 in [yes-confirmed, yes-unsure]
   AND q1 in [have-offer, on-other-visa, extension-due]
                                                 → O4 Switching / extension — instructable
8. (default)                                   → O7 Specialist consultation
```

> **[REDLINE]** Is this precedence right? The sharp edge is rule 4: someone whose visa expires in 60 days **and** who has no offer **and** isn't looking is technically in the 60-day grace period (rule 2) but functionally needs to be told "find an employer first." I have them in rule 2 (urgent legal review) — should they instead go to rule 4 (deflection) if Q3 says they're not even looking? Your call as the SRA-regulated solicitor.

### Outcome 1 — Job search, not legal work (kind deflection)
**Citation:** Appendix Skilled Worker — sponsor licence requirement (only A-rated licensed sponsors can issue a Certificate of Sponsorship)
**Tone:** helpful, no-call, friendly
**Summary:** *"To apply for a Skilled Worker visa you need a job offer from a UK employer who already holds a Skilled Worker sponsor licence. Solicitors can't introduce you to sponsors — that's recruitment, not legal work — but the route is straightforward once you have an offer. We can help with the visa application itself when the job offer is on the table."*
**What to do next (the actually useful part of this outcome):**
- The official register of licensed sponsors is at gov.uk — search by sector/region to find employers who can sponsor: https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers
- On LinkedIn, filter job searches by "visa sponsorship available" and look at company pages — sponsor-licensed employers usually say so in their About section
- Specialist recruiters in your sector (tech, healthcare, finance, engineering) often have direct relationships with sponsor-licensed employers — search "[your sector] sponsorship recruiter UK"
- Once you have a real offer, come back to us — switching/applying with a confirmed sponsor is a 2-3 week instructable case

**No automatic follow-up call.** The visitor can still ask for the result by email or book a 30-minute consultation if they want — but the default is "this is recruitment work, you don't need a solicitor yet."

> **[REDLINE]** This is the most important outcome in the wizard — it's the one that saves your team time. Critical question: is the tone right? It needs to land as helpful, not dismissive. Mark it up as needed — I want this to read like a senior immigration solicitor doing someone a favour, not a chatbot.

### Outcome 2 — 60-day grace period — urgent legal review
**Citation:** Appendix Skilled Worker — paragraph SW 9.7 / SW 11.1 (60-day grace period after Certificate of Sponsorship withdrawn / sponsor licence revoked) + Paragraph 39E of the Immigration Rules where applicable
**Tone:** urgent legal work
**Summary:** *"When a Skilled Worker's sponsor licence is revoked or their job ends, the Home Office allows 60 days from the date of cessation to either find a new licensed sponsor and apply to vary the visa, or leave the UK or switch to a different immigration category. The clock starts on the date the sponsor stops sponsoring — not the date you're notified. This is one of the most time-sensitive things we do."*
**Considerations:**
- Get the CoS cancellation date from your employer — that's day 0
- A new sponsor must be lined up and the variation application made before day 60, or the visa lapses
- Switching to a family route (spouse, partner) is possible within the 60 days if you qualify
- If 60 days has passed, see overstayer route — Para 39E may still apply if there are exceptional circumstances

> **[VERIFY]** Confirm: 60-day grace period under Appendix Skilled Worker is still 60 days (not 30 — it was historically 60 for Tier 2 General, and I believe still 60 under Skilled Worker, but the rules update frequently). Cite is SW 9.7 / SW 11.1 — confirm or correct.

### Outcome 3 — Overstayer specialist consultation
**Citation:** Paragraph 39E of the Immigration Rules (exceptional circumstances) + Appendix V 3.7 (re-entry bans for overstayers)
**Tone:** urgent, serious — but not panic-inducing
**Summary:** *"Overstaying creates serious complications: an in-country switch becomes much harder, and depending on circumstances a re-entry ban of up to 10 years can apply if removed. Paragraph 39E of the Immigration Rules allows the Home Office to disregard short overstays (typically up to 14 days) where there's a good reason — but it's a narrow window. Anyone overstaying needs solicitor advice on whether an in-country application is still possible, or whether leaving voluntarily is the cleaner route."*
**Considerations:**
- The 14-day Para 39E window has limited grounds (e.g. application refused with no in-time appeal, exceptional circumstances)
- A "voluntary return" before any enforcement action substantially reduces re-entry ban risk
- Some routes (Article 8 family life, Long Residence) survive overstaying — most don't
- Do not make further applications without solicitor review — a refused in-country application as an overstayer can trigger removal

> **[REDLINE]** Should this outcome distinguish between "within 14 days overstay" (Para 39E might apply) and "long-term overstay" (different conversation entirely)? Currently it covers both. Or should they be separate outcomes?

### Outcome 4 — Switching to / extending Skilled Worker — instructable
**Citation:** Appendix Skilled Worker — eligibility (SW 4.1 onwards) + Appendix English Language (B1 CEFR) + Appendix Finance (£1,270 maintenance, 28-day rule)
**Tone:** positive, routine work
**Summary:** *"With a confirmed job offer and a licensed sponsor, switching to or extending Skilled Worker is one of the more straightforward routes — provided the salary meets the threshold for the SOC code, the English requirement is met, and (for switches) you're in a category that permits in-country switching to Skilled Worker. Most applications are decided within 8 weeks (3 weeks with priority service)."*
**Considerations:**
- Confirm the SOC code (Standard Occupational Classification) and minimum salary — most roles need £38,700+, shortage list and health & care exceptions apply
- English at B1 CEFR via a SELT or recognised qualification
- Maintenance: £1,270 held for 28 days, or sponsor certifies maintenance
- Priority service: 5 working days, super-priority 1 working day
- Visit visa, short-term study, seasonal worker and a few other categories **cannot switch in-country** — they must leave and apply out-of-country

> **[VERIFY]** Confirm: minimum salary £38,700 (April 2024 update) is still current for general Skilled Worker; lower thresholds for new entrants, health & care, shortage list, education roles. Cite £38,700 or refer to "current threshold under SW 14.1"? Same question for the 14-day-grace and £1,270 maintenance — these are the numbers visitors will Google to check us.

### Outcome 5 — ILR / Settlement — 5-year continuous residence
**Citation:** Appendix Skilled Worker — paragraph SW 24.1 onwards (settlement) + Appendix Continuous Residence + Life in the UK test + English at B1 CEFR
**Tone:** positive, milestone work
**Summary:** *"After 5 years' continuous residence on Skilled Worker (and predecessor Tier 2 General routes), and provided the salary meets the threshold at the time of the ILR application, English at B1 is met, the Life in the UK test is passed, and absences are within limits, the visitor qualifies for Indefinite Leave to Remain. ILR removes the work-restriction and is a step towards British citizenship."*
**Considerations:**
- Continuous residence: usually no more than 180 days outside the UK in any 12-month rolling period
- Salary at the ILR application must meet the going rate for the SOC code at the time of the application — historic threshold isn't enough
- Life in the UK test must be passed before applying
- ILR opens the route to naturalisation after a further 12 months (or immediately if married to a British citizen)

> **[VERIFY]** Confirm: 180-day absence limit, 5-year continuous residence, B1 English, Life in the UK — anything to update? The cite chain is long here; want to make sure each component is current.

### Outcome 6 — Switching to family route — cross-link to Spouse Visa wizard
**Citation:** Appendix FM (Family Members) — Immigration Rules
**Tone:** redirect, positive
**Summary:** *"Switching from Skilled Worker to a family route (spouse, partner, parent of child) is possible in-country if you meet the family route requirements. The eligibility test there is very different — relationship genuineness, English, financial threshold (currently £29,000 for spouse), accommodation — so it makes sense to run our Spouse Visa wizard first to see if you'd qualify."*
**CTA:** "Run the Spouse Visa wizard →" linking to `/visa-wizard/`

> **[REDLINE]** Worth handing off, or should it be a self-contained outcome with the family-route information stated here? Handoff seems cleaner but means a visitor potentially does two wizards in a row — confirm.

### Outcome 7 — Specialist consultation (default)
**Citation:** Appendix Skilled Worker — general
**Tone:** mixed
**Summary:** *"Your circumstances need a more detailed conversation than a wizard can give. A 30-minute free consultation will go through your specific facts and identify the right route."*
**Considerations:**
- Bring your current visa BRP/eVisa, the most recent CoS or job offer letter, and any refusal letters to the call
- We'll identify whether switching, extension, ILR, family route, or specialist work fits best
- Free 30-minute consultation, no obligation

---

## Disclaimer copy (same shape as Phase 1 & 2)

### Top banner
> *"This wizard helps you understand which UK Skilled Worker route may apply to your situation. It's a guide, **not legal advice**, and not a prediction of approval. Reviewed by Imran Shah — SRA #509359 · admitted 2012 · verify on SRA register. Last reviewed: May 2026."*

### Result page footnote
> *"Reviewed by Imran Shah — SRA #509359. Last reviewed: May 2026. This is a guide, not legal advice. Salary thresholds, English requirements and the rules change frequently — confirm current figures at gov.uk before applying."*

### Email capture
> *"We'll send you a copy of your result. By submitting you agree we can email you about your visa enquiry. We won't add you to marketing lists, and we won't call unless you specifically ask."*

### Deflection outcome — special-case email capture copy
For Outcome 1 (job-search deflection) the email capture explicitly **does not** suggest a follow-up call by default. The default opt-in copy reads:

> *"We'll email you the list of sponsor-search starting points so you have it on hand. We won't call unless you come back to us with a job offer."*

> **[REDLINE]** Tone of the deflection-outcome email capture — is "we won't call unless you come back to us with a job offer" right, or should it be softer? My read is that this is the *kind* version of "don't waste our time" and the visitor will respect it.

---

## Where it lives + capture

**Standalone page:** `/skilled-worker-wizard/` (or `/skilled-worker-route-finder/` — open to your preference)

**Pattern A inline embed on:** `/skilled-worker-visa/` (the active service page that Google Ads might land on)

**Pattern B entry card on:** `/immigration/`, `/sponsor-licence-applications/`, and the homepage Quick Triage band (replacing one of the lower-volume wizards if appropriate)

**Source tags into SalesHub:**
```
skilled-worker-wizard-standalone:<route-id>
skilled-worker-wizard-embed:<page-slug>:<route-id>
```

**Service tag into SalesHub:** `[Wizard] UK Skilled Worker` — consistent with the other 6 wizards.

**GTM events:** Same structure as Phase 1 & 2 — `wizard_start`, `wizard_question_answered`, `wizard_result_shown`, `wizard_email_capture_opened`, `ec_form_submit`, `wizard_entry_card_clicked`. Scoped via `source` tag for funnel analysis.

**Deflection-outcome tracking:** add a custom dimension `wizard_outcome=deflection` so we can measure the *deflection rate* in GA4 — i.e. what percentage of /skilled-worker-wizard/ starts end in O1 instead of a call. That's the KPI for whether this wizard is working.

---

## Open redline questions — checklist

By the time you finish this doc I'll know:

- [ ] Q1 buckets approved — are the 9 situation types right? Particularly: should "extension-due" merge with "ilr-approaching"?
- [ ] Q2 — 5-year bucket sized correctly to ILR threshold?
- [ ] Q3 — include gov.uk sponsor register link in helper text or keep for result page?
- [ ] Q4 — 14-day Para 39E framing correct? Anything else?
- [ ] Q5 "switch-family-route" handoff to Phase 1 wizard — right call?
- [ ] Routing precedence — particularly rule 2 vs rule 4 (visa expiring + not even looking)
- [ ] O1 deflection-outcome tone — does it read kindly enough?
- [ ] O2 60-day grace period — cite (SW 9.7 / SW 11.1) and 60-day window confirmed?
- [ ] O3 overstayer outcome — split into 14-day vs long-term, or keep combined?
- [ ] O4 salary threshold — cite £38,700 specifically or refer to "current threshold"?
- [ ] O5 ILR cite chain — 180-day absences, 5-year continuous residence, B1, Life in UK — anything outdated?
- [ ] O6 family route handoff — handoff to Phase 1 wizard or self-contained?
- [ ] Deflection email capture copy — "we won't call unless you come back with a job offer" — right tone?

When done, send the marked-up doc back. I'll apply changes, build the wizard, deploy.

---

## Build estimate (post-sign-off)

Based on Phase 2 effort: **~14 hours total** (Phase 2 was 12 hours; Phase 3 has more outcomes and the deflection-outcome custom email-capture variant):

- Question logic (5 Qs, 7 outcomes, precedence): 5 hours
- Build (fork existing visit-visa-refusal-widget, swap question schema + routing function, add deflection-outcome no-call variant): 5 hours
- QA + mobile + CRM webhook test + GA4 deflection-rate event: 3 hours
- Schema + llms.txt + sitemap + entry cards + homepage Quick Triage band swap: 1 hour

**Same architecture as Phase 1 & 2**: shared `<VisaWizardWidget>` component pattern with a fork for the deflection-outcome variant.

---

## Why this wizard is different from Phase 1 & 2

| Aspect | Phase 1 (Spouse) | Phase 2 (Visit Refusal) | Phase 3 (Skilled Worker) |
|---|---|---|---|
| Audience | Curious — eligibility check | Urgent — refused, need help | **Mixed — recruitment-help vs instructable** |
| Goal | Capture eligibility leads | Capture refusal leads | **Deflect 40-60% of callers, capture the rest** |
| Primary KPI | Email capture rate | Email capture rate | **Deflection rate (O1 outcome share)** |
| Tone | Encouraging | Reassuring | **Kindly firm on the deflection outcome** |

The success metric the wizard should achieve is: a measurable reduction in phone-team time spent on "I'm looking for a sponsor" calls, with no measurable loss of instructable Skilled Worker leads.

---

## Phase 4 ideas (parked, for after Phase 3 ships)

- ILR-only wizard (for the 5-year-resident audience — different SEO + ad audience from new applicants)
- Sponsor Licence wizard (for *employers* looking to obtain a licence — completely different audience, B2B)
- EU Settlement / Pre-Settled Status review wizard (high search volume, complex routing)
