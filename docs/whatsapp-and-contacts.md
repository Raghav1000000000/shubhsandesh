# WhatsApp and contacts

## Getting contacts

WhatsApp does not let any other app read its contact list. WhatsApp itself uses the **phone's contact book**, so ShubhSandesh reads that, with permission.

| Way | How it works | Notes |
|---|---|---|
| **Android app** (recommended first) | One "Allow contacts" permission, then the user ticks who gets greetings | Most target users are on Android |
| **iPhone app** | Same, with Apple's permission popup | |
| **Web on Android Chrome** | Contact Picker API: "Pick contacts", multi-select | No install, but clumsier |
| **Web on iPhone** | Cannot read contacts | Typing or upload only |
| **Backups** | Excel / CSV upload, Google Contacts import, add one by one | CAs often have client lists in Excel |

Limits:

- There is no way to know in advance which numbers are on WhatsApp. A number that is not shows "This number isn't on WhatsApp", and the user taps Skip.
- Store **only the contacts the user selects**, never the whole phone book. This keeps trust and matches the DPDP Act.

## Sending: one tap per person

### Text (works everywhere)

```
https://wa.me/919876543210?text=Sharma%20ji%2C%20Happy%20Diwali...
```

WhatsApp opens **that person's chat with the message already typed**. The user taps Send and comes back; the app shows the next person. About 2 taps and 4 to 5 seconds per person.

### With the greeting picture

| Method | Platforms | Taps | Notes |
|---|---|---|---|
| Android share intent to a specific chat (`com.whatsapp` + `jid` extra) | Android app | 2 | Picture and text land in the right chat. Widely used but unofficial; may break |
| Share sheet (native or Web Share API with a file) | Everywhere | about 4 | Pick WhatsApp, then pick the person |
| Text with a link to the picture | Everywhere | 2 | WhatsApp shows the picture as a preview card |

### Knowing it was sent

WhatsApp never tells another app whether Send was pressed. The prototype asks **"Did it go? Yes / Skip"** when the user returns; a lighter option is to assume sent and move on.

### Safety

Sending by hand, from the user's own phone, to people they know is normal WhatsApp use. **No unofficial automation** of personal WhatsApp: it risks the user's number being banned.

## Fully automatic sending (later)

Only possible through the **WhatsApp Business Platform (API)**:

- needs a business number (a new one, or the WhatsApp Business app number through coexistence)
- needs a Meta business account and approved message templates
- costs roughly under ₹1 per marketing message in India

Planned as a paid add-on for users who want zero taps.

## Recommended build order

1. **Android app** (wrap the same screens with Capacitor): contacts permission, picture straight into each chat, real festival-morning notification.
2. **iPhone app**: same screens, share sheet for the picture.
3. **Web**: kept as a backup and for the demo.
