# Scientific Graphics Guide - Design Specification

## Aesthetic Direction: "Clean Academic"

A refined, light-themed editorial aesthetic inspired by premium scientific publications and modern design systems. The metaphor: a well-organized research studio where clarity meets visual elegance. Every element emphasizes readability through generous whitespace, cool blue tones, and precise typography.

**Memorable differentiator**: Clean sky-blue accents against near-white backgrounds, frosted glass panels with subtle depth, and mint-green secondary highlights. Feels like a modern interactive textbook for researchers.

---

## Color System

### Primary Palette (Sky Blue)
```
--primary:       #7EC8E3    /* Sky Blue - primary accent */
--primary-light: #D0EDF7    /* Light sky */
--primary-dark:  #5BA3C9    /* Deep sky */
```

### Secondary Palette (Mint Green)
```
--secondary:       #95D5B2    /* Mint Green - secondary accent */
--secondary-light: #D8F3DC    /* Light mint */
--secondary-dark:  #74C69D    /* Deep mint */
```

### Tertiary Palette (Lavender)
```
--tertiary:       #B8B8E8    /* Lavender - tertiary accent */
--tertiary-light: #E0E0F5    /* Light lavender */
--tertiary-dark:  #8A8AC8    /* Deep lavender */
```

### Neutral Palette
```
--bg-primary:    #FAFCFD    /* Cool white - main background */
--bg-secondary:  #F3F7F9    /* Light cool gray - card backgrounds */
--bg-tertiary:   #EBF0F3    /* Medium cool gray */
--text-primary:  #2C3E50    /* Deep blue-gray */
--text-secondary:#5D6D7E    /* Medium blue-gray */
--text-muted:    #95A5A6    /* Light blue-gray */
--border:        #E0E8ED    /* Subtle cool border */
```

### Shadow System
```
--shadow-sm:  0 2px 8px rgba(44, 62, 80, 0.06)
--shadow-md:  0 4px 24px rgba(44, 62, 80, 0.08)
--shadow-lg:  0 12px 48px rgba(44, 62, 80, 0.12)
--shadow-accent: 0 4px 16px rgba(126, 200, 227, 0.3)   /* Sky blue glow */
--shadow-hover:  0 12px 48px rgba(126, 200, 227, 0.15)  /* Hover glow */
```

### Gradient Definitions
```
--grad-rose:     linear-gradient(135deg, #D0EDF7, #7EC8E3)       /* Primary gradient */
--grad-mint:     linear-gradient(135deg, #D8F3DC, #95D5B2)       /* Secondary gradient */
--grad-lavender: linear-gradient(135deg, #E0E0F5, #B8B8E8)       /* Tertiary gradient */
--grad-glass:    linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))
--grad-hero:     linear-gradient(135deg, #FAFCFD 0%, #D0EDF7 30%, #D8F3DC 70%, #E0E0F5 100%)
```

---

## Typography

### Font Stack
- **Display**: `'Playfair Display', Georgia, serif` - Elegant serif for major headings
- **Heading**: `'Raleway', 'Helvetica Neue', sans-serif` - Clean geometric sans for subheadings
- **Body**: `'Noto Sans SC', 'Source Han Sans SC', sans-serif` - Premium Chinese + Latin body text
- **Code**: `'JetBrains Mono', 'Fira Code', monospace` - Refined monospace

### Type Scale (base: 16px, ratio: 1.333 Perfect Fourth)
```
--text-4xl:  3.157rem  (50.5px) - Hero title
--text-3xl:  2.369rem  (37.9px) - Section title
--text-2xl:  1.777rem  (28.4px) - Card title
--text-xl:   1.333rem  (21.3px) - Subtitle
--text-base: 1rem      (16px)   - Body
--text-sm:   0.75rem   (12px)   - Caption
--text-xs:   0.563rem  (9px)    - Label
```

### Font Weights
- Display headings: 700 (Bold)
- Section titles: 600 (Semibold)
- Body text: 400 (Regular)
- Emphasis: 500 (Medium)
- Captions: 300 (Light)

### Line Heights
- Headings: 1.2
- Body: 1.75
- Code: 1.6
- Tight (labels): 1.3

### Letter Spacing
- Display: 0.02em
- Section titles: 0.08em
- Body: 0.01em
- All-caps labels: 0.15em

---

## Spatial System

### Spacing Scale
```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  96px
--space-10: 128px
```

### Container
- Max width: 1200px
- Page padding: 64px horizontal, 48px vertical
- Mobile padding: 24px

### Border Radius
```
--radius-sm:  8px   - buttons, tags
--radius-md:  16px  - cards
--radius-lg:  24px  - panels, modals
--radius-xl:  32px  - hero sections
--radius-full: 9999px - pills, avatars
```

---

## Component Styles

### Glass Cards (Primary Container)
```css
.card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 32px;
  box-shadow:
    0 4px 24px rgba(44, 62, 80, 0.04),
    0 1px 4px rgba(44, 62, 80, 0.02);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 48px rgba(126, 200, 227, 0.12),
    0 4px 16px rgba(44, 62, 80, 0.06);
}
```

### Buttons
```css
.btn-primary {
  background: var(--grad-rose);  /* linear-gradient(135deg, #D0EDF7, #7EC8E3) */
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 9999px;
  font-family: 'Raleway';
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 16px rgba(126, 200, 227, 0.3);
  transition: all 0.3s ease;
}
.btn-secondary {
  background: transparent;
  color: var(--text-primary);   /* #2C3E50 */
  border: 1.5px solid var(--border);  /* #E0E8ED */
  /* same padding/radius */
}
```

### Tags/Badges
```css
.tag {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
/* Variants: sky-blue, mint, lavender backgrounds with matching darker text */
```

### Navigation Sidebar
- Background: rgba(255, 255, 255, 0.85) with backdrop blur
- Width: 280px
- Thin right border in var(--border) (#E0E8ED)
- Active item: primary-light (#D0EDF7) background, primary (#7EC8E3) left border (3px)
- Hover: gentle bg transition to bg-secondary (#F3F7F9)
- Section headers: uppercase, letter-spaced, text-muted (#95A5A6)
- Logo: Playfair Display, primary colored (#7EC8E3)

### Section Titles
```css
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);   /* #2C3E50 */
  letter-spacing: 0.02em;
  margin-bottom: 8px;
}
.section-title::after {
  content: '';
  display: block;
  width: 48px;
  height: 3px;
  background: var(--grad-rose);  /* linear-gradient(135deg, #D0EDF7, #7EC8E3) */
  border-radius: 2px;
  margin-top: 16px;
}
```

### Chart Workshop Modal
- Full-screen overlay with backdrop-filter blur
- Background: rgba(44, 62, 80, 0.5) overlay
- Modal body: white (#FFFFFF) with border-radius 24px
- Contains: parameter control panel (left), SVG live preview (center), R code display (right)
- Close button: top-right, circular, border in --border
- Supports 12 chart types with independent parameter controls
- Tab navigation within modal for chart type switching

### Tool Demo Animation Area
- Container with bg-secondary (#F3F7F9) background
- Border: 1px solid var(--border)
- Animated SVG demonstrations for 12 Illustrator tools
- Each tool card: white background, hover lifts with shadow-accent
- Active tool highlighted with primary-light (#D0EDF7) border

### Prompt Quality Scorer
- Interactive scoring widget with progress bar
- Score display: large number in primary color (#7EC8E3)
- Progress bar fill: gradient from primary-light to primary
- Checklist items: checkmark in secondary (#95D5B2) for pass, text-muted (#95A5A6) for fail
- Container: card style with subtle shadow

### Decision Tree Interactive Component
- Flowchart-style layout with connected nodes
- Node backgrounds: primary-light (#D0EDF7), secondary-light (#D8F3DC), tertiary-light (#E0E0F5)
- Connecting lines: 2px solid var(--border) (#E0E8ED)
- Active/selected node: primary (#7EC8E3) border with shadow-accent
- Terminal nodes: rounded pill shape with gradient backgrounds

### Resource Recommender Quiz
- Step-by-step question flow (3 questions)
- Button group for each question option
- Result panel: bg mint-light (#D8F3DC), text mint-dark (#74C69D)
- Reset button: btn-secondary style

### Colorblind Simulator Input
- 5 color input fields (type="color") in a controls-row
- 4-column grid output: Normal / Protanopia / Deuteranopia / Tritanopia
- Verdict panel: green (safe) or red (warning) background with icon

### Facet & Coordinate Demo
- Split into two cards with button group toggle
- SVG preview area: white background, border in --border
- Code display: pre block with font-size 11px
- Active button highlighted with .active class

### Journal Specs Table
- Standard table styling with <th> headers
- Color-coded cells: success (#95D5B2), warning (#FFB347), error (#E64B35)
- Compact font-size (13px) for dense data

### ggsave Code Generator
- 3 select dropdowns: journal, column width, format
- Generated code in pre block, auto-updates on change
- Copy button: btn-secondary

### Patchwork Layout Preview
- 4 layout options as button group
- SVG preview: colored rect panels labeled A/B/C/D
- Code block with syntax reference

### Accordion Items
- Border-bottom: 1px solid var(--border) (#E0E8ED)
- Header: font-weight 600, text-primary (#2C3E50)
- Expand icon: rotates 180deg on open, color primary (#7EC8E3)
- Content area: padding 16px 0, text-secondary (#5D6D7E)
- Open state: subtle bg-secondary (#F3F7F9) background
- Transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)

---

## Backgrounds & Textures

### Main Background
- Cool white (#FAFCFD) base
- Subtle grain texture overlay (CSS noise via SVG filter, opacity 0.03)
- Gradient mesh accent blobs positioned in corners (large, blurred, low opacity)
  - Top-right: sky-blue wash blob (#7EC8E3 at 5% opacity)
  - Bottom-left: mint wash blob (#95D5B2 at 5% opacity)
  - Center: lavender wash blob (#B8B8E8, very subtle)

### Hero Background
- Full gradient mesh with soft cool-tone color blobs
- Animated floating circles (CSS only) in sky-blue, mint, lavender at 3-5% opacity
- Grain overlay

### Page Backgrounds
- Alternate between subtle gradient washes per section
- Color theory section: sky-blue-tinted
- R visualization section: mint-tinted
- AI workflow section: lavender-tinted
- PPT design section: light tertiary-tinted

---

## Motion & Animation

### Page Transitions
```css
.page-enter {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-active {
  opacity: 1;
  transform: translateY(0);
}
```

### Scroll Reveals
- Staggered fade-up with 80ms delay between siblings
- Distance: 24px translateY
- Duration: 0.6s
- Easing: cubic-bezier(0.16, 1, 0.3, 1)

### Hover Micro-interactions
- Cards: lift 4px + shadow expansion (sky-blue glow)
- Buttons: subtle scale(1.02) + shadow glow (rgba(126, 200, 227, 0.3))
- Tags: background color darkens 10%
- Links: primary-color underline slides in from left

### Background Animations
- Floating gradient blobs: slow rotation + scale breathing (20s cycle)
- Grain texture: static (no animation needed)

---

## Interactive Widget Styling

### Color Wheel / Pickers
- White container with subtle shadow
- Round border-radius
- Selected color preview as a large rounded pill shape
- Color value labels in elegant monospace

### Code Blocks
- Background: #F3F7F9 (cool off-white, matches bg-secondary)
- Border: 1px solid var(--border) (#E0E8ED)
- Border-radius: 12px
- Syntax colors: sky-blue (#7EC8E3) for keywords, mint (#95D5B2) for strings, lavender (#B8B8E8) for functions, primary-dark (#5BA3C9) for numbers
- Line numbers in text-muted (#95A5A6)

### Before/After Sliders
- Handle: white circle with primary (#7EC8E3) border and shadow
- Divider line: 2px primary (#7EC8E3)
- Rounded corners on container

### Charts/SVG
- Use sky-blue / mint / lavender palette for data colors
- Axis lines in text-muted (#95A5A6)
- Grid lines in border color (#E0E8ED, very subtle)
- Labels in text-secondary (#5D6D7E)
- White background inside chart area

---

## Iconography
- Style: Thin line icons (1.5px stroke)
- Color: inherit from text or accent
- Size: 20px for inline, 28px for cards, 48px for hero features
- Consistent rounded corners on icon strokes

---

## Responsive Strategy
- Desktop (>1200px): Full sidebar + content
- Laptop (1024-1200px): Narrower sidebar (240px)
- Tablet (768-1024px): Collapsible sidebar overlay
- Mobile (<768px): Bottom navigation tab bar, stacked layouts, 24px padding
