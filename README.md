# FITLOG

> A modern workout library and personal workout planning application built with Next.js.

FitLog helps users discover exercises, explore detailed workout information, create a daily workout plan, save workouts for later, and track completed workouts through a clean and responsive interface.

## Tech Stack

- **Next.js** — App Router & Server Components
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive UI styling
- **DaisyUI** — UI components and theme support
- **React Hot Toast** — User feedback and notifications
- **Next/Image** — Optimized image rendering
- **REST API** — Workout data
- **LocalStorage** — Client-side workout plan and saved workout management

## Key Features

### Workout Library
Browse available workouts with essential information including muscle groups, equipment, duration, calories, difficulty, and rating.

### Workout Details
View complete exercise information with descriptions, workout statistics, and step-by-step instructions.

### Daily Workout Plan
Add exercises to a personalized daily workout plan and manage your selected workouts.

### Save for Later
Save workouts for quick access and organize exercises you want to revisit.

### Workout Tracking
Mark workouts as completed and keep track of your daily workout progress.

## Project Structure

```text
src/
├── app/
│   ├── Exercise/
│   │   └── [id]/
│   │       └── page.tsx

│   ├── my-plan/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── assets/
│   ├── banner.png
│   └── logo.png
│
├── components/
│   ├── Banner.tsx
│   ├── Exercise.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
│
└── types/
    └── workout.ts





# Set-up Prcedure:

git clone <url>
npm install
npm run dev
Open http://localhost:3000 in your browser.


