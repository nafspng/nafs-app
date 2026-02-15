# Cursor Prompt — Build "Nafs - Islam Made Easy" App

You are building a fully functional mobile-first Next.js web app called **"Nafs - Islam Made Easy"**. This is a Finch-style self-care companion app for Muslims. Users complete daily Islamic actions (prayers, du'as, good manners) and in return care for a cute digital cat companion.

Study every screenshot and inspiration image in this project's files carefully. They show the Finch app's complete UX flow — onboarding, home dashboard, daily task checklist, pet interaction, settings, and profile screens. **You must replicate the exact structural patterns, layout hierarchy, spacing rhythm, component shapes, and interaction model from those screenshots**, but re-themed for Nafs as described below.

---

## GLOBAL THEME — Single Source of Truth

Create a `theme.ts` file. **Every component must reference this theme. Zero hardcoded colors, fonts, spacing, radii, or shadows inside any component.**

```
PALETTE (warm Islamic aesthetic — NO cool blues, NO greens from Finch):
- background:        #FFF8F0  (warm cream)
- backgroundAlt:     #FDF3E7  (light sand)
- surface:           #FFFFFF
- surfaceWarm:       #FFF5E6  (warm card fill — replaces Finch's light green cards)
- primary:           #D4956A  (warm muted terracotta/sandy orange — replaces Finch's green)
- primaryDark:       #B8784F  (darker terracotta for pressed states)
- primaryLight:      #F0D9C4  (light terracotta tint)
- secondary:         #C4A882  (soft tan/camel)
- accent:            #E8B86D  (warm golden amber — replaces Finch's orange/yellow highlights)
- accentLight:       #FDF0D5  (light golden)
- textPrimary:       #3D2C1E  (dark warm brown — replaces Finch's dark charcoal)
- textSecondary:     #8B7355  (muted warm brown — replaces Finch's gray text)
- textOnPrimary:     #FFFFFF
- border:            #E8DDD0  (warm subtle border)
- checkmark:         #7DB87D  (soft sage green — only for completion checkmarks)
- disabled:          #D9CFC3
- disabledText:      #B0A08E

TYPOGRAPHY (rounded, friendly — matches Finch's feel):
- fontFamily:        'Nunito', sans-serif  (import from Google Fonts)
- heading1:          28px / bold / textPrimary
- heading2:          22px / bold / textPrimary
- heading3:          18px / semibold / textPrimary
- body:              16px / regular / textPrimary
- bodySmall:         14px / regular / textSecondary
- caption:           12px / regular / textSecondary
- button:            16px / bold / textOnPrimary

SPACING (matches Finch's generous rhythm):
- xs: 4px  |  sm: 8px  |  md: 16px  |  lg: 24px  |  xl: 32px  |  xxl: 48px

RADII (heavily rounded like Finch):
- small: 12px  |  medium: 16px  |  large: 24px  |  pill: 999px  |  card: 20px

SHADOWS:
- card: 0 2px 8px rgba(61, 44, 30, 0.08)
- elevated: 0 4px 16px rgba(61, 44, 30, 0.12)
- button: 0 4px 12px rgba(212, 149, 106, 0.3)
```

---

## ARCHITECTURE — Strict OOP & Clean Components

Organize the codebase with strict separation:

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx            # Welcome/landing
│   ├── onboarding/         # Multi-step onboarding flow
│   ├── home/               # Main dashboard
│   ├── charity/            # Charity section
│   └── settings/           # Settings page
├── components/
│   ├── ui/                 # Base reusable UI components
│   │   ├── Button.tsx      # Primary, Secondary, Ghost variants
│   │   ├── Card.tsx        # Rounded card with theme shadow
│   │   ├── Checkbox.tsx    # Task completion checkmark
│   │   ├── Input.tsx       # Text input with rounded styling
│   │   ├── ProgressBar.tsx # Horizontal progress bar
│   │   ├── SpeechBubble.tsx # Pet speech bubble (triangle tail)
│   │   ├── SelectionCard.tsx # Option card with selected state + border highlight
│   │   ├── Toggle.tsx      # On/off toggle switch
│   │   └── TabBar.tsx      # Bottom navigation bar
│   ├── cat/                # Cat-related components
│   │   ├── CatAvatar.tsx   # SVG cat in different states
│   │   ├── CatScene.tsx    # Cat with background scene
│   │   └── CatActions.tsx  # Feed/Brush/Play action buttons
│   ├── tasks/              # Task checklist components
│   │   ├── TaskList.tsx    # Daily task checklist (notepad style)
│   │   ├── TaskItem.tsx    # Individual task row
│   │   └── TaskSection.tsx # Section header (Prayers, Du'a, Manners)
│   └── layout/
│       ├── AppShell.tsx    # Main layout wrapper with tab bar
│       └── OnboardingLayout.tsx # Onboarding step layout
├── hooks/
│   ├── useTasks.ts         # Daily tasks state + localStorage persistence
│   ├── useCat.ts           # Cat state management
│   └── useOnboarding.ts   # Onboarding flow state
├── lib/
│   ├── theme.ts            # THE global theme file
│   ├── types.ts            # TypeScript interfaces
│   ├── constants.ts        # Task definitions, du'a content, cat states
│   └── storage.ts          # localStorage helpers
└── assets/                 # Generated SVG illustrations
```

---

## SCREEN-BY-SCREEN SPECIFICATION

### 1. WELCOME / LANDING (replicate IMG_0014 layout exactly)

**Layout:** Centered vertically. Top 60% = illustration + branding. Bottom 40% = CTAs.

- **Top section:** Cute cat illustration (SVG, simple kawaii style — big round head, small body, rosy cheeks, simple eyes, tiny ears — NOT realistic) centered on screen. Below it: "Nafs" in heading1 bold. Below that: "Your daily faith companion." in bodySmall textSecondary.
- **Bottom section:** Two stacked full-width buttons:
  - Primary button: "Meet your cat" → navigates to onboarding
  - Secondary button (surface color, textSecondary): "Continue" → goes to home if returning user (check localStorage)
- **Spacing:** Match Finch's generous vertical spacing — illustration sits in the upper-middle third, buttons are pinned near the bottom with `lg` padding from bottom edge.

### 2. ONBOARDING FLOW (replicate IMG_0015 → IMG_0040 patterns)

Multi-step flow with a **progress bar** at the top (like Finch's green dot stepper). 4 steps:

**Step 1 — Name your cat (replicate IMG_0019/IMG_0021 layout):**
- Cat illustration centered with a **SpeechBubble** above/beside it saying: "Assalamu Alaikum! I'm your new companion. What would you like to name me?"
- Text input below (rounded, full-width, placeholder: "Name your cat...")
- "Next" button at bottom (disabled state until name entered — use `disabled` color)

**Step 2 — Choose cat color (replicate IMG_0015 egg-selection layout):**
- Title: "Choose your cat's look!" + subtitle explaining
- Show 5 cat color options in a circular/scattered arrangement (like Finch's egg circle): cream, ginger orange, gray, black, calico pattern
- Selected cat shows larger in center with subtle highlight ring
- "Next" button at bottom

**Step 3 — What matters to you? (replicate IMG_0038 support-areas layout):**
- Progress bar showing step 3 of 4
- Cat illustration centered
- Question: "What would you like to focus on?"
- Scrollable list of **SelectionCards** (rounded, full-width, emoji + text + plus icon on right like Finch):
  - 🕌 Keep up with daily prayers
  - 📿 Learn daily du'as
  - 🤲 Build good habits & manners
  - 📖 Read more Quran
  - 💝 Give more charity
- Multi-select with checkmark on right when selected (replicate Finch's selection state with `primary` color border)
- "Next" button at bottom

**Step 4 — Starter plan reveal (replicate IMG_0040 exactly):**
- Cat with SpeechBubble: "Bismillah, let's begin!"
- Below: **Notepad-style card** (match Finch's yellow notepad card exactly — `surfaceWarm` background, subtle `accent` top border with small rectangular "binding" tabs along the top edge)
- Card title: "[CatName]'s daily plan"
- Card subtitle: "Start with these daily goals!"
- List of starter tasks with emoji icons, each separated by a subtle divider line:
  - 🕌 Pray Fajr
  - 🪥 Make morning du'a
  - 🤝 Say Salam to family
  - 📿 Say Bismillah before eating
  - 🌙 Pray Isha
- Bottom: Primary button "Let's begin!" → navigates to home

### 3. HOME DASHBOARD (replicate IMG_0053 layout EXACTLY — this is the core screen)

This is the most important screen. Match Finch's home layout precisely:

**Top half — Cat Scene (replaces Finch's forest scene):**
- Illustrated background: warm desert/oasis scene with sand dunes, a palm tree, soft golden sky, subtle clouds — all in the warm palette. Simple, flat illustration style matching Finch's forest aesthetic.
- Cat character centered in the scene, sitting on a soft prayer mat or cushion
- **Hamburger menu icon** top-left (opens settings)
- Background occupies top ~40% of screen

**Middle — Happiness Progress Bar (replaces Finch's "Adventure" bar):**
- Rounded container with `surfaceWarm` background
- Left: small heart/paw icon
- Text: "Happiness" 
- Progress bar showing current happiness level (fraction like "3 / 10")
- Bar fill uses `primary` terracotta color, track uses `primaryLight`

**Below progress bar — Daily goals counter:**
- Left-aligned: calendar icon + "X goals left for today!"
- Right side: filter icon + grid/list toggle icon (non-functional, decorative)

**Task Checklist (replaces Finch's goal list — match each task row exactly):**

Section header "Start the day ∨" with subtle line + "+" add button on right

**Each task row (match IMG_0053 task rows exactly):**
- Left: 3-dot drag handle (decorative) + circular emoji icon in colored circle
- Center: task name in heading3 weight
- Right: happiness points (e.g., "5 ❤️") + green checkmark button (square with rounded corners, uses `checkmark` color when tapped, `disabled` color when unchecked)
- Full-width white card with `card` shadow, `card` border-radius
- Subtle vertical spacing between rows

**Task sections with their tasks:**

**🕌 Prayers:**
- Fajr — 5 ❤️
- Dhuhr — 5 ❤️
- Asr — 5 ❤️
- Maghrib — 5 ❤️
- Isha — 5 ❤️

**📿 Daily Du'a:**
- "Before eating: Bismillah" — 3 ❤️
- "Before sleeping: Allahumma bismika amutu wa ahya" — 3 ❤️

**🤝 Good Manners:**
- Say Salam to family — 2 ❤️
- Say Bismillah before eating — 2 ❤️
- Smile at someone — 2 ❤️

**Behavior when tasks are checked:**
- Checkmark animates to filled green state
- Happiness bar increments
- After checking 3+ tasks: unlock cat care actions (show a subtle slide-up banner: "🐱 [CatName] wants attention! Feed · Brush · Play")
- Cat state in the scene should update reactively (more tasks = happier expression)

**Bottom Tab Bar (replicate Finch's tab bar exactly — IMG_0053):**
- Fixed at bottom
- 3 tabs (simplified from Finch's 6):
  - 🏠 Home (active: `primary` color fill, inactive: `textSecondary`)
  - 🤲 Charity
  - 🐱 [CatName] (shows small cat face icon)
- Active tab has filled icon + label in `primary`, inactive is outline + `textSecondary`
- Tab bar background: `surface` white with top border `border` color

### 4. CAT INTERACTION SCREEN (tab: CatName — replicate IMG_0054/inspo_3 pet profile layout)

**Top section:**
- Cat illustration large and centered with current outfit/state
- Cat name + state label below ("Happy 😊" / "Hungry 🍽️" / "Messy 🧹" / "Calm 😌")

**Cat stats card (replicate Finch's pet profile card — inspo_3):**
- Rounded card, `surfaceWarm` background
- Shows: Days together, Happiness level, Tasks completed today

**Cat Care Actions (3 large rounded buttons in a row):**
- 🍽️ Feed — unlocked after 2 tasks checked
- 🧹 Brush — unlocked after 4 tasks checked  
- 🎾 Play — unlocked after 6 tasks checked
- Locked state: grayed out with lock icon, `disabled` color
- Unlocked state: `primary` color background, white icon
- Tapping an unlocked action: shows a brief fullscreen reaction (cat eating/being brushed/playing — simple illustration swap + SpeechBubble response like "Jazakallah khair! 😻" or "That feels amazing!")

**Cat States (managed in state — each affects the illustration):**
- **Happy:** eyes curved up (^^), slight bounce
- **Hungry:** eyes looking at food bowl, tongue out slightly  
- **Messy:** disheveled fur marks, slightly droopy
- **Calm:** eyes closed peacefully, on prayer mat
- Cat NEVER looks sad or punished. Worst state is "calm/waiting"

### 5. CHARITY SECTION (tab: Charity)

**Layout — match Finch's card-based settings layout (IMG_0054/IMG_0055):**

Single scrollable screen with:

**Hero card at top:**
- `surfaceWarm` background, large `card` radius
- Illustration: cat holding a charity/coin box (simple SVG)
- Title: "Monthly Charity" in heading2
- Subtitle: "The Prophet ﷺ said: 'Charity does not decrease wealth.'" in bodySmall italic

**Commitment card below:**
- "Commit to monthly giving" with Toggle on right
- When toggled on, reveal:
  - Amount input (£ prefix, number input, rounded) with preset chips: £1, £5, £10, Custom
  - Reminder frequency selector: "Monthly reminder" (text only, no real notifications)
- "This is a personal commitment tracker — no payment processing" in caption, textSecondary

**Impact section (static cards in 2-column grid like IMG_0054):**
- 💧 Clean Water
- 📚 Education  
- 🍽️ Feed the Hungry
- 🏥 Medical Aid
- Each card: emoji, label, rounded `surface` background, `card` shadow

### 6. SETTINGS (hamburger menu from home — replicate IMG_0055 layout exactly)

**Grouped settings in cards with section headers (match Finch's settings exactly):**

**REMINDERS section:**
- 🔔 Prayer reminders (Toggle) 
- 🐱 Cat care reminders (Toggle)
- ⏰ Reminder times (decorative — shows "Coming soon")

**PREFERENCES section:**
- 🕌 Prayer calculation method (Select card → shows options)
- 📍 Location for prayer times (text input)

**ABOUT section (replicate Finch's support section):**
- ❓ Help & FAQ (chevron →)
- 📖 About Nafs (chevron →)
- 💌 Send Feedback (chevron →)
- App version at bottom: "Nafs v1.0.0" in caption centered

---

## ASSET GENERATION

Generate ALL illustrations as inline SVGs or React SVG components. Match the Finch illustration style precisely: **simple, flat, kawaii aesthetic — big round shapes, minimal detail, rosy cheeks, simple dot/curve eyes, no outlines on bodies, soft shadows beneath characters.**

**Required SVG assets:**
1. **Cat character** in 5 color variants (cream, ginger, gray, black, calico) × 4 emotional states (happy, hungry, messy, calm) × 3 action states (eating, being brushed, playing) = generate a base cat SVG component with props for color/state/action
2. **Desert/oasis background scene** for home screen (palm trees, soft sand dunes, golden sky)
3. **Cat on prayer mat** for calm state
4. **Cat holding charity box** for charity section
5. **Small cat face icons** for tab bar and task completion rewards
6. **Emoji-style circular icons** for each task category (prayer, du'a, manners)

---

## STATE MANAGEMENT

All state in React hooks + localStorage. No backend. No auth.

```typescript
// Cat state
interface CatState {
  name: string;
  color: 'cream' | 'ginger' | 'gray' | 'black' | 'calico';
  happiness: number; // 0-100
  state: 'happy' | 'hungry' | 'messy' | 'calm';
  fedToday: boolean;
  brushedToday: boolean;
  playedToday: boolean;
  daysActive: number;
}

// Task state  
interface DailyTasks {
  date: string; // ISO date — tasks reset when date changes
  tasks: {
    id: string;
    category: 'prayer' | 'dua' | 'manners';
    label: string;
    emoji: string;
    points: number;
    completed: boolean;
  }[];
}

// Charity state
interface CharityCommitment {
  enabled: boolean;
  amount: number;
  currency: string;
}

// Onboarding state
interface OnboardingState {
  completed: boolean;
  step: number;
  catName: string;
  catColor: string;
  focusAreas: string[];
}
```

**Key behaviors:**
- Tasks reset daily (compare stored date vs current date)
- Cat happiness decreases slightly each new day (never below 20 — "calm" state minimum)
- Completing tasks adds to happiness
- Cat care actions (feed/brush/play) give bonus happiness
- All state persists in localStorage
- First launch → onboarding. Subsequent launches → home

---

## INTERACTION & NAVIGATION

- **Page transitions:** Simple fade/slide transitions between pages (CSS only, no animation libraries)
- **Task checking:** Tap checkmark → fills with `checkmark` green, slight scale bounce (CSS transform), points float up briefly
- **Cat reactions:** When care actions are used, cat illustration swaps state + SpeechBubble appears with encouraging Islamic phrases:
  - Feed: "Jazakallah khair! That was delicious! 😋"
  - Brush: "Alhamdulillah, I feel so clean! ✨"  
  - Play: "SubhanAllah, that was fun! 🎉"
- **Daily reset:** Show a morning greeting when app opens on new day: cat with SpeechBubble "Assalamu Alaikum! Ready for a new day? 🌅"
- **Placeholder reminders:** Settings toggles show/hide a banner on home: "🔔 Reminder: It's time for Dhuhr prayer" (static mock, no real push)

---

## CRITICAL RULES

1. **Mobile-first layout**: Max-width 430px, centered on desktop. Use CSS `min-height: 100dvh`.
2. **NO** dark mode. Warm light theme only.
3. **NO** leaderboards, streaks, streak punishments, or social features.
4. **NO** complex animations or animation libraries. CSS transitions only.
5. **NO** authentication or backend calls.
6. **NO** hardcoded styles — everything from `theme.ts`.
7. **Every component** must be a clean, reusable TypeScript React component with typed props.
8. **Bottom tab bar** must be fixed/sticky, visible on all main screens (home, charity, cat profile). Hidden during onboarding.
9. The app must be **immediately demoable** — all screens functional, all interactions working, all state persisting.
10. Import Nunito font from Google Fonts in the root layout.

Build the complete app now. Start with the theme file, then base UI components, then screens in flow order (welcome → onboarding → home → cat profile → charity → settings).
