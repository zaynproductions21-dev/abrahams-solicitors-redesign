# Wizard Analytics — GTM + GA4 Setup Guide

Setup guide for the marketing team. Once these GTM variables, triggers, tags, and GA4 reports are configured, you can answer four questions about every wizard on the site:

1. **Funnel:** how many visitors start → answer Q1 → answer Q2 → see result → open email capture → submit
2. **Placement comparison:** standalone vs Pattern A embed vs Pattern B card vs which page they live on
3. **Route popularity:** which routing outcomes most visitors land on
4. **Drop-off analysis:** at which question step visitors abandon

The events fire on every wizard / qualifier on the v6 site:

| Wizard | Source tag |
|---|---|
| UK Visa Wizard (standalone, `/visa-wizard/`) | `visa-wizard-standalone` |
| UK Visa Wizard (embedded on `/uk-spouse-visa/`) | `visa-wizard-embed:uk-spouse-visa` |
| UK Visa Wizard (embedded on `/uk-spouse-visa-solicitors/`) | `visa-wizard-embed:uk-spouse-visa-solicitors` |
| Housing Disrepair qualifier | `housing-qualifier` |
| Personal Injury qualifier | `pi-qualifier` |
| UK Dependent Child Visa qualifier | `uk-dependent-child-visa-qualifier` |
| UK Adult Dependent Relative qualifier | `uk-dependent-parent-visa-qualifier` |

---

## 1. Canonical event taxonomy

Every wizard fires the same shape of dataLayer events:

```javascript
// Fires once on widget mount
dataLayer.push({
  event: "wizard_start",
  source: "<source-tag>"
});

// Fires on each "Continue" click
dataLayer.push({
  event: "wizard_question_answered",
  source: "<source-tag>",
  question_id: "<question-identifier>",
  question_step: 1, // 1-indexed
  question_total: 3,
  answer: "<the-selected-option-value>"
});

// Fires when result / strength card is rendered
dataLayer.push({
  event: "wizard_result_shown",
  source: "<source-tag>",
  route_id: "<outcome-id>",         // e.g. "standard-spouse-visa", "criteria-met"
  route_name: "<plain-english>",     // e.g. "Spouse / Partner Visa (entry clearance)"
  tone: "positive" | "mixed" | "needs-review"  // visa wizard only
});

// Fires when "Email me the result" is clicked (visa wizard only —
// other qualifiers ask for email up-front)
dataLayer.push({
  event: "wizard_email_capture_opened",
  source: "<source-tag>",
  route_id: "<outcome-id>"
});

// Fires when the actual email submission completes — handled by
// existing tracking.ts pushFormSubmit()
dataLayer.push({
  event: "ec_form_submit",
  user_data: { email: "...", phone_number: "+44..." },
  gclid: "...",
  msclkid: "...",
  traffic_source: "google" | "bing" | "direct"
});

// Fires when the Pattern B entry card is clicked (links to /visa-wizard/)
dataLayer.push({
  event: "wizard_entry_card_clicked",
  surface: "<source-page>"  // e.g. "immigration", "uk-fiance-visa"
});
```

---

## 2. GTM setup — Variables to create

In **Tag Manager → Variables → New (User-Defined)**:

| Variable name | Type | Configuration |
|---|---|---|
| `wizard - source` | Data Layer Variable | Variable Name: `source`, Version: 2 |
| `wizard - route_id` | Data Layer Variable | Variable Name: `route_id`, Version: 2 |
| `wizard - route_name` | Data Layer Variable | Variable Name: `route_name`, Version: 2 |
| `wizard - tone` | Data Layer Variable | Variable Name: `tone`, Version: 2 |
| `wizard - question_id` | Data Layer Variable | Variable Name: `question_id`, Version: 2 |
| `wizard - question_step` | Data Layer Variable | Variable Name: `question_step`, Version: 2 |
| `wizard - question_total` | Data Layer Variable | Variable Name: `question_total`, Version: 2 |
| `wizard - answer` | Data Layer Variable | Variable Name: `answer`, Version: 2 |
| `wizard - surface` | Data Layer Variable | Variable Name: `surface`, Version: 2 |

---

## 3. GTM setup — Triggers to create

In **Tag Manager → Triggers → New**:

| Trigger name | Type | Configuration |
|---|---|---|
| `Wizard — Start` | Custom Event | Event name: `wizard_start` |
| `Wizard — Question Answered` | Custom Event | Event name: `wizard_question_answered` |
| `Wizard — Result Shown` | Custom Event | Event name: `wizard_result_shown` |
| `Wizard — Email Capture Opened` | Custom Event | Event name: `wizard_email_capture_opened` |
| `Wizard — Entry Card Clicked` | Custom Event | Event name: `wizard_entry_card_clicked` |

Existing trigger for `ec_form_submit` already fires Google Ads Enhanced Conversions and Bing Ads conversion tags. No change needed there.

---

## 4. GTM setup — GA4 event tags

In **Tag Manager → Tags → New** (one tag per wizard event):

### Tag: `GA4 — Wizard Start`
- Tag Type: Google Analytics: GA4 Event
- Configuration Tag: your existing GA4 config tag
- Event Name: `wizard_start`
- Event Parameters:
  - `source` → `{{wizard - source}}`
- Trigger: `Wizard — Start`

### Tag: `GA4 — Wizard Question Answered`
- Event Name: `wizard_question_answered`
- Event Parameters:
  - `source` → `{{wizard - source}}`
  - `question_id` → `{{wizard - question_id}}`
  - `question_step` → `{{wizard - question_step}}`
  - `question_total` → `{{wizard - question_total}}`
  - `answer` → `{{wizard - answer}}`
- Trigger: `Wizard — Question Answered`

### Tag: `GA4 — Wizard Result Shown`
- Event Name: `wizard_result_shown`
- Event Parameters:
  - `source` → `{{wizard - source}}`
  - `route_id` → `{{wizard - route_id}}`
  - `route_name` → `{{wizard - route_name}}`
  - `tone` → `{{wizard - tone}}`
- Trigger: `Wizard — Result Shown`

### Tag: `GA4 — Wizard Email Capture Opened`
- Event Name: `wizard_email_capture_opened`
- Event Parameters:
  - `source` → `{{wizard - source}}`
  - `route_id` → `{{wizard - route_id}}`
- Trigger: `Wizard — Email Capture Opened`

### Tag: `GA4 — Wizard Entry Card Clicked`
- Event Name: `wizard_entry_card_clicked`
- Event Parameters:
  - `surface` → `{{wizard - surface}}`
- Trigger: `Wizard — Entry Card Clicked`

After creating, click **Submit** to publish the GTM container. Allow ~5 minutes for the new events to appear in GA4.

---

## 5. GA4 — Mark events as conversions (optional but useful)

In **GA4 → Admin → Events**, mark these as conversions if you want them in the Conversions report:

- `wizard_email_capture_opened` — strong intent signal (clicked the button to provide an email)
- `ec_form_submit` — already a conversion (the actual lead)

`wizard_start`, `wizard_question_answered`, `wizard_result_shown` are **not** conversions — they're funnel-step measurements.

---

## 6. The four reports

### Report 1 — Wizard Funnel

In **GA4 → Explore → Funnel exploration** create:

- **Step 1**: `wizard_start`
- **Step 2**: `wizard_question_answered` where `question_step` = 1
- **Step 3**: `wizard_question_answered` where `question_step` = 2
- **Step 4**: `wizard_question_answered` where `question_step` = 3
- **Step 5**: `wizard_result_shown`
- **Step 6**: `wizard_email_capture_opened`
- **Step 7**: `ec_form_submit`

Optional **Breakdown** dimension: `source` — splits the funnel by wizard / placement.

This is the headline funnel for every wizard on the site.

### Report 2 — Placement Comparison

In **GA4 → Explore → Free form**:

- **Rows**: `source` (Custom dimension)
- **Columns**: `event_name`
- **Values**: `Event count`, `Total users`

Filter to events: `wizard_start`, `wizard_result_shown`, `wizard_email_capture_opened`, `ec_form_submit`.

Reads as a matrix of "for each wizard placement, how many visitors hit each milestone."

### Report 3 — Route Popularity

In **GA4 → Explore → Free form**:

- **Rows**: `route_id` + `route_name`
- **Columns**: `source`
- **Values**: `Event count`

Filter to event: `wizard_result_shown`.

Reads as: "for each wizard, which routing outcomes are most common." Use this to spot:
- Routes that bring lots of visitors but few email captures (poor conversion offers)
- Routes that no one ever hits (consider removing from the wizard)
- Routes that bring few visitors but high conversion (the firm's sweet spot — invest in those topics)

### Report 4 — Drop-Off Analysis

In **GA4 → Explore → Free form**:

- **Rows**: `question_step` + `question_id`
- **Columns**: `source`
- **Values**: `Event count`

Filter to event: `wizard_question_answered`.

Compare the count at each step to the next. Big drop between step 2 and step 3? That's where visitors are abandoning. Common causes:
- Question too long / confusing
- Sensitive question (e.g., financial information)
- Too many options / decision paralysis

---

## 7. Looker Studio (optional — easier ongoing reporting)

For weekly / monthly reporting:

1. **Looker Studio → Create → Data source → GA4** — connect your GA4 property
2. Create a dashboard with these visualisations:
   - **Funnel chart**: events from `wizard_start` to `ec_form_submit`, split by `source`
   - **Bar chart**: `wizard_result_shown` count by `route_id`
   - **Time series**: daily count of each wizard event
   - **Score card**: "Wizard-originated leads this week" — `ec_form_submit` count where `source LIKE 'visa-wizard%'`

Save the dashboard, set scheduled email delivery to the marketing inbox.

---

## 8. Google Ads — Enhanced Conversions verification

Wizard email submissions feed Google Ads via the existing `ec_form_submit` event with `user_data.email` and `user_data.phone_number`. Verify in:

- **Google Ads → Tools → Conversions → Conversion details → Diagnostics**
- Look for "Enhanced conversions for leads" — should show "Recording" status
- "Match rate" should be > 50% (typical) once you have data

If match rate is low, check that the email + phone are being sent in the right format (E.164 phone, lowercased trimmed email — already handled by `tracking.ts` server-side).

---

## 9. Filtering wizard-originated leads in SalesHub

In SalesHub Cloud → Leads, the `Source` field on each lead now contains:

```
visa-wizard-standalone:<route-id>
visa-wizard-embed:uk-spouse-visa:<route-id>
visa-wizard-embed:uk-spouse-visa-solicitors:<route-id>
housing-disrepair-qualifier   (existing — unchanged)
personal-injury-qualifier     (existing — unchanged)
uk-dependent-child-visa-qualifier
uk-dependent-parent-visa-qualifier
```

Ask your SalesHub admin to:
1. Surface `Source` as a column in the default lead view
2. Build saved filters: "Wizard leads — last 7 days", "Spouse visa wizard leads", etc
3. Build a saved filter: "Source contains `visa-wizard`" — wizard-originated leads only

This lets your sales team measure which leads come through the wizard vs the regular consultation form.

---

## 10. Quick sanity check (do this once after setup)

1. Open `https://www.abrahamssolicitors.co.uk/visa-wizard/?gtm_debug=1`
2. Click through the wizard
3. In GTM Preview, confirm you see in order:
   - `wizard_start` with `source: visa-wizard-standalone`
   - 6 × `wizard_question_answered` events with incrementing `question_step`
   - `wizard_result_shown` with a `route_id`
4. Click "Email me the result"
5. Confirm `wizard_email_capture_opened` fires
6. Submit the form (use a test email)
7. Confirm `ec_form_submit` fires with `user_data.email` populated

If anything's missing, ping the dev team — easy to diagnose from the GTM debug panel.
