# Imran Shah — Phase 2 wizard redline request

**Status:** Ready to send. Spec lives at `docs/visit-visa-refusal-wizard-spec-v1.md` (commit `0a8c699` on `main`).

**Two send options:**
1. **Attach the .md file directly** (simplest — Imran opens in any text editor or drops into Word/Google Docs for in-place markup)
2. **Paste the spec into a Google Doc** with comment-enabled sharing (better for non-engineer markup, link-shareable)

---

## Email subject

```
Phase 2 wizard ready for your redline — Visit Visa Refusal (11 items)
```

## Email body (ready to paste into Outlook / Gmail)

> Imran,
>
> Phase 1 is live and the GA4 tracking is in. Phase 2 — the Visit Visa Refusal wizard — is drafted and ready for your sign-off using the same review pattern that worked for Spouse Visa.
>
> Important correction since my first draft: I had incorrectly listed Administrative Review as a remedy. As you noted, visit visas have no right of appeal (Immigration Act 2014, except on human rights / Article 8 grounds) and no admin review (Appendix AR doesn't cover them). The only formal challenge route is Pre-Action Protocol → potential Judicial Review within the 3-month CPR 54.5 window. The whole spec has been re-architected around this and the 11-item checklist below reflects the corrected scope.
>
> I've attached the spec doc. Each item is flagged inline with `[REDLINE]` (your preference) or `[VERIFY]` (your sign-off as the SRA-regulated solicitor) so you can mark up in place — please reply with the doc edited, or just answer the 11 numbered items below if quicker.
>
> **5 items where I need your preference (copy / UX)**
>
> 1. **Q1 refusal-reason buckets.** I've proposed seven: insufficient finances, weak ties to home country, doubts about visit purpose, previous refusal, false documents/deception, sponsor issues, other. Are these the seven most common in your experience? Reorder, rename, drop, or add — happy to follow your call.
> 2. **Q3 — keep or drop "Where did you apply from?"** UK-based visit-visa applications are rare. Worth keeping it to flag in-country switching restrictions, or simplify and drop?
> 3. **Q4 time-sensitive bucket.** Currently weddings, funerals, family medical emergencies, court hearings. Should "court hearing" be in there or is that too niche? Anything to add?
> 4. **Q5 "multiple refusals"** auto-routes to a specialist appeal conversation. Should we further qualify (e.g. distinguish "all visit visas" vs "mixed visa types")?
> 5. **A possible 6th question on family ties to the UK** — would help route the Article 8 path more accurately than Q4 alone. Worth adding, or is current routing good enough?
>
> **6 items where I need your sign-off as the SRA-regulated solicitor (legal accuracy)**
>
> 6. **Q2 timing buckets.** I've sized the buckets to the JR window (within 3 months / 3m–1y / over 1 year) per CPR 54.5. Confirm this is the right framing for visit visa refusals.
> 7. **Routing precedence.** Outcome 1 (deception finding) needs to trump Outcome 3 (urgent + recent + Article 8), correct? I have it that way but want explicit confirmation given the SRA-routing weight.
> 8. **Outcome 1 cite.** I'm citing Para 9.7–9.10 (formerly Para 320(7A)/(7B)). Also: which is the current exact suitability provision — S-EC.1.5 or S-EC.1.6? And does the PAP framing land right in your view?
> 9. **Outcome 2 cite.** Confirm S-EC.1.4 is the right reference for cumulative-effect refusals.
> 10. **Outcome 5 wording.** "No administrative review and no general right of appeal except on human rights grounds" — confirm that framing is correct for visitor-facing copy.
> 11. **PAP framing across Outcomes 1, 2, 3 and 5** — drafted as a parallel route to fresh application where the original refusal looks unlawful. Confirm this is right across all four outcomes.
>
> Once you're back with the marked-up doc, build is ~12 hours (same shape as Phase 1) — I'd aim to have it live within a week of your sign-off. Standalone page at `/visit-visa-refusal/` and embedded on `/visa-refusal-appeal/`, same as the Phase 1 split.
>
> Anything in here you'd like to talk through on a call rather than mark up, let me know — happy to set up 30 minutes.
>
> Best,
> Mohammed

---

## Google Doc body (if going the link route instead of attachment)

Open https://docs.google.com → blank doc → paste the full spec from `docs/visit-visa-refusal-wizard-spec-v1.md`. The `[REDLINE]` / `[VERIFY]` tags will be visible inline for Imran to comment on with Google Docs' suggestion mode.

**Sharing recipe for the Google Doc:**
1. Click Share (top right)
2. General access → "Anyone with the link → Commenter"
3. Copy link
4. Paste link into the email above (replace "I've attached the spec doc" with "Here's the spec doc: [link]")

**Why Google Doc over attachment:** Imran can highlight specific sentences and comment without re-attaching files. Better trail for back-and-forth. Worth the 60-second setup.

---

## After Imran replies

- Apply his redlines to `docs/visit-visa-refusal-wizard-spec-v1.md` — commit as "Phase 2 spec v1.1 — Imran sign-off"
- Build phase: ~12 hours (fork `visa-wizard-widget.tsx`, swap question schema + routing function, deploy to `/visit-visa-refusal/`, embed on `/visa-refusal-appeal/`)
- Same GTM event taxonomy as Phase 1 — no GTM changes needed
