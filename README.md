# SafarSaath — Get Your APK (No Laptop Installs Needed)

This project is now set up to build an installable Android APK entirely in
the cloud using **GitHub Actions**. You don't need Android Studio, Java, or
any SDK on your computer — everything runs on GitHub's servers.

## What's already done for you

- `capacitor.config.json` — tells Capacitor this is an Android-wrapped web app
- `package.json` — updated with the Capacitor packages it needs
- `.github/workflows/build-apk.yml` — the cloud build robot. On every push,
  it automatically: installs dependencies, builds the React app, adds the
  Android project, and compiles a debug `.apk` file for you to download.

## Step-by-step (10–15 minutes, all in your browser)

### 1. Create a free GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an
account already.

### 2. Create a new repository
- Click the **+** icon (top right) → **New repository**
- Name it `SafarSaath` (or anything you like)
- Keep it **Public** (required for free GitHub Actions minutes)
- Click **Create repository**

### 3. Upload this project folder
On the new repo's page:
- Click **uploading an existing file** (or drag-and-drop)
- Drag in *all* the files and folders from this project (including the
  hidden `.github` folder — see note below)
- Commit the upload

> ⚠️ **Important about the `.github` folder**: drag-and-drop uploads on
> GitHub's website sometimes skip folders starting with a dot. If the
> `.github/workflows/build-apk.yml` file doesn't show up after uploading,
> use GitHub's **"Add file" → "Create new file"** button instead, and type
> the path `.github/workflows/build-apk.yml` directly into the filename box
> — GitHub will create the folders for you. Paste in the workflow content.

### 4. Watch it build
- Click the **Actions** tab at the top of your repo
- You should see a workflow run start automatically (triggered by your
  upload). If not, click **Build Android APK** → **Run workflow**.
- Wait roughly 3–6 minutes. A green checkmark means it succeeded.

### 5. Download your APK
- Click on the finished workflow run
- Scroll down to **Artifacts**
- Download **SafarSaath-debug-apk** — this is a `.zip` containing your
  `app-debug.apk`
- Unzip it, transfer `app-debug.apk` to your Android phone (via USB, Google
  Drive, email, etc.), and tap it to install

> Android will warn about installing from an "unknown source" since this
> isn't from the Play Store — that's expected for a debug build. Tap
> **Install anyway**.

## Important things to know about this APK

- **This is a debug build**, meant for testing/demo on your own device. It's
  not signed for the Play Store yet — that's a separate step if you
  eventually want to publish it.
- **The app currently uses mock data.** Rides, messages, and wallet
  transactions are hardcoded sample data, not connected to a real backend.
  The APK will look and feel complete but won't save real data between
  sessions or process real bookings/payments.
- **No real OTP/auth or payment processing** is wired up yet — those would
  need a backend service before this becomes a real product.

## If a build fails

Click into the failed run in the **Actions** tab and open the red step to
read the error — it's almost always a missing file or a typo from the
upload step. Re-uploading the missing file and pushing again will trigger
a fresh build automatically.
