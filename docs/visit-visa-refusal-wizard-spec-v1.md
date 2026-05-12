# UK Visit Visa REFUSAL Wizard v1.1 — Spec Signed Off

**Reviewer:** Imran Shah, Immigration & Litigation Solicitor (SRA #509359, admitted 2012)
**Date drafted:** May 2026
**Date signed off:** 12 May 2026 — all 11 redline/verify items approved as drafted
**Status:** Sign-off complete. Build can proceed.
**Phase:** 2 (Phase 1 = Spouse Visa, signed off May 2026)

**Sign-off notes:**
- All 5 copy/UX [REDLINE] items approved as drafted (Q1 buckets, Q3 keep, Q4 time-sensitive bucket incl. court hearing, Q5 multiple refusals framing, no 6th question on family ties — current routing sufficient)
- All 6 legal [VERIFY] items confirmed accurate (Q2 3-month JR window per CPR 54.5, deception precedence over urgency, Para 9.7-9.10 + S-EC.1.5, S-EC.1.4 for cumulative, no AR + no general appeal except HR, PAP framing across all four outcomes)

---

## Why a refusal-only wizard, not a fresh-application wizard

You and the user agreed: visit-visa **fresh applicants** generally don't need a solicitor — gov.uk's tools cover the rules adequately and DIY is the right play for most. **Visit-visa refused applicants** are a completely different audience:

- High urgency (28-day administrative-review window, time-sensitive events)
- High intent (need help NOW, not researching options)
- Higher fee per case (£900-2,000 — fresh application + admin review work, sometimes Article 8 challenges)
- Lower SEO competition (most firms have a generic "visa refusal" page; few have a wizard for triage)
- Lower SRA-routing risk than spouse — wizard's job is to ROUTE to the right remedy (admin review / fresh application / Article 8 / specialist appeal), not to predict outcome

Goal: triage the refusal in 60 seconds and route the visitor to the appropriate next-step conversation with a solicitor. Same Council compliance baseline as Phase 1.

> **CRITICAL CORRECTION applied 11 May 2026 after Imran review:** Visit visas have no right of appeal (Immigration Act 2014) except on human rights / Article 8 grounds, and no administrative review (Appendix AR doesn't cover visit visa refusals). The only formal challenge route is **Pre-Action Protocol → potential Judicial Review** in extreme cases. The 3-month JR time limit applies. Earlier draft incorrectly cited AR as an outcome — now removed. Q2 reframed around recency-for-strategy, not AR window.

---

## Council mandates baked in (same as Phase 1)

1. Pure decision tree, no AI, no LLM
2. **No "Strong / Likely / Time-barred" eligibility labels** — neutral routing language only ("the remedy most relevant to discuss is X")
3. Result shown BEFORE email capture
4. SalesHub write only on explicit visitor opt-in (GDPR/PECR consent gate)
5. Imran named on every result + footer, "Last reviewed" stamp throughout
6. Plain English in question text — statutory cites move to result footnotes only

---

## The 5 questions (proposed verbatim copy)

### Q1. What was the refusal reason in your letter?

Helper: *"Pick the closest match — refusal letters often list multiple reasons; pick the main one."*

| Value | Visible label |
|---|---|
| `not-genuine-visitor` | "Not satisfied you are a genuine visitor / will leave at the end" |
| `funds` | "Insufficient or unclear funds" |
| `weak-ties` | "Weak family / social / economic ties to home country" |
| `immigration-history` | "Adverse immigration history (overstay, prior refusals)" |
| `deception` | "False representation / deception" |
| `documents` | "Missing or inadequate supporting documents" |
| `multiple-or-unsure` | "Multiple reasons / I'm not sure" |

> **[REDLINE]** Are these the seven most-common refusal reasons in your experience? Reorder, rename, drop, or add as needed. The deception bucket carries the most SRA-routing weight — happy with it as-named?

### Q2. When were you refused?

Helper: *"This affects strategy — very recent refusals may still be within the window where a Pre-Action Protocol challenge is possible; older refusals usually point to a fresh application."*

| Value | Visible label |
|---|---|
| `within-3m` | "Within the last 3 months" |
| `3m-1y` | "Between 3 months and 1 year ago" |
| `over-1y` | "More than 1 year ago" |

> **[VERIFY]** The 3-month bucket is sized to the Judicial Review time limit (CPR 54.5 — JR must be brought promptly and in any event within 3 months of the decision). Confirm this is the right framing for visit visa refusals specifically, and that PAP letters are typically sent within that 3-month window.

### Q3. Where did you apply from?

| Value | Visible label |
|---|---|
| `overseas` | "From outside the UK (overseas visa application)" |
| `in-country` | "From inside the UK" |

> **[REDLINE]** Worth keeping? Visit-visa applications from inside the UK are rare (mostly visit-visa extensions). Could simplify by dropping this question if it's just an edge case — currently I'm using it to flag in-country switching restrictions.

### Q4. What was the purpose of the visit?

Helper: *"Tells us if there's an urgent angle that changes the strategy."*

| Value | Visible label |
|---|---|
| `family-friends` | "Visiting family or friends" |
| `tourism` | "Tourism / holiday" |
| `business` | "Business meetings / conference" |
| `time-sensitive` | "Time-sensitive event (wedding, funeral, family emergency, court hearing)" |
| `medical` | "Medical treatment in the UK" |
| `other` | "Other" |

> **[REDLINE]** The "time-sensitive" bucket is doing a lot of work — it triggers urgent-case routing (priority service / emergency Article 8 / direct call). Confirm that bucket should include weddings, funerals, family medical emergencies, court hearings, or refine.

### Q5. Have you been refused a UK visa before?

| Value | Visible label |
|---|---|
| `first` | "No, this was the first refusal" |
| `once-before` | "Yes, refused once before" |
| `multiple` | "Yes, refused multiple times" |

> **[REDLINE]** "Multiple refusals" auto-routes to a specialist-appeal conversation. Should we further qualify (e.g., "all visit visas" vs "mixed visa types")?

> **[REDLINE — possible 6th question]** Do you want a question on **family ties to the UK** (Q4 partly captures this via "visiting family") to help route the Article 8 path more accurately? Or is the current routing sufficient?

---

## The 7 routing outcomes (proposed)

Listed in **precedence order** — the first rule that matches wins.

### Routing precedence

```
1. refusal_reason === "deception"             → Section 320 / Suitability — PAP-or-fresh specialist review
2. previous_refusals === "multiple"           → Pattern of refusals — specialist consultation
3. visit_purpose === "time-sensitive"
   AND timing === "within-3m"                 → Urgent: PAP/JR consideration + priority fresh application
                                                 (Article 8 family-life angle if family ties)
4. timing === "over-1y"                       → Fresh application (long-gap reapplication)
5. timing === "within-3m" OR "3m-1y"          → Fresh application (strengthened evidence)
6. (default — should rarely hit)              → Refusal review consultation
```

> **[REDLINE]** Is this precedence right? Specifically: should rule 3 (urgent + recent) trump rule 1 (deception)? Probably not — deception findings need careful handling regardless of urgency, and PAP for a deception finding is itself a specialist piece of work. Confirm.

### Outcome 1 — Section 320 / Suitability — PAP-or-fresh specialist review
**Citation:** Paragraph 9.7-9.10 of the Immigration Rules (General Grounds for Refusal) + Suitability provisions S-EC.1.5 / S-LTR.1.6 + Pre-Action Protocol for Judicial Review (CPR PD54)
**Tone:** needs-review
**Summary:** *"A refusal citing false representation or deception is the most consequential type — most carry a 10-year ban from re-entering the UK. Visit visas have no administrative review or right of appeal except on human rights grounds, so the route forward is either a carefully-prepared fresh application that addresses the finding head-on, or — where the finding itself looks unlawful — a Pre-Action Protocol letter as the precursor to Judicial Review. This is specialist territory and should not be handled by a routine fresh application without solicitor review."*
**Considerations:**
- Get the original refusal letter reviewed — many "deception" findings turn out to be procedural errors. Where the finding is challengeable, a PAP letter can lead UKVI to withdraw it without a JR claim being issued
- 10-year ban under Para 9.8.1 / S-EC.1.5 needs precise handling
- A successful PAP can clear the record entirely; a fresh application made without addressing the finding can compound the ban
- This is exactly where solicitor review pays for itself many times over

> **[VERIFY]** Confirm Para 9.7-9.10 is the current cite (was previously Para 320(7A)/(7B)). Also confirm S-EC.1.5 vs S-EC.1.6 — I want the exact suitability provision number. Also confirm PAP framing is correct here.

### Outcome 2 — Pattern of refusals — specialist consultation
**Citation:** Cumulative effect under Suitability S-EC.1.4 + Para 9.7-9.10 of the Immigration Rules
**Tone:** needs-review
**Summary:** *"Multiple visit visa refusals create a pattern that affects how a fresh application is assessed. Each subsequent refusal becomes harder. The strategy needs to address the cumulative pattern, not just the most-recent refusal. Visit visas have no right of appeal except on human rights grounds, so the work is either a fresh application that addresses the pattern, or — in narrow circumstances — a Pre-Action Protocol where the most recent refusal looks unlawful."*
**Considerations:**
- A solicitor will read all your refusal letters together — patterns emerge that single-refusal review misses
- Sometimes the right strategy is a different visa category entirely
- Do not reapply without addressing the pattern — a 3rd or 4th refusal is materially harder to undo

> **[VERIFY]** Confirm S-EC.1.4 reference for cumulative effect.

### Outcome 3 — Urgent: time-sensitive event + recent refusal
**Citation:** Appendix V (Visitor) + Article 8 ECHR (where family event) + Pre-Action Protocol for Judicial Review (where the refusal looks unlawful and the 3-month JR window is open)
**Tone:** positive (urgent path exists)
**Summary:** *"A time-sensitive event (wedding, funeral, family medical emergency) plus a recent refusal usually means a fresh application with priority service is the right route — and where there is a real Article 8 family-life angle or the refusal itself looks unlawful, a Pre-Action Protocol letter can run in parallel. Same-day decisions are possible in priority cases."*
**Considerations:**
- Priority service decisions can come in 5 working days; super-priority in 1 working day
- For weddings / funerals / serious illness, supporting evidence (e.g. doctor's letter, death certificate) substantially strengthens the application
- If family ties to the UK are strong and the refusal interfered with Article 8 family life, a PAP letter to UKVI can run in parallel — JR must be brought within 3 months of the original decision (CPR 54.5)
- Don't apply blindly with priority service — a refused priority application costs more than a thoughtful one

> **[REDLINE]** Should we mention "court hearing" as a category of time-sensitive event, or is that too niche?

### Outcome 4 — Fresh application (long-gap)
**Citation:** Appendix V (Visitor) — Immigration Rules
**Tone:** positive (clean slate)
**Summary:** *"A refusal more than a year ago largely no longer affects a fresh application — UKVI will see the previous refusal but it's not contemporaneous. The right approach is a strong fresh application that addresses why the original refusal occurred."*
**Considerations:**
- Disclose the previous refusal — non-disclosure can itself trigger a deception finding
- Address the original refusal reason head-on (fund clarity, ties evidence, genuine-visitor evidence)
- Circumstances may have changed substantially (new job, marriage, children) — surface those
- Fresh application is usually the cleanest route here

### Outcome 5 — Fresh application (strengthened evidence)
**Citation:** Appendix V (Visitor) + visitor-equivalent evidence rules
**Tone:** positive
**Summary:** *"Most visit-visa refusals are best addressed by a fresh application with strengthened evidence rather than by trying to challenge the existing refusal. Visit visas have no administrative review and no right of appeal except on human rights grounds — so the fresh application is generally the cleanest route. It reaches a different case officer, allows new evidence, and usually decides faster than any legal challenge."*
**Considerations:**
- Strengthened evidence usually means: clearer funds, better ties documentation, rigorous travel-history disclosure, sponsor letter if visiting family
- Wait until at least the obvious gaps in the original application are fixed before reapplying
- A refused fresh application can stack — get it right second time
- Where the original refusal itself looks unlawful (e.g. a wrongly-applied deception finding), a Pre-Action Protocol can be considered — but that's specialist work and out-of-scope of a routine fresh application

> **[VERIFY]** Confirmed: visit visas have no admin review and no general right of appeal (Immigration Act 2014). Only formal challenge route is PAP → JR for unlawfulness, or appeal on human rights grounds. Is this framing right for the visitor-facing summary?

### Outcome 6 — Refusal review consultation (default)
**Citation:** Appendix V + Appendix AR + general refusal-handling
**Tone:** mixed
**Summary:** *"Your circumstances need a more detailed review than a wizard can give. A 30-minute free consultation will go through the refusal letter, your specific facts, and the right next step."*
**Considerations:**
- Bring your refusal letter, original application copy, and supporting documents to the call
- We'll identify whether fresh application, Pre-Action Protocol challenge, or specialist consultation fits best
- Free 30-minute consultation, no obligation

---

## Disclaimer copy (same shape as Phase 1)

### Top banner
> *"This wizard helps you understand which next step may apply after a UK visit visa refusal. It's a guide, **not legal advice**, and not a prediction of outcome. Reviewed by Imran Shah — SRA #509359 · admitted 2012 · verify on SRA register. Last reviewed: May 2026."*

### Result page footnote
> *"Reviewed by Imran Shah — SRA #509359. Last reviewed: May 2026. This is a guide, not legal advice."*

### Email capture
> *"We'll send you a copy of your result. By submitting you agree we can email you about your visa enquiry. We won't add you to marketing lists, and we won't call unless you specifically ask."*

> **[REDLINE]** Same disclaimer wording as Phase 1 — happy with these? Or anything refusal-specific worth adding?

---

## Where it lives + capture

**Standalone page:** `/visa-wizard/visit-visa-refusal/` (new — separate from `/visa-wizard/` standalone for spouse)

**Pattern A inline embed:** `/visa-refusal-appeal/` — the active service page that Google Ads might land on

**Pattern B entry card on:** `/uk-visit-visa/`, `/immigration/`

**Source tags into SalesHub:**
```
visit-visa-refusal-wizard-standalone:<route-id>
visit-visa-refusal-wizard-embed:<page-slug>:<route-id>
```

**GTM events:** Same structure as Phase 1 — `wizard_start`, `wizard_question_answered`, `wizard_result_shown`, `wizard_email_capture_opened`, `ec_form_submit`, `wizard_entry_card_clicked`. Scoped via `source` tag for funnel analysis.

---

## Open redline questions — checklist

By the time you finish this doc I'll know:

- [ ] Q1 refusal-reason buckets approved (or redlined)
- [ ] Q2 timing buckets reframed to 3-month / 3m-1y / >1y — sized to JR window — confirm right
- [ ] Q3 worth keeping or drop (in-country visit visa applications are rare)
- [ ] Q4 "time-sensitive" bucket confirmed (weddings/funerals/medical/court)
- [ ] Q5 "multiple refusals" — needs further qualification?
- [ ] Q6 (potential) — separate "family ties to UK" question?
- [ ] Routing precedence approved (specifically: deception trumps urgency?)
- [ ] All 6 outcome citations verified or corrected (was 7 — admin review outcome removed)
- [ ] Section 320 / Para 9.7-9.10 framing confirmed current
- [ ] PAP framing in Outcomes 1, 2, 3 and 5 — correct as drafted?
- [ ] Outcome 5 final wording on remedies-not-available — correct framing for visitor-facing copy?

When done, send the marked-up doc back. I'll apply changes, build the wizard, deploy.

---

## Build estimate (post-sign-off)

Based on Phase 1 effort: **~12 hours total**:
- Question logic: 4 hours
- Build (fork existing visa-wizard-widget, swap question schema + routing function): 4 hours
- QA + mobile + CRM webhook test: 3 hours
- Schema + llms.txt + sitemap + entry cards: 1 hour

**Same architecture as Phase 1**: shared `<VisaWizardWidget>` component pattern, separate question/route schema, separate `/visit-visa-refusal/` standalone page, embed on `/visa-refusal-appeal/`.
