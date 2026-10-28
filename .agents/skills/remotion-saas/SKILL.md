---
name: remotion-saas
description: Arsitektur aplikasi berbasis Remotion. Panduan lokal MotionGraphic Studio; refresh melalui installer Remotion.
---

# MotionGraphic Studio local adapter: remotion-saas

For product or SaaS extensions, separate video templates, safe user-provided props, rendering jobs and storage.
- This user's Master is a local folder-first app. Do not turn it into a cloud SaaS when the user only asks for a new video.
- Keep render data and preview data consistent. Avoid modifying existing editor persistence or registration flow.
- Treat uploaded assets and user input as untrusted. Use explicit validation, permissions and safe file paths.
- Any hosted rendering, licensing or paid features require an explicit user request and separate technical review.
