# Imran Shah — Phase 3 wizard redline request

**Status:** Ready to send. Spec lives at `docs/skilled-worker-wizard-spec-v1.md` on `main`.

**Two send options:**
1. **Attach the .md file directly** (simplest — Imran opens in any text editor or drops into Word/Google Docs for in-place markup)
2. **Paste the spec into a Google Doc** with comment-enabled sharing (better for non-engineer markup, link-shareable)

---

## Email subject

```
Phase 3 wizard ready for your redline — Skilled Worker triage (13 items)
```

## Email body (ready to paste into Outlook / Gmail)

> Imran,
>
> Phase 1 (Spouse) and Phase 2 (Visit Visa Refusal) are both live. Phase 3 is the one I want your sharpest eye on, because it's different in nature from the first two.
>
> The team flagged that a big share of Skilled Worker enquiries arriving by phone are **not instructable legal work** — they're people without a job offer, without a sponsor, asking us to help them find one. That's recruitment work, not solicitor work, and every minute spent explaining that is a minute not spent on real cases.
>
> So Phase 3's *primary* job is **kind deflection** — route the recruitment-help callers to gov.uk's sponsor register and LinkedIn without a follow-up call, while still capturing the genuinely instructable cases: 60-day grace period, overstayers, switching, extension, ILR. The deflection outcome is the point of the wizard, not a side-effect.
>
> Same review pattern as Phase 2 — `[REDLINE]` items are your preference, `[VERIFY]` items are your sign-off as the SRA-regulated solicitor. Spec is attached; please reply with the doc marked up, or just answer the 13 numbered items below if quicker.
>
> **8 items where I need your preference (copy / UX / routing tone)**
>
> 1. **Q1 buckets.** I've proposed 9 situation types — visa-expiring, visa-expired, sponsor-revoked, looking-for-sponsor, have-offer, on-other-visa, ilr-approaching, extension-due, other. Should "extension-due" and "ilr-approaching" merge, or keep separate? Anything else missing?
> 2. **Q3 helper text.** Worth including a direct gov.uk sponsor-register link in the question itself, or hold it back for the result page only? My instinct is link-in-question improves drop-off rate but happy to defer.
> 3. **Q5 — switch-family-route handoff.** When someone says they want to switch to a spouse / partner visa, the wizard hands them off to the Phase 1 Spouse Visa wizard via a CTA. Is that the right call, or should this outcome stand alone with family-route info stated here?
> 4. **Routing precedence — sharp edge.** Someone whose visa expires in 60 days **and** who has no offer **and** isn't even looking is in the 60-day grace period (routes them to O2 urgent legal review) — but functionally they need to be told "find an employer first" (O1 deflection). Currently they go to O2. Should they instead go to O1 if Q3 says they're not even looking? Your call.
> 5. **Outcome 1 tone (deflection).** This is the most important outcome in the wizard — the one that saves your team time. Critical question: does it land helpful, not dismissive? I want this to read like a senior solicitor doing someone a favour, not a chatbot. Mark it up freely.
> 6. **Outcome 3 split — 14-day vs long-term overstay?** Currently combined into one outcome. Should "within 14 days" (Para 39E might apply) and "long-term overstay" be separate outcomes with different tones?
> 7. **Outcome 6 handoff to Spouse wizard** — handoff or self-contained? Trade-off is two wizards in a row vs less content for you to maintain on the Skilled Worker wizard's outcome page.
> 8. **Deflection-outcome email capture copy.** Currently: *"We'll email you the list of sponsor-search starting points so you have it on hand. We won't call unless you come back to us with a job offer."* Right tone? Too firm? Too soft?
>
> **5 items where I need your sign-off as the SRA-regulated solicitor (legal accuracy)**
>
> 9. **Q2 — 5-year bucket** sized to ILR continuous-residence threshold under Appendix Skilled Worker SW 24.1. Confirm cite still current and 5-year threshold unchanged.
> 10. **Q4 — 14-day Para 39E** framing. Confirm Para 39E still applies in current form and the 14-day window framing is right for visitors to see.
> 11. **Outcome 2 — 60-day grace period.** Cite is SW 9.7 / SW 11.1. Is 60 days still correct (not 30), and are those the right paragraph references?
> 12. **Outcome 4 — salary threshold.** Cite £38,700 specifically (April 2024 update) or refer to "current threshold under SW 14.1"? Same question for the £1,270 / 28-day maintenance rule — these are the numbers visitors will Google to check against us.
> 13. **Outcome 5 — ILR cite chain.** 180-day absences, 5-year continuous residence, B1 English, Life in UK test, salary-at-application threshold. Anything outdated? The cite chain is long here — I want to make sure each component is current.
>
> Once you're back with the marked-up doc, build is ~14 hours (Phase 2 was 12; this one is slightly bigger because of the deflection-outcome variant and the GA4 deflection-rate tracking event). I'd aim to have it live within a week of your sign-off.
>
> One thing worth flagging upfront: I want to **measure the deflection rate** in GA4 — what percentage of Skilled Worker wizard starts end at the "you need recruitment, not a solicitor" outcome. That's the KPI for whether the wizard is doing its job. We won't know real numbers until 4-6 weeks of traffic, but I'd hope to see deflection rate above 30% — meaning roughly 1 in 3 enquiries we'd otherwise have taken on the phone are self-resolving via the wizard.
>
> Anything in here you'd like to talk through on a call rather than mark up, let me know — happy to set up 30 minutes.
>
> Best,
> Mohammed

---

## Google Doc body (if going the link route instead of attachment)

Open https://docs.google.com → blank doc → paste the full spec from `docs/skilled-worker-wizard-spec-v1.md`. The `[REDLINE]` / `[VERIFY]` tags will be visible inline for Imran to comment on with Google Docs' suggestion mode.

**Sharing recipe for the Google Doc:**
1. Click Share (top right)
2. General access → "Anyone with the link → Commenter"
3. Copy link
4. Paste link into the email above (replace "Spec is attached" with "Here's the spec doc: [link]")

**Why Google Doc over attachment:** Imran can highlight specific sentences and comment without re-attaching files. Better trail for back-and-forth. Worth the 60-second setup.

---

## After Imran replies

- Apply his redlines to `docs/skilled-worker-wizard-spec-v1.md` — commit as "Phase 3 spec v1.1 — Imran sign-off"
- Build phase: ~14 hours (fork `visit-visa-refusal-widget.tsx`, swap question schema + routing function, add deflection-outcome no-call email-capture variant, deploy to `/skilled-worker-wizard/`, embed on `/skilled-worker-visa/`)
- GTM: add custom dimension `wizard_outcome=deflection` so we can track deflection rate as a primary KPI
- Same GTM event taxonomy as Phase 1 & 2 otherwise — no new events needed
- Service tag in SalesHub: `[Wizard] UK Skilled Worker` (consistent with the other 6 wizards we standardised today)

---

## Why I'm pushing for Phase 3 specifically

Phase 1 & 2 are visa-route wizards (educate + capture). Phase 3 is a **time-recovery wizard** for your team — it's the first one with a primary KPI of "fewer calls" rather than "more leads." That's a different muscle, and worth being explicit with Imran that the deflection outcome is the *feature*, not a bug.
