# DK Car Modification - Files Overview

## Project Structure

```
dk-car-modification/
│
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   ├── 📁 pages/               # Page components (routing)
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 lib/                 # Utility libraries
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles
│   ├── vite-env.d.ts           # Vite type definitions
│
├── 📁 public/                  # Static files
│
├── Configuration Files:
│   ├── .env                    # Environment variables (Supabase keys)
│   ├── .gitignore              # Git ignore rules
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── vite.config.ts          # Vite bundler configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── tsconfig.app.json       # App TypeScript configuration
│   ├── tsconfig.node.json      # Node TypeScript configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── package.json            # Dependencies and scripts
│   ├── package-lock.json       # Dependency lock file
│   ├── index.html              # HTML entry point
│
└── 📁 Documentation (this directory):
    ├── README_DK_CARMOD.md     # Complete feature documentation
    ├── SETUP_GUIDE.md          # Step-by-step setup instructions
    ├── PROJECT_SUMMARY.md      # Project overview and statistics
    ├── QUICK_REFERENCE.md      # Quick commands and references
    └── FILES_OVERVIEW.md       # This file
```

## Component Files

### `/src/components/` - Reusable UI Components

| File | Purpose | Props | Lines |
|------|---------|-------|-------|
| **Header.tsx** | Navigation bar with responsive menu | None | 120 |
| **Footer.tsx** | Footer with links and social icons | None | 150 |
| **Button.tsx** | Reusable button component | variant, onClick, href | 40 |
| **ServiceCard.tsx** | Service display card | icon, title, description, image | 35 |
| **TestimonialCard.tsx** | Testimonial display card | name, title, image, text, rating | 40 |
| **FAQItem.tsx** | Expandable FAQ item | question, answer, index | 45 |
| **AnimatedBackground.tsx** | Animated rotating backgrounds | images, children, duration, overlay | 90 |
| **BookingModal.tsx** | Booking form modal dialog | isOpen, onClose, serviceName, serviceId | 200 |

**Total Components**: 8 files

## Page Files

### `/src/pages/` - Page Components (5 main pages)

| File | Route | Purpose | Sections | Lines |
|------|-------|---------|----------|-------|
| **Home.tsx** | `/` | Landing page | Hero, Features, Services, About, Testimonials, CTA | 500+ |
| **Services.tsx** | `/services` | Services catalog | Hero, Services Grid, Process, FAQ, CTA | 450+ |
| **About.tsx** | `/about` | Company information | Hero, Stats, Story, Values, Team, Why Us, CTA | 480+ |
| **Portfolio.tsx** | `/portfolio` | Project gallery | Hero, Projects, Stats, CTA | 350+ |
| **Contact.tsx** | `/contact` | Contact & booking | Hero, Info Cards, Form, Map, CTA | 400+ |

**Total Pages**: 5 files

## Hook Files

### `/src/hooks/` - Custom React Hooks

| File | Purpose | Functions |
|------|---------|-----------|
| **useAPI.ts** | Database operations | submitContact, createBooking, getServices, getTestimonials |

## Library Files

### `/src/lib/` - Utility Libraries

| File | Purpose | Exports |
|------|---------|---------|
| **supabase.ts** | Supabase client setup | supabase client, Database types |

## Style Files

### `/src/` - Global Styles

| File | Purpose | Lines |
|------|---------|-------|
| **index.css** | Global styles, Tailwind setup | 150+ |

## Root Files

### Configuration & Setup

| File | Purpose |
|------|---------|
| **vite.config.ts** | Vite build configuration |
| **tailwind.config.js** | Tailwind CSS customization |
| **postcss.config.js** | PostCSS/Autoprefixer setup |
| **tsconfig.json** | TypeScript compiler options |
| **eslint.config.js** | Code linting rules |
| **package.json** | Dependencies and scripts |
| **index.html** | HTML template |
| **.env** | Environment variables |
| **.gitignore** | Git ignore rules |

### Entry Points

| File | Purpose |
|------|---------|
| **src/main.tsx** | React app entry point |
| **src/App.tsx** | Main app component with routing |
| **src/vite-env.d.ts** | Vite type definitions |

## Dependencies

### Core Dependencies
- **react** (18.3.1) - UI framework
- **react-dom** (18.3.1) - React DOM rendering
- **react-router-dom** (6.28.0) - Client-side routing
- **@supabase/supabase-js** (2.57.4) - Database client
- **framer-motion** (11.11.1) - Animation library
- **lucide-react** (0.344.0) - Icon library

### Dev Dependencies
- **typescript** (5.5.3) - Type checking
- **tailwindcss** (3.4.1) - Utility CSS framework
- **vite** (5.4.2) - Build tool
- **eslint** (9.9.1) - Code linting
- **postcss** (8.4.35) - CSS processing
- **autoprefixer** (10.4.18) - CSS vendor prefixing

## File Sizes

| Category | Size | Gzip |
|----------|------|------|
| JavaScript | 480 KB | 140 KB |
| CSS | 23 KB | 4.9 KB |
| HTML | 0.7 KB | 0.38 KB |
| **Total** | **504 KB** | **145 KB** |

## Total Lines of Code

| Category | Files | Lines |
|----------|-------|-------|
| Components | 8 | ~500 |
| Pages | 5 | ~2000+ |
| Hooks | 1 | ~100 |
| Libraries | 1 | ~200 |
| Styles | 1 | ~150 |
| Config | 6 | ~150 |
| **Total** | **22** | **~3100+** |

## Key Directories Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx   (90 lines)
│   ├── BookingModal.tsx         (200 lines)
│   ├── Button.tsx               (40 lines)
│   ├── FAQItem.tsx              (45 lines)
│   ├── Footer.tsx               (150 lines)
│   ├── Header.tsx               (120 lines)
│   ├── ServiceCard.tsx          (35 lines)
│   └── TestimonialCard.tsx      (40 lines)
│
├── pages/
│   ├── Home.tsx                 (500+ lines)
│   ├── Services.tsx             (450+ lines)
│   ├── About.tsx                (480+ lines)
│   ├── Portfolio.tsx            (350+ lines)
│   └── Contact.tsx              (400+ lines)
│
├── hooks/
│   └── useAPI.ts                (100 lines)
│
├── lib/
│   └── supabase.ts              (200 lines)
│
├── App.tsx                      (30 lines)
├── main.tsx                     (10 lines)
├── index.css                    (150+ lines)
└── vite-env.d.ts                (5 lines)
```

## Generated Files (Build Output)

### dist/ Directory (after `npm run build`)

```
dist/
├── index.html                   (0.7 KB)
├── assets/
│   ├── index-CLpAKKhK.css      (23 KB)
│   └── index-CzqKfvVM.js       (480 KB)
```

## Documentation Files

| File | Size | Purpose |
|------|------|---------|
| README_DK_CARMOD.md | 400+ lines | Complete feature documentation |
| SETUP_GUIDE.md | 300+ lines | Installation and setup instructions |
| PROJECT_SUMMARY.md | 350+ lines | Project overview and statistics |
| QUICK_REFERENCE.md | 250+ lines | Quick commands and references |
| FILES_OVERVIEW.md | This file | File structure documentation |

## File Types

- **TypeScript (TSX/TS)**: 18 files - React components and utilities
- **CSS**: 1 file - Global styles
- **JSON/JS**: 6 files - Configuration
- **Markdown**: 4 files - Documentation
- **HTML**: 1 file - Entry point
- **Environment**: 1 file - Config

## Import Patterns

### Component Imports
```typescript
import ServiceCard from '../components/ServiceCard';
import { useAPI } from '../hooks/useAPI';
import { supabase } from '../lib/supabase';
```

### External Library Imports
```typescript
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
```

## Edit Priority (Most Changed)

1. **src/pages/Home.tsx** - Main landing page content
2. **src/components/Header.tsx** - Company name, logo, menu
3. **src/pages/Contact.tsx** - Contact information
4. **src/pages/About.tsx** - Team, story, values
5. **tailwind.config.js** - Brand colors

## Files NOT to Edit (System)

- **.gitignore** - Git configuration
- **package-lock.json** - Dependency lock
- **vite-env.d.ts** - Type definitions
- **tsconfig.json** - TypeScript config
- **eslint.config.js** - Linter config

## Getting Help

1. **Setup Issues?** → Read SETUP_GUIDE.md
2. **Want to customize?** → Check QUICK_REFERENCE.md
3. **Need component details?** → Look at FILES_OVERVIEW.md (this file)
4. **Project overview?** → See PROJECT_SUMMARY.md
5. **All features?** → Read README_DK_CARMOD.md

---

**Last Updated**: 2026-06-01  
**Total Project Files**: 50+  
**Total Lines of Code**: 3100+  
**Production Ready**: ✅ Yes