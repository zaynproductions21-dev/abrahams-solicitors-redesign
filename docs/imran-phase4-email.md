# Imran Shah — Phase 4 wizard redline request (Citizenship Registration Checker)

**Status:** Ready to send. Spec lives at `docs/citizenship-checker-spec-v0.2.md` (post-council v0.2). Council report + transcript are at `docs/citizenship-checker-council-report-2026-07-09.html` and `.md`.

**Two send options:**
1. **Attach the .md file directly** (simplest — Imran opens in any text editor or drops into Word/Google Docs for in-place markup)
2. **Paste the spec into a Google Doc** with comment-enabled sharing (better for non-engineer markup, link-shareable)

---

## Email subject

```
Phase 4 wizard ready for your redline — Citizenship Registration Checker (13 items + routing truth-table sign-off)
```

## Email body (ready to paste into Outlook / Gmail)

> Imran,
>
> Phases 1 (Spouse), 2 (Visit Visa Refusal), and 3 (Skilled Worker) are all live. Phase 4 is the new **British Citizenship Registration Entitlement Checker** — the sister wizard to the naturalisation one, targeting the gap gov.uk's `/check-british-citizenship` leaves behind.
>
> The idea: someone lands on gov.uk asking "am I British?", gets a dry yes/no, and has no obvious next step — especially if the answer is "you're not British but you can REGISTER under s.4A / s.4B / s.4D / s.4L / s.1(3) / s.1(4)". gov.uk actively omits the registration routes. That's our differentiator: we do those cases, they don't cover them.
>
> **Important — this went through the full LLM council this week** before I sent it to you. The council flagged 10 material changes that I've already baked into v0.2 of the spec (attached). The biggest ones you should be aware of because they change legal exposure:
>
> - Question count went from 6 to **8** — added coverage of s.1(3) (parent settled/naturalised while applicant still a child) and s.1(4) (10-year UK residence for UK-born adults). Both branches were missing from v0.1 and would have misrouted UK-born adults with post-birth-settled parents.
> - **Routing decision matrix (Appendix A)** — Q1-Q8 truth table mapping every input combination to a single route. **We will not write any code until you sign this off.** That's the biggest change from Phase 2/3 — routing sign-off before build, not after, so we don't rebuild the routing table twice.
> - **Windrush-specific triage** — dedicated route that skips the standard "book a call" funnel and offers a priority named-solicitor callback within 1 working hour. Council flagged misrouting a Windrush claimant as our highest reputational risk.
> - Route titles are now human-first, statute-in-parens — no user ever sees "s.4B route" as an answer headline.
>
> Same review pattern as Phase 2/3 — `[REDLINE]` items are your preference, `[VERIFY]` items are your sign-off as the SRA-regulated solicitor. Spec is attached; please reply with the doc marked up, or just answer the 13 numbered items below if quicker.
>
> **6 items where I need your preference (copy / UX / tone)**
>
> 1. **Windrush triage empathetic copy.** The v0.2 spec says the Windrush route "acknowledges the Windrush injustice explicitly (empathetic tone)" and offers priority callback within 1 working hour. Do you want to write that opening paragraph yourself, or shall I draft and you redline? Given the sensitivity here I want your voice on it.
> 2. **"Already British — no call button" outcome.** Post-1983 UK birth with British/settled parent. Currently outputs "You're already British — here's how to get evidence" + first-passport guide + document checklist, **no call button**. Right call, or should there still be a soft "if you have concerns, here's a free call" fallback?
> 3. **s.4L / s.3(1) discretionary routes.** v0.2 defers both to "Complex — call needed" in v1 (they're consultation outputs in practice, per the Executor advisor's recommendation). Agree? Or is one of them safe enough to route confidently in v1?
> 4. **Cross-link copy on `/citizenship-wizard/`.** The existing naturalisation wizard needs a descriptive-anchor cross-link block pointing at the new registration checker. Suggested anchor: "Not sure if you need to naturalise or if you might already be entitled to register as British? Try our Registration Entitlement Checker." Right tone / accurate wording?
> 5. **"You're already British — how to get evidence" for pre-1983 births.** Pre-1983 born-in-UK adults have complex rules (mother-transmitted citizenship etc). Should we route them all to "Complex — call needed" in v1, or is there a safe confident branch you're happy with?
> 6. **First-reviewed date + first quarterly review-due date.** Spec says quarterly review cadence. What date do you want stamped as "last reviewed by Imran Shah" on the byline, and what's the next quarterly review date you're committing to?
>
> **7 items where I need your sign-off as the SRA-regulated solicitor (legal accuracy)**
>
> 7. **Routing decision matrix (Appendix A) — the big one.** The v0.2 spec has a priority list of 10 routes and route-precedence rules. I'll attach a spreadsheet with the full Q1-Q8 truth table (every 4×4×4×4×3×2×3 combination) for your line-by-line sign-off. **This is the deliverable that gates code — nothing gets built until this is signed.**
> 8. **s.1(3) framing.** Q4 covers "parents' current UK immigration status" for the s.1(3) branch (parent settled/naturalised before child turned 18). Confirm this is the right shape and the routing logic (Q1=UK + Q3=non-British + Q4=parent-now-ILR-or-British → s.1(3)) is legally correct.
> 9. **s.1(4) framing.** Q5 covers "lived in UK most of your life since birth" for the s.1(4) 10-year-residence route. Confirm the 10-year threshold framing is right for user-facing copy and the routing logic (Q1=UK + Q3=non-British + Q4=no-ILR + Q5=10+ years → s.1(4)) is correct.
> 10. **s.4A / s.4B / s.4D references.** Currently citing British Nationality Act 1981, s.4A / s.4B / s.4D. Confirm these are the current in-force numbers and NABA 2022 didn't renumber them.
> 11. **s.4L NABA 2022 framing.** v0.2 routes s.4L cases via the Windrush triage OR "Complex — call needed". Confirm this is the safer approach for v1 given the discretion involved.
> 12. **Legal disclaimer banner copy.** The exact wording is in the spec ("This checker gives general information only, not legal advice. No solicitor-client relationship is created until we accept your instructions in writing. Abrahams Solicitors is authorised and regulated by the SRA #809071..."). Confirm this satisfies your Principle 2 / 7 / Code para 8.6 view.
> 13. **References section at page bottom.** Currently citing: British Nationality Act 1981 (legislation.gov.uk), NABA 2022, Home Office nationality policy guidance. Anything essential missing from that list?
>
> Once the truth table is signed and the 13 items above are answered, build is ~6 hours (spec was 4hr in v0.1; +2hr for the static route-explainer content + schema wiring the council mandated). I'd aim to have it live within a week of your sign-off. Standalone page at `/british-citizenship-registration-checker/` with descriptive cross-links to `/citizenship-wizard/`.
>
> Anything in here you'd like to talk through on a call rather than mark up, let me know — happy to set up 30 minutes.
>
> Best,
> Mohammed

---

## Google Doc body (if going the link route instead of attachment)

Open https://docs.google.com → blank doc → paste the full spec from `docs/citizenship-checker-spec-v0.2.md`. The `[REDLINE]` / `[VERIFY]` tags will be visible inline for Imran to comment on with Google Docs' suggestion mode.

**Sharing recipe for the Google Doc:**
1. Click Share (top right)
2. General access → "Anyone with the link → Commenter"
3. Copy link
4. Paste link into the email above (replace "Spec is attached" with "Here's the spec doc: [link]")

**Also attach the council report** as a second link/attachment (`docs/citizenship-checker-council-report-2026-07-09.html`) — it's the visual summary of why the 10 changes exist, so Imran can see the reasoning without reading the transcript.

**Why Google Doc over attachment:** Imran can highlight specific sentences and comment without re-attaching files. Better trail for back-and-forth. Worth the 60-second setup — and for a routing truth table, comment threads on specific rows will be much easier than "in the third bullet under s.4L…".

---

## After Imran replies

- Apply his redlines to `docs/citizenship-checker-spec-v0.2.md` — commit as "Phase 4 spec v1.0 — Imran sign-off"
- Attach signed routing truth-table spreadsheet in the same commit
- Build phase: ~6 hours (fork `ilr-wizard` config → `citizenship-registration-checker` config; implement 8Q + 6-route decision logic per signed truth table; write static passage-level HTML for each route with H2 statute headings; wire Person + LegalService + FAQPage + HowTo schema; add author byline block; add quarterly review date field)
- GTM: use same wizard event taxonomy as Phase 1–3; add custom dimension `wizard_route` so we can measure route distribution and Windrush-triage rate
- Service tag in SalesHub: `[Wizard] Citizenship Registration` (distinguishes from `[Wizard] UK Citizenship` — the naturalisation wizard)

## Attachments to include with the email

1. `docs/citizenship-checker-spec-v0.2.md` (or Google Doc link)
2. `docs/citizenship-checker-council-report-2026-07-09.html` — the visual council report (so Imran sees the 6-advisor reasoning at a glance)
3. **Routing truth-table spreadsheet** — I'll generate the Q1-Q8 combinations as a CSV/xlsx before sending, one row per input tuple → route. This is the deliverable that gates the build.
