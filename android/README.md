# BrewPlan Android release

This directory contains the Android Trusted Web Activity (TWA) configuration for the existing BrewPlan PWA.

- Web app: https://brewplan.vercel.app
- Web manifest: https://brewplan.vercel.app/manifest.webmanifest
- Android application ID: `com.brewplan.nust`
- Initial version: `1.0.0 (1)`
- Target SDK: Bubblewrap's generated Android project currently targets API 36. Re-check the Play Console target API policy before every release.

## Build the Android App Bundle

Use Node.js 18+, Android SDK, and Java 17 or the JDK version required by the current Bubblewrap release.

1. Install Bubblewrap: `npm install -g @bubblewrap/cli`.
2. From this directory run: `bubblewrap update --manifest=./twa-manifest.json`.
3. Generate a signing key on a secure machine: `keytool -genkeypair -v -keystore android.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000`. Keep the keystore and passwords private and backed up. Never commit them to GitHub.
4. Set the signing key path in `twa-manifest.json` to the secure local keystore path, then run `bubblewrap build --manifest=./twa-manifest.json`. Bubblewrap creates the Android project and signed APK/AAB artifacts in its output.
5. Retrieve the SHA-256 certificate fingerprint for the signing certificate used by the installed app. If Play App Signing is enabled, use the **App signing key certificate** fingerprint shown in Play Console (not merely the upload-key fingerprint).
6. Publish a Digital Asset Links file at `https://brewplan.vercel.app/.well-known/assetlinks.json` with the package name and the correct SHA-256 fingerprint. Do not publish a placeholder fingerprint. Verify the relationship with Google's Digital Asset Links tooling.
7. Test on real Android devices, including login, email verification, menu browsing, cart, order placement, order history, back navigation, offline/poor-network handling and account deletion before submission.
8. Upload the signed `.aab` in Play Console, complete the store listing, app access, Data safety, content rating, privacy policy and testing declarations, then submit to the appropriate testing track.

## Release blockers / owner actions

- A Google Play Console developer account is required. Google currently lists a one-time US$25 registration fee and identity/contact verification.
- New personal developer accounts created after 13 November 2023 must complete a closed test with at least 12 opted-in testers continuously for 14 days before applying for production access.
- Play Console owner must complete identity verification, declarations, signing setup, and final submission.
- The current app's account creation, email verification, role activation, staff onboarding and real order flow must be tested end-to-end before public release.
- The application ID is a proposed identifier; check it is available in Play Console before creating the app. Once published, the package name cannot be changed for that listing.

## Cross-platform distribution

The same PWA is the shared web app for supported browsers on Windows, macOS, Linux and ChromeOS, and can be added to the iOS/iPadOS home screen through Safari. This is not a native binary for every OS. A separate iOS App Store submission requires a native iOS wrapper and must satisfy Apple's minimum-functionality and account-deletion requirements.
