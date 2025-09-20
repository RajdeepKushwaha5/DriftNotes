# 🌊 DriftNotes — Virtual Beach Message Experience

> *Cast your thoughts into the digital tide... anonymously.*

DriftNotes is a serene, immersive 3D beach environment where users anonymously share messages inside virtual glass bottles that float gently across a shimmering ocean. Built with modern web technologies, it’s not just an app — it’s an *experience*.

Created with ❤️ by [Rajdeep Singh](https://github.com/RajdeepKushwaha5) (2025).

---

## 🌟 Features

- 🏖️ **Immersive 3D Beach** — Powered by Three.js with realistic water shaders and ambient lighting.
- 🍾 **Floating Message Bottles** — Click any bottle to read anonymous messages from around the world.
- 📲 **Real-Time Updates** — New messages appear instantly for all users.
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile.
- 💎 **Glass Bottle Effects** — Dynamic reflections, refractions, and lighting for lifelike visuals.
- 🎨 **Smooth Animations** — Powered by Framer Motion for delightful UI transitions.
- 🔐 **Anonymous & Safe** — No user accounts. Just pure, ephemeral expression.

---

## 🛠️ Tech Stack

| Category          | Technologies Used                          |
|-------------------|--------------------------------------------|
| Frontend          | React + TypeScript + Vite                  |
| 3D Engine         | Three.js + `@react-three/fiber` + `@react-three/drei` |
| State Management  | Zustand                                    |
| Styling           | Tailwind CSS                               |
| Animations        | Framer Motion                              |
| Backend / DB      | Firebase Firestore                         |
| Deployment        | Firebase Hosting + GitHub Actions          |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- A Firebase Project (see [Firebase Setup](#🔧-firebase-setup))

### Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/RajdeepKushwaha5/DriftNotes.git
   cd DriftNotes
profile
Qwen3-Max-Preview
2:09 am
Certainly! Here's your README rewritten in a well-structured, professional, and engaging format using clean Markdown. It’s optimized for readability, contribution appeal, and clarity — perfect for showcasing your project to users, collaborators, or potential employers.

markdown


1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
⌄
⌄
⌄
⌄
⌄
⌄
⌄
⌄
⌄
# 🌊 DriftNotes — Virtual Beach Message Experience

> *Cast your thoughts into the digital tide... anonymously.*

DriftNotes is a serene, immersive 3D beach environment where users anonymously share messages inside virtual glass bottles that float gently across a shimmering ocean. Built with modern web technologies, it’s not just an app — it’s an *experience*.

Created with ❤️ by [Rajdeep Singh](https://github.com/RajdeepKushwaha5) (2025).

---

## 🌟 Features

- 🏖️ **Immersive 3D Beach** — Powered by Three.js with realistic water shaders and ambient lighting.
- 🍾 **Floating Message Bottles** — Click any bottle to read anonymous messages from around the world.
- 📲 **Real-Time Updates** — New messages appear instantly for all users.
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile.
- 💎 **Glass Bottle Effects** — Dynamic reflections, refractions, and lighting for lifelike visuals.
- 🎨 **Smooth Animations** — Powered by Framer Motion for delightful UI transitions.
- 🔐 **Anonymous & Safe** — No user accounts. Just pure, ephemeral expression.

---

## 🛠️ Tech Stack

| Category          | Technologies Used                          |
|-------------------|--------------------------------------------|
| Frontend          | React + TypeScript + Vite                  |
| 3D Engine         | Three.js + `@react-three/fiber` + `@react-three/drei` |
| State Management  | Zustand                                    |
| Styling           | Tailwind CSS                               |
| Animations        | Framer Motion                              |
| Backend / DB      | Firebase Firestore                         |
| Deployment        | Firebase Hosting + GitHub Actions          |

---

# ✅Setup & Deployment

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- **Node.js** (v18+)
- **npm** (v9+)
- **A Firebase Project** (see [Firebase Setup](#-firebase-setup))

---

### Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/RajdeepKushwaha5/DriftNotes.git
   cd DriftNotes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database (choose test mode for development)
   - Copy your Firebase config (`apiKey`, `authDomain`, `projectId`, etc.)
   - Paste it into `src/services/firebaseService.ts`

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open your browser at → [http://localhost:5173](http://localhost:5173)

---

## 🔧 Firebase Setup

1. Go to Firebase Console → Create a new project

2. Enable Firestore:
   ```
   Build → Firestore Database → Create Database → Start in Test Mode
   ```

3. Apply Security Rules (optional for production):
   - Use rules from `firestore.rules` in your Firestore Rules editor

4. Get Config:
   ```
   Project Settings → Your Apps → Web App → Firebase SDK snippet → Config
   ```
   Paste config into `src/services/firebaseService.ts` as shown:
   ```ts
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     // ... etc
   };
   ```

---

## 🚀 Deployment (via GitHub Actions)

This project is pre-configured for automatic deployment to Firebase Hosting when you push to the main branch.

### Setup Steps

1. In your Firebase project, initialize hosting:
   ```bash
   firebase init hosting
   ```
   (Follow prompts — you only need to do this once locally to generate `firebase.json`)

2. In your GitHub repo → Settings → Secrets and variables → Actions, add:
   - `FIREBASE_SERVICE_ACCOUNT` → Your Firebase service account JSON (minified, single line)
   - `FIREBASE_PROJECT_ID` → Your Firebase project ID

   **How to get service account?**
   - Firebase Console → Project Settings → Service Accounts
   - Generate new private key → Download JSON
   - Minify it (remove whitespace) → Paste as GitHub secret

3. Ensure `.github/workflows/deploy.yml` has the correct `projectId`

4. Push to `main` → Deployment will trigger automatically! 🚀


---

### ✅ **Contributing, License & Acknowledgments**

```markdown
---

## 🤝 Contributing

While DriftNotes is a personal passion project, **your ideas, feedback, and contributions are warmly welcomed!**

✅ How to contribute:
- Open an [Issue](https://github.com/RajdeepKushwaha5/DriftNotes/issues) for bugs or feature requests.
- Fork the repo → Make changes → Submit a [Pull Request](https://github.com/RajdeepKushwaha5/DriftNotes/pulls).

Let’s make the digital ocean a little more magical, together 🐚

---

## 📜 License

MIT License — Feel free to use, modify, and learn from this project.

---

## 🙏 Acknowledgments

Huge thanks to:
- The **Three.js** community for powerful, open 3D tools.
- **React Three Fiber** team for making 3D in React a joy.
- **Firebase** for seamless real-time backend.
- **Tailwind CSS** & **Framer Motion** for beautiful, performant UI.

---

> 🌅 *“The sea, once it casts its spell, holds one in its net of wonder forever.”*  
> — Jacques Yves Cousteau (adapted for digital drifters ✨)
