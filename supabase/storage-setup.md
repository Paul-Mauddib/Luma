# Storage setup — PART 2 of 2 (dashboard UI)

The SQL editor can't create storage policies, so this part is clicks, not SQL. Takes ~2 minutes.

## 1. Create the bucket

Storage → New bucket
- Name: `documents` — must exactly match `DOCUMENTS_BUCKET` in `lib/supabaseClient.ts` (bucket IDs are case-sensitive)
- Public bucket: **OFF** (must stay private)

## 2. Add the access policy

Storage → the `documents` bucket → Policies → New policy → **For full customization**.

One policy covering all three operations is fine (or three separate ones — equivalent):
- Policy name: `own folder access`
- Allowed operations: SELECT + INSERT + DELETE (UPDATE not needed)
- Target roles: `authenticated`
- Policy definition — restricts every user to a folder named after their own user ID:

```
(bucket_id = 'documents') AND ((storage.foldername(name))[1] = (auth.uid())::text)
```

## 3. Verify

Sign in to the app, upload a file, and confirm in Storage that it landed under a folder named with your user ID. A second account must not be able to see it.
