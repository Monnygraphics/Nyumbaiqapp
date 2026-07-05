# NyumbaIQ Showcase, Photo Sourcing Order

This is a one page site (`index.html`) built for a startup competition showcase. It works right now with rendered CSS/SVG art in three places. Your job is to replace those three placeholders with real photographs, nothing else. Do not redesign, do not restyle, do not touch copy.

## Why this order exists

The environment that built this site has no network access to any image CDN (Unsplash, Pexels, anything), so every "photo" moment was hand built in CSS/SVG instead of using a real image. That work is solid and the site fully functions without you changing anything. But real photography will land harder for a live pitch. If you have working internet access, use it to find and download three real images and drop them into the three slots below. If any single photo can't be sourced, leave that slot alone. It already has a working fallback (explained below), so a missing photo never breaks the page.

## What NOT to touch

- Do not change any CSS, layout, type, color, or copy.
- Do not remove the `<svg class="scene-fallback">` blocks. They are the safety net if a photo fails to load or doesn't exist yet.
- Do not rename `index.html` or move it out of the project root.
- Do not add a build step, framework, or bundler. This ships as flat files, open `index.html` directly in a browser.
- Do not touch the pricing, ledger, stats, or team sections. Those are finished.

## The three photo slots

Each slot is an `<img class="scene-photo">` tag immediately followed by an `<svg class="scene-fallback">`. The image has an `onerror` handler already wired: if the file at its `src` path is missing or fails to load, it hides itself and reveals the SVG art automatically. You do not need to write or touch any code, only add image files at the exact paths below.

All three images must go in `assets/images/` with these exact filenames:

### Scene 1: `assets/images/scene-01-gate.jpg`
**Search for:** a residential estate gate or compound entrance in Nairobi, at dusk or early evening.
**Mood:** slightly lonely, a little uncertain. Someone about to enter somewhere unfamiliar.
**Composition:** wide shot, gate or wall filling much of the frame, warm light from a window or streetlamp somewhere in frame, room at the bottom third for a person's silhouette if one is naturally in the shot (not required).
**Avoid:** bright cheerful daytime shots, anything with a visible logo, sign, or identifiable business name, anything showing a real person's face close up (privacy, and we don't have a model release).
**Minimum size:** 1600px wide.
**Good search terms:** "Nairobi estate gate evening", "Kenya residential compound dusk", "African apartment entrance gate"

### Scene 2: `assets/images/scene-02-verification.jpg`
**Search for:** hands reviewing a printed document or ID next to a phone showing a mobile money or messaging screen. This represents the moment of checking someone's identity before paying them.
**Mood:** careful, deliberate, procedural. Not stressed, just methodical.
**Composition:** close or medium shot, hands and paper and phone all visible, warm indoor lighting.
**Avoid:** stock photo cliches like a handshake or a magnifying glass over paper, anything with visible real names, ID numbers, or account details (must be genuinely blank or illegible documents), anything branded to a specific real bank or telecom (M-Pesa's own branding is fine to reference in copy but avoid a photo with visible trademarked logos).
**Minimum size:** 1600px wide.
**Good search terms:** "reviewing documents phone hand", "checking ID paperwork close up", "mobile payment verification hands"

### Scene 3: `assets/images/scene-03-renter.jpg`
**Search for:** a young adult standing outside an apartment building in the evening, looking at their phone or at the building itself. Represents a renter mid search.
**Mood:** thoughtful, a little tired, hopeful. The person searching, not the person who's already found a home.
**Composition:** the person can be a silhouette or shot from behind or the side, apartment block with a few lit windows in the background, evening light.
**Avoid:** posed, overly polished stock photography, someone smiling directly at camera (too commercial, breaks the honest tone), anything showing a specific real, identifiable building with visible signage.
**Minimum size:** 1600px wide.
**Good search terms:** "renter looking at apartment evening", "young person outside apartment building dusk", "house hunting Kenya"

## Licensing requirement

Only use images that are explicitly licensed for commercial use with no attribution required, or images you have direct rights to (your own phone photos are ideal and preferred over any stock source). Do not use anything scraped from a listings site like Property24, BuyRentKenya, or Jiji, since those are competitors and the photos are not yours to use. If you have real photos from an actual Nairobi estate taken by a team member, those are better than any stock photo and should be used instead of searching for stock images at all.

## After adding the photos

1. Confirm each file is under 2MB (compress if needed, quality 80 to 85 is plenty for a web JPG).
2. Open `index.html` directly in a browser and scroll through the whole page once, top to bottom, to confirm all three photos load and look right at both a laptop width and a narrow phone width.
3. If a photo looks washed out or the caption text over it is hard to read, that's expected and fine. There is a dark gradient overlay built into every scene specifically so light-colored photos still keep the caption text readable. Do not remove or lighten that overlay to "fix" a photo that looks slightly dark, it is intentional.

## Deliverable

Zip the whole `nyumbaiq-site/` folder (`index.html` plus `assets/images/` with whatever photos you sourced) and that's the complete, final showcase file. No `.py`, no build tooling, and no Google Form are needed for this specific deliverable, this is a static single HTML file with no server component and no form backend. If a waitlist form becomes a separate requirement later, that's a distinct piece of work from this photo sourcing task and should be scoped separately.
