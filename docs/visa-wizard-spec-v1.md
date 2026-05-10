# UK Visa Wizard v1 — Spec Doc for Solicitor Sign-off

**Reviewer:** Imran Shah, Immigration & Litigation Solicitor (SRA #509359, admitted 2012)
**Date drafted:** May 2026
**Status:** Live but unverified by solicitor — paid traffic should not roll until this redline is complete
**Live URLs:**

- Standalone: `https://www.abrahamssolicitors.co.uk/visa-wizard/`
- Pattern A embed: `https://www.abrahamssolicitors.co.uk/uk-spouse-visa/`
- Pattern B entry card: `/immigration/`, `/uk-fiance-visa/`, `/uk-partner-visa-extension/`, `/uk-unmarried-partner-visa/`, `/civil-partnership-visa/`

---

## How to use this document

Read each section. Where I'm asking for your view, I've added a **`> [REDLINE]`** block — leave a tracked-changes note, a comment, or just edit inline. Where I'm uncertain about a citation or threshold, I've flagged it as **`[VERIFY]`**. When you're done, send the doc back marked up and I'll apply your changes to the live wizard. Total time expected: ~3 hours including the citation cross-check.

The wizard is purely advisory — output is "the route most relevant to discuss is X", never a prediction of approval. SRA Standard 8.1/8.6/8.8 framing already in place via the Council review.

---

## Council mandates already baked in (FYI, no action)

1. Pure decision tree, no AI, no LLM (deterministic output, no hallucinated cites)
2. No "Strong / Likely / Time-barred" eligibility labels — neutral routing language only
3. Result shown BEFORE email capture (no email-then-result pattern)
4. SalesHub write only on explicit visitor opt-in (GDPR/PECR consent gate)
5. Asylum out of scope for v1 (sensitive route, kept off the wizard)
6. Your name + SRA #509359 + admission year displayed on every result + page footer
7. "Last reviewed: May 2026" stamp throughout
8. Plain English in question text — statutory cites move to result footnotes only

---

## The 6 questions (verbatim copy)

### Q1. Where are you and your partner right now?

Helper text: *"We'll use this to work out which version of the spouse visa applies."*

| Value | Visible label |
|---|---|
| `uk-sponsoring-abroad` | I'm in the UK, my partner is abroad |
| `abroad-sponsoring-uk` | I'm abroad, my partner is in the UK |
| `both-uk` | We're both in the UK |
| `both-abroad` | We're both abroad |

> **[REDLINE]** Anything missing? Should "We're both abroad, but the UK partner is moving back soon" be its own option, or does the current "both-abroad" routing handle it adequately?

### Q2. What's your relationship?

| Value | Visible label |
|---|---|
| `married` | Married or in a civil partnership |
| `cohabiting-2y` | Lived together for 2+ years (unmarried partners) |
| `engaged` | Engaged — planning to marry in the UK within 6 months |
| `newer` | Together less than 2 years, not married yet |

> **[REDLINE]** Is "Engaged — planning to marry in the UK within 6 months" the right framing? Fiancé(e) visa is 6 months total, but the marriage doesn't have to be within 6 months of *application* — it has to be within 6 months of *arrival*. Should we soften?

### Q3. What's the UK partner's status?

Helper text: *"The partner who is (or will be) in the UK as the sponsor."*

| Value | Visible label |
|---|---|
| `british` | British citizen |
| `settled` | Settled (Indefinite Leave to Remain) |
| `refugee` | Refugee or humanitarian protection |
| `pre-settled` | Pre-settled status under EU Settlement Scheme |
| `other-visa` | Another visa (work, student, etc.) |

> **[REDLINE]** Two specific concerns: (1) Should we add an option for **"Settled status under EUSS"** (different from pre-settled and from ILR)? (2) For `pre-settled`, the wizard routes to "Appendix EU (Family Permit)" — but the EUSS family permit closed to most new applications post-Brexit. Is that route still live for the people most likely to land on this wizard?

### Q4. Annual household income (gross, before tax)?

Helper text: *"This is the financial requirement — the threshold is currently £29,000."*

| Value | Visible label |
|---|---|
| `above-29k` | £29,000 or more from employment / self-employment |
| `savings-route` | Below £29,000 but we have £88,500+ in savings |
| `disability-exempt` | The UK partner receives certain disability benefits (exempt) |
| `below` | Below £29,000 with no large savings |

> **[VERIFY £29,000]** This was set by the April 2024 Statement of Changes. Has there been any update since? (Spring/Autumn 2025 SoCs.) Confirm or give the current figure.
>
> **[VERIFY £88,500]** Same question — confirm current savings threshold. Is the calculation still `(£16,000 + (income shortfall × 2.5))` or has this changed?
>
> **[REDLINE]** Should we add a fifth option "Combined with my partner's income / future earnings" since once the applicant is in the UK both incomes can count? Or is that complexity-creep best left to consultation?

### Q5. English language — does the applicant partner have any of these?

Helper text: *"The applying partner needs to show English ability. Pick the closest match."*

| Value | Visible label |
|---|---|
| `test` | An English test certificate at CEFR A1 or higher |
| `degree` | A degree taught in English |
| `english-country` | Citizenship of a majority English-speaking country (US, Canada, Australia, NZ, etc.) |
| `none` | None of the above yet |

> **[REDLINE]** The "majority English-speaking country" list — should we list it explicitly (US, Canada, Australia, NZ, Antigua & Barbuda, Bahamas, Barbados, Belize, Dominica, Grenada, Guyana, Jamaica, Malta, New Zealand, St Kitts & Nevis, St Lucia, St Vincent & the Grenadines, Trinidad & Tobago)? Or is "etc." acceptable shorthand?

### Q6. Has the applying partner been refused a UK visa before?

| Value | Visible label |
|---|---|
| `no` | No, never refused |
| `old` | Yes, but more than 10 years ago |
| `recent` | Yes, in the last 10 years |

> **[REDLINE]** Should this be more specific — separate options for "refused for deception" vs "refused on financial grounds" vs "refused on Article 8 grounds"? The wizard currently routes any recent refusal to the same "needs solicitor" outcome, but the redirected routes are very different. Worth splitting?
>
> **[REDLINE]** Should we add a question about **dependants/children**? Currently no question — wizard routes assume the partner is the only applicant. If they have children, the application is materially different (each child is a separate application + separate UKVI fee + IHS).

---

## The 10 routing outcomes

Each outcome has: route name, statutory citation, summary text, "what to think about next" considerations, and a tone (positive/mixed/needs-review). Listed in **precedence order** — the first rule that matches wins.

### Routing precedence (the order matters)

```
1. relationship === "engaged"           → Fiancé(e) Visa
2. relationship === "newer"             → Relationship requirement not met
3. uk_status === "pre-settled"          → EUSS family route
4. uk_status === "other-visa"           → Sponsor not eligible under FM
5. history === "recent"                 → Prior refusal complications
6. income === "below"                   → Financial requirement gap
7. english === "none"                   → English language gap
8. where === "both-uk"                  → In-country switch (R-LTRP)
9. where === "both-abroad"              → Both abroad — sequencing
10. (default — happy path)              → Standard Spouse Visa (EC-P)
```

> **[REDLINE]** Is this precedence right? E.g., if someone is engaged AND has a recent refusal, the wizard tells them about the Fiancé(e) Visa and ignores the refusal. Should refusal trump engagement?

### Outcome 1 — Fiancé(e) or Proposed Civil Partner Visa
**Citation:** Appendix FM, Section EC-P (Family Members) — Immigration Rules
**Summary:** *"The Fiancé(e) Visa is a 6-month entry-clearance visa for a partner coming to the UK to marry or enter a civil partnership. Once married in the UK, you switch to the Spouse Visa from inside the UK."*
**Considerations:**
- You will need to show genuine intention to marry within 6 months of arrival
- Financial requirement (£29,000) and English language requirements still apply
- Plan the wedding date and venue before applying — UKVI will ask

> **[VERIFY]** Is there a more specific paragraph cite than just "Section EC-P"? E-ECP.2.6 is the relationship limb that covers proposed civil partners.

### Outcome 2 — Relationship requirement not yet met
**Citation:** Appendix FM, Section EC-P.1.1 — relationship requirements
**Summary:** *"The Spouse / Partner Visa requires either marriage / civil partnership OR 2+ years of cohabitation. Without either, the standard route isn't available yet."*
**Considerations:**
- Options: marry or enter a civil partnership, then apply
- Or: build 2 years of cohabitation evidence (joint tenancy, bills, photos), then apply as unmarried partners
- A solicitor can advise on the safest, fastest path given your specific facts

> **[REDLINE]** Are we comfortable with "joint tenancy, bills, photos" as the headline cohabitation evidence? Or should we hedge and say "consult a solicitor"?

### Outcome 3 — EU Settlement Scheme family member route
**Citation:** Appendix EU and Appendix EU (Family Permit) — Immigration Rules
**Summary:** *"If your partner has pre-settled status under the EU Settlement Scheme, the family member route under Appendix EU is likely the right starting point — not the standard Spouse Visa."*
**Considerations:**
- EUSS family permits have different evidence requirements to Appendix FM
- The relationship must usually have been formed before 31 December 2020 for some routes
- A solicitor will identify whether EUSS or Appendix FM is stronger for your facts

> **[VERIFY]** "Relationship must have been formed before 31 December 2020" — is this still the test, given the various transitional provisions and the fact EUSS family permit is partially closed? What's the current state for someone applying mid-2026?

### Outcome 4 — Sponsor not eligible under Appendix FM
**Citation:** Appendix FM, Section EC-P.1.1(c) — eligibility of sponsor
**Summary:** *"Standard Spouse / Partner sponsorship requires the UK partner to be a British citizen, settled (ILR), or have refugee status. There may still be routes — for example, dependants of certain work visas — but these are different rules."*
**Considerations:**
- Skilled Worker / Health & Care Worker / Student visa holders can sometimes bring a dependent partner under those visa-specific routes
- The dependent route's rules differ from Appendix FM (no separate financial threshold for dependants of Skilled Workers)
- Book a consultation so we can identify the right dependent route for your visa category

> **[REDLINE]** "No separate financial threshold for dependants of Skilled Workers" — verify this is still accurate post-2024 changes. Has UKVI introduced a dependant-specific threshold?

### Outcome 5 — Prior-refusal complications
**Citation:** Appendix FM Section EC-P + Suitability provisions (S-LTR / S-EC)
**Summary:** *"Recent refusals (within the last 10 years) affect future applications. Depending on the refusal reason, a fresh application, administrative review or appeal may be the right next step before reapplying."*
**Considerations:**
- Get the original refusal letter reviewed line-by-line — many refusals have specific procedural answers
- False-representation or deception findings carry a 10-year re-entry ban that needs careful handling
- Don't reapply blind — this is exactly the case where solicitor review pays for itself

> **[VERIFY]** "10-year re-entry ban for deception" — confirm. Is it always 10 years, or does it depend on whether deception was used inside or outside the UK? (Para 320 / Suitability — S-EC.1.5 vs S-LTR.)

### Outcome 6 — Financial requirement gap
**Citation:** Appendix FM-SE (specified evidence) — financial requirement
**Summary:** *"The £29,000 financial requirement is the most common reason for refusal. Several routes around it exist: third-party support, future earnings, self-employment averaging, savings combined with income."*
**Considerations:**
- Joint income from both partners may count once the applicant is in the UK
- Cash savings of £88,500 substitute for income; partial savings can top up below-threshold income
- Specific exemptions apply if the UK partner receives certain disability benefits
- These are the cases where a solicitor's pre-application review is most valuable

> **[VERIFY]** "Third-party support" — is this still permitted post-MM (Lebanon)? Last I checked it was strictly limited but I want your sign-off on whether to keep this in the visitor-facing copy.
>
> **[VERIFY]** "Joint income may count once applicant is in the UK" — confirm this works for spouse visa entry clearance vs. only LTR/extension.

### Outcome 7 — English language gap
**Citation:** Appendix FM, Section EC-P.4.1 — English language requirement
**Summary:** *"Your partner needs to evidence English ability before applying. The standard route is a CEFR A1 test from a UKVI-approved provider for the initial visa (B1 for settlement)."*
**Considerations:**
- IELTS Life Skills A1 is the most common test — usually book 3-4 weeks ahead
- Exemptions exist for over-65s, those with long-term physical or mental conditions, and graduates of UK-recognised English-taught degrees
- We'll advise on the right test or exemption for your case

> **[VERIFY]** Confirm A1 for entry, A2 for extension, B1 for ILR is still the progression. Has this changed?

### Outcome 8 — In-country switch (R-LTRP)
**Citation:** Appendix FM, Section R-LTRP — leave to remain as a partner
**Summary:** *"If both of you are in the UK and the UK partner is British, settled, or has refugee status, the applying partner may be able to switch to a Spouse Visa from inside the UK — depending on their current visa status."*
**Considerations:**
- Visitors generally cannot switch and must leave and apply from abroad
- Other visa categories (Student, Worker) usually can switch in-country
- Section 3C leave can preserve immigration status during the application — important if a current visa is close to expiry

> **[REDLINE]** "Visitors generally cannot switch" — should we be firmer? My understanding is "cannot switch from visit visa" is essentially absolute. Soften / firm up the language?

### Outcome 9 — Both abroad — sequencing
**Citation:** Appendix FM, Section EC-P — entry clearance as a partner
**Summary:** *"The Spouse Visa is the right route, but the UK partner usually needs to be in the UK at the time of application (or returning with the applicant). The income evidence required depends on which."*
**Considerations:**
- If the UK partner is moving back to the UK at the same time, returning-resident rules + future-earnings income can both apply
- If the UK partner is staying abroad longer, the application typically can't yet meet the requirements
- This is a common sequencing question — book a free consultation and we'll plot the timeline

> **[REDLINE]** "Returning-resident rules + future-earnings" — is this combination correct, or are they typically used in alternation rather than together?

### Outcome 10 — Standard Spouse / Partner Visa (entry clearance) — happy path
**Citation:** Appendix FM, Section EC-P (Family Members) — Immigration Rules
**Summary:** *"Based on your answers, the standard Spouse / Partner Visa under Appendix FM is the route most relevant to discuss. Your circumstances appear to fit the core eligibility shape — relationship, sponsor status, financial requirement and English language all look in scope."*
**Considerations:**
- Documentary evidence is decisive — most refusals come from missing or unclear evidence, not eligibility itself
- UKVI standard service is roughly 12 weeks for entry clearance; priority and super-priority services are available
- A solicitor review before submission is the highest-leverage step you can take — it's much cheaper than a refusal

> **[REDLINE]** "Roughly 12 weeks for entry clearance" — current as of May 2026? Worth a quick gov.uk processing-time check before publishing.

---

## Disclaimer copy shown to the visitor

### On every page (top banner)
> *"This wizard is a guide to which visa route may apply, **not legal advice** and not a prediction of outcome. Home Office decisions turn on the full evidence of your case. Reviewed by Imran Shah — SRA #509359 · admitted 2012 · verify on SRA register. Last reviewed: May 2026."*

### On every result page (footnote)
> *"Reviewed by Imran Shah — SRA #509359. Last reviewed: May 2026. This is a guide, not legal advice."*

### On the email-capture step
> *"We'll send you a copy of your result. By submitting you agree we can email you about your visa enquiry. We won't add you to marketing lists, and we won't call unless you specifically ask."*

### Standalone page footer
> *"This page is general guidance, not legal advice. UKVI fees and the Immigration Health Surcharge change periodically — confirm current rates at gov.uk before applying. Past results do not guarantee future outcomes. Abrahams Solicitors · SRA-regulated firm #809071. Last reviewed: May 2026 by Imran Shah (SRA #509359). Reviewed quarterly against Statements of Changes to the Immigration Rules."*

> **[REDLINE]** Sign these off as written, or redline. The "reviewed quarterly against Statements of Changes" commitment is the one I want you to confirm — it's a commitment we're making to visitors.

---

## What gets captured into SalesHub (CRM)

When (and only when) the visitor clicks "Email me the result" and enters their name + email:

```
Source field: visa-wizard-standalone:<route-id>
              OR visa-wizard-embed:uk-spouse-visa:<route-id>
              OR visa-wizard-embed:uk-spouse-visa-solicitors:<route-id>

Service:      "UK Spouse Visa (wizard)"

Message:      Visa Wizard route: <Outcome name>
              Citation: <Statutory cite>
              Q1 → answer
              Q2 → answer
              ... (all 6 Q&As)

Plus:         name, email, phone (optional), gclid, msclkid, traffic_source
```

> **[REDLINE]** Want any of this changed? E.g., should "Service" read differently for Fiancé(e) outcomes? Should the "Source" tag be more granular?

---

## Telemetry (GTM dataLayer events)

Fire on every wizard interaction:

| Event | When | Used for |
|---|---|---|
| `wizard_start` | Wizard widget mounts | Top-of-funnel count |
| `wizard_question_answered` | Each "Continue" click | Drop-off analysis per question |
| `wizard_result_shown` | Result screen displayed | True engagement count (independent of email capture) |
| `wizard_email_capture_opened` | "Email me the result" clicked | Intent-to-convert signal |
| `ec_form_submit` | Email form submitted | Existing — feeds Google/Bing Ads Enhanced Conversions |
| `wizard_entry_card_clicked` | Pattern B card clicked | Click-through rate per page where the card lives |

No PII is sent to GTM until `ec_form_submit`, where only hashed-equivalent fields fire (Google's GTM template handles SHA-256 hashing).

---

## Open redline questions — checklist

By the time you finish this doc I'll know:

- [ ] Q1-Q6 wording approved (or redlined)
- [ ] Routing precedence approved
- [ ] All 10 outcome citations verified or corrected
- [ ] £29,000 + £88,500 thresholds confirmed current
- [ ] Disclaimer copy approved
- [ ] Confirm: should we add a "dependants/children" question?
- [ ] Confirm: should "recent refusal" split by reason?
- [ ] Confirm: pre-settled / EUSS routing still accurate?
- [ ] Confirm quarterly review commitment

When done, send the marked-up doc back. I'll apply changes, re-deploy, and we'll roll paid traffic to the wizard.

---

## After your sign-off

1. I commit your changes to the wizard logic + this doc as v1.1
2. We publish a `/visa-wizard/logic.txt` file (citable AI-search artefact — Council recommended this for E-E-A-T)
3. Roll out Pattern A to the rest of the spouse-visa cluster (`/uk-fiance-visa/`, `/uk-partner-visa-extension/`, `/uk-unmarried-partner-visa/`, `/civil-partnership-visa/`) if Pattern A on `/uk-spouse-visa/` outperforms the consultation form over the 2-week measurement window
4. Phase 2 wizards: Skilled Worker (next ad-spend target), then ILR, then Citizenship
