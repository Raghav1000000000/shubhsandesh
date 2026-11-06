# Product brief

## Who it is for

Small business owners and professionals in Indian towns and cities who greet their clients on every festival:

- Chartered accountants and tax consultants
- Lawyers
- Insurance agents
- Doctors and clinics
- Shop owners
- Salons and boutiques

They use WhatsApp every day but are **not comfortable with technology**. Many depend on their children to make a festival post.

## Principles

1. **Simple beats powerful.** Big buttons, few choices, plain words. Hindi where it helps.
2. **Ready before you are.** The greeting is already made when the reminder arrives.
3. **Your WhatsApp, your control.** Messages go from the user's own number, and nothing is sent without their tap.
4. **No surprise setup.** No WhatsApp Business account, no Meta verification and no templates needed to start.

## User journey

```mermaid
flowchart LR
  A[Reminder<br>2 days before] --> B[Pick design<br>name + logo added]
  B --> C[Pick message<br>EN / हिंदी / Hinglish / AI]
  C --> D[Tick people<br>by group]
  D --> E{When?}
  E -->|Festival morning| F[Reminder at chosen time]
  E -->|Now| G[Send one by one]
  F --> G
  G --> H[Done<br>skipped list to retry]
```

## Screens in the prototype

| Screen | Purpose |
|---|---|
| Home | Next festival with countdown, status of the greeting, coming festivals |
| Design | Live post preview with the business details, 4 colour designs, AI design (AI plan) |
| Message | 3 ready messages per language, AI writer with tones, edit box, "start with their name", WhatsApp preview |
| People | Count of selected people, search, groups, tick and untick |
| When | Festival morning reminder with time, or send now; final check |
| Send | One person at a time, Send on WhatsApp, Did it go? Yes / Skip, progress |
| Done | Count sent, skipped list with retry |
| Contacts | List by group, add contact, import from phone (planned) |
| My business | Name, firm, town, phone, logo letters, profession, plans |

## Decisions so far

- **Sending:** assisted one-by-one sending through WhatsApp click-to-chat now; automatic sending through the WhatsApp Business API later as a paid add-on.
- **Pricing:** Regular ₹999/year, AI ₹1,999/year, GST included.
- **Name:** ShubhSandesh is a working name.

## Open questions

- Greeting picture: link preview (2 taps) or picture via share sheet (about 4 taps) as the default?
- Typical number of contacts per user (the pamphlet asks real customers).
- Android app first, or web first?
