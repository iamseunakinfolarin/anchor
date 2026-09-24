---
name: Anchor Scripture Confessions
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dadf'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#ebeef3'
  surface-container-high: '#e5e8ed'
  surface-container-highest: '#e0e3e8'
  on-surface: '#181c20'
  on-surface-variant: '#5b403d'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eef1f6'
  outline: '#906f6c'
  outline-variant: '#e4beb9'
  surface-tint: '#bb171c'
  primary: '#b7131a'
  on-primary: '#ffffff'
  primary-container: '#db322f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4ac'
  secondary: '#b51925'
  on-secondary: '#ffffff'
  secondary-container: '#d8363a'
  on-secondary-container: '#fffbff'
  tertiary: '#675859'
  on-tertiary: '#ffffff'
  tertiary-container: '#817171'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ae'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930015'
  tertiary-fixed: '#f2dede'
  tertiary-fixed-dim: '#d5c2c2'
  on-tertiary-fixed: '#241919'
  on-tertiary-fixed-variant: '#514344'
  background: '#f7f9ff'
  on-background: '#181c20'
  surface-variant: '#e0e3e8'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 42px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system crafts a sanctuary-grade auditory and contemplative experience. Blending minimal editorial purity with soft neumorphic tactile depth, the interface delivers calm reverence punctuated by vivid conviction. Designed for believers and seekers engaging in scripture listening, daily confessions, and meditation, the aesthetic eliminates visual noise while maintaining visceral physical touchpoints.

### Design Movement & Core Principles
- **Soft Neumorphic Tactility:** Gently elevated pure white surfaces hover over mist-toned backdrops via ultra-diffused atmospheric shadows, creating physical presence without skeletal harshness.
- **Vibrant Focal Anchors:** High-energy crimson and coral red highlights act as intentional navigational beacons—marking active confessions, playback triggers, and real-time audio waveforms.
- **Editorial Serenity:** Airy whitespace, confident typographic tracking, and rounded pill geometries foster an unhurried, devotional mindset.

## Colors

The palette balances ethereal neutral surfaces with sharp, passionate chromatic accents:

- **Primary (`#E53935` / Vivid Crimson):** The primary kinetic signal. Governs the master play/pause floating triggers, active navigation indicator lines, and primary call-to-actions.
- **Secondary (`#FF5252` / Bright Coral):** Interactive state highlight used for active audio wave bars, heart/favorite toggles, and notification pings.
- **Tertiary (`#FDE8E8` / Soft Rose Mist):** Tonal circular badge backdrops, subtle pill selections, and ambient button glows.
- **Neutral Palette:**
  - **Canvas Base (`#F4F6F9`):** A soft, cool off-white that creates seamless contrast with pure white card surfaces.
  - **Surface Container (`#FFFFFF`):** Pure white used for elevated audio cards, bottom floating navigation shells, and search containers.
  - **Text Primary (`#2B2F33`):** Deep slate-charcoal delivering legibility without pitch-black starkness.
  - **Text Muted (`#8D96A0`):** Balanced mid-tone gray for metadata (track durations, scripture references, timestamps).
  - **Border & Inactive Accents (`#E9EDF2`):** Low-contrast dividers and inactive track bar fills.

## Typography

Typography relies on **Plus Jakarta Sans** across all roles, capitalizing on its geometric clarity, rounded geometric curves, and contemporary legibility.

- **Headlines:** Set with high structural weight (`700` and `600`) to anchor views cleanly like album editorial titles.
- **Body & Subheads:** Clear, open apertures keep scriptures, chapter references, and narrators accessible at glance speeds.
- **Labels & Navigation:** Subtle letter-spacing is applied to small utility indicators and audio scrub timestamps to ensure instantaneous tracking against ambient backdrops.

## Layout & Spacing

The layout is optimized for single-handed mobile navigation with generous breathing room:

- **Vertical Rhythm:** Built on an 8pt baseline scale. Section titles maintain `space-lg` separation from interactive grids and lists.
- **Horizontal Margins:** A steady `margin` (`1.25rem` / `20px`) protects touch targets and maintains edge balance on modern mobile screen viewports.
- **Floating Overlays:** Fixed bottom play controls and docked tab bars utilize generous safe-area insets (`space-xl` bottom padding) to float freely above background content.

## Elevation & Depth

Visual hierarchy is created using multi-layered, ultra-soft diffused ambient shadows on off-white surfaces rather than heavy architectural strokes:

- **Base Ambient (`Level 1` - Cards & Inputs):** `0 8px 24px rgba(43, 47, 51, 0.04)`. Imparts effortless separation between pure white containers and the canvas.
- **Floating Interaction (`Level 2` - Tab Bar & Now Playing Sheet):** `0 -8px 30px rgba(43, 47, 51, 0.06)`. Softly decouples elevated navigation docks from scrollable track feeds.
- **Active Playhead (`Level 3` - Crimson Circle Play Buttons):** `0 10px 24px rgba(229, 57, 53, 0.35)`. A saturated, directional warm glow that signals tactile responsiveness.

## Shapes

The interface embraces organic curvature to induce relaxation and approachable ergonomics:

- **Pills & Circular Badges:** Search inputs, category chips, quick-action circles, and transport play buttons utilize complete boundary rounding (`9999px` / pill radius).
- **Cards & Visual Containers:** Content panels and scripture cover artwork share uniform `rounded-xl` (`1.5rem` / `24px`) corner radii.
- **Docked Sheets:** Upward-sliding playback panels and floating navigation shells feature soft top corner radiuses (`2rem` / `32px`) that echo modern handheld device contours.

## Components

### Buttons & Transport Controls
- **Master Play Button:** A `64px` circular button in solid `#E53935` featuring an interior white play/pause icon, elevated by a soft crimson bloom shadow (`0 10px 24px rgba(229, 57, 53, 0.35)`).
- **Secondary Action Buttons:** `44px` circular touch targets with subtle pastel background fills (`#FDE8E8`) paired with primary crimson iconography.
- **Transport Controls (Skip, Repeat, Shuffle):** Unframed monochrome glyphs in `#8D96A0` that transition to `#2B2F33` on press or active engagement.

### Search & Pill Inputs
- **Search Bar:** Fully pill-shaped container (`height: 52px`), surface-white background, adorned with a soft internal inset feel or level-1 ambient shadow. Left-aligned muted search icon paired with `#8D96A0` placeholder text.

### Category Chips & Horizontal Tabs
- **Segmented Navigation:** Text labels in `#8D96A0` with active tabs underscored by a rounded crimson bar indicator (`3px` height, `#E53935`) and weighted `#2B2F33` typography.
- **Icon Feature Pills:** Circular tonal avatars (`48px` diameter) in `#FDE8E8` displaying crimson utility glyphs (All Songs, Downloads, Scripture Confessions, Audio Bible).

### Cards & Media Items
- **Artwork Album Cards:** Pure white elevated cards featuring `rounded-xl` clipped artwork (`1:1` or `4:3` ratio), followed by title, speaker/author subtitle, and a micro heart/favorite icon on the right trailing edge.
- **Scripture Track List Items:** Borderless horizontal rows with rounded thumbnail left assets (`44px` x `44px`), song/passage name, duration stamp, play glyph, and vertical ellipsis menu.

### Audio Waveform Scrubber
- **Confession Visualizer:** Alternating vertical rounded bars (`width: 3px`, `gap: 3px`). Inactive bars styled in `#E9EDF2` or `#8D96A0`; played/active bars dynamically painted in `#E53935` and `#FF5252`.