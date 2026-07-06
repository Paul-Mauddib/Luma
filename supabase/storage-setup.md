# Storage setup — PART 2 of 2 (dashboard UI)

The SQL editor can't create storage policies, so this part is clicks, not SQL. Takes ~2 minutes.

## 1. Create the bucket

Storage → New bucket
- Name: `documents`
- Public bucket: **OFF** (must stay private)

## 2. Add three policies

Storage → the `documents` bucket → Policies → New policy → **For full customization**.

Create each of these. All three target role `authenticated` and use the same definition, which restricts every user to a folder named after their own user ID:

```
(bucket_id = 'documents') AND ((storage.foldername(name))[1] = (auth.uid())::text)
```

| Policy name       | Allowed operation |
|-------------------|-------------------|
| own folder read   | SELECT            |
| own folder write  | INSERT            |
| own folder delete | DELETE            |

For INSERT the dialog shows a "WITH CHECK" box instead of "USING" — paste the same expression there.

## 3. Verify

Sign in to the app, upload a file, and confirm in Storage that it landed under a folder named with your user ID. A second account must not be able to see it.
