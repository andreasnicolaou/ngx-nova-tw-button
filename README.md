# NgxNovaTwButton

A lightweight, standalone Angular button directive with Tailwind CSS styling that mimics Angular Material's button styles and behaviors.

![GitHub contributors](https://img.shields.io/github/contributors/andreasnicolaou/ngx-nova-tw-button)
![GitHub License](https://img.shields.io/github/license/andreasnicolaou/ngx-nova-tw-button)
![GitHub package.json version](https://img.shields.io/github/package-json/v/andreasnicolaou/ngx-nova-tw-button)
![NPM Downloads](https://img.shields.io/npm/dm/%40andreasnicolaou%2Fngx-nova-tw-button)

## Demo

Try it live on StackBlitz:

👉 <a href="https://stackblitz.com/edit/stackblitz-starters-eemryayv" target="_blank">Open in StackBlitz</a>

## Features

- Material Design-inspired button styles
- Standalone directive (Angular 14+)
- Multiple variants: flat, raised, outline, stroke
- Size control: xsmall, small, medium, large
- Full Tailwind CSS customization via Injection Tokens
- Button shape control: square, rounded, pill
- Accessible, keyboard and screen-reader-friendly

## Installation

```bash
npm install @andreasnicolaou/ngx-nova-tw-button
```

### Peer Dependencies

Ensure these are installed in your project:

- Angular 14+
- Tailwind CSS 3+

## Usage

In a Standalone Component

```typescript
import { NgxNovaButtonDirective } from '@andreasnicolaou/ngx-nova-tw-button';

@Component({
  standalone: true,
  imports: [NgxNovaButtonDirective],
  template: `
    <button nova-tw-button>Basic</button>
    <button nova-tw-raised-button>Raised</button>
    <button nova-tw-outline-button>Outline</button>
    <button nova-tw-stroke-button>Stroke</button>
    <button nova-tw-flat-button>Flat</button>
  `,
})
export class MyComponent {}
```

In a Module

```typescript
import { NgModule } from '@angular/core';
import { NgxNovaButtonDirective } from '@andreasnicolaou/ngx-nova-tw-button';
@NgModule({
  imports: [NgxNovaButtonDirective],
  declarations: [...],
})
export class MyModule {}
```

## Example Usage

```html
<button nova-tw-outline-button color="emerald" shape="square" size="medium">Success</button>
```

## API Reference

### Inputs

| Input   | Type                                                     | Default     | Description                                                   |
| ------- | -------------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| `color` | `string`                                                 | `'black'`   | Tailwind color (e.g. `'blue'`, `'emerald'`, `'custom-color'`) |
| `size`  | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'`  | Controls padding and font size                                |
| `shape` | `'square' \| 'rounded' \| 'pill'`                        | `'rounded'` | Border radius style:                                          |
|         |                                                          |             | - `'square'` → `rounded-none`                                 |
|         |                                                          |             | - `'rounded'` → `rounded` (default)                           |
|         |                                                          |             | - `'pill'` → `rounded-full`                                   |
|         |                                                          |             | - Any other value applies `rounded-custom` class              |

### Customizing custom-rounded

```typescript
// tailwind.config.js or tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        custom: '0.65rem', // You can adjust this value
      },
    },
  },
  plugins: [],
};
```

### Variants (Apply as attributes)

Apply one of the following as an attribute to **button** or **a**:

| Attribute                | Style Equivalent                     |
| ------------------------ | ------------------------------------ |
| `nova-tw-button`         | Base button                          |
| `nova-tw-raised-button`  | Adds shadow for elevation            |
| `nova-tw-outline-button` | Transparent fill with colored border |
| `nova-tw-stroke-button`  | Thicker outlined button              |
| `nova-tw-flat-button`    | Flat button with subtle hover effect |

### Available Tailwind Colors

| Color Group | Options                                        |
| ----------- | ---------------------------------------------- |
| Reds        | `red` `orange` `amber` `yellow`                |
| Greens      | `lime` `green` `emerald` `teal`                |
| Blues       | `cyan` `sky` `blue` `indigo`                   |
| Purples     | `violet` `purple` `fuchsia` `pink`             |
| Grays       | `rose` `slate` `gray` `zinc` `neutral` `stone` |

## Class Order & Overrides

This directive applies its own internal Tailwind CSS classes for sizing, coloring, transitions, etc. These classes are added first, so any custom classes you apply (e.g. with class, [class], or [ngClass]) are appended afterwards.

This ensures:

- Tailwind’s !important modifiers like !pt-0, !text-blue-500, etc., can override internal styles cleanly.
- It respects Angular’s class binding behavior via [class], [ngClass], or class="...".

## Customization Guide

To override default styles while preserving base functionality, use the BUTTON_PALETTE_CONFIGURATOR token. You can extend the default values by importing them from the palette file:

### Default Configuration Values

#### Base Classes (BASE_CLASSES)

```typescript
[
  'transition-all',
  'duration-300',
  'ease-in-out',
  'motion-reduce:transition-none',
  'font-normal',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-2',
  'focus:ring-opacity-75',
];
```

#### Button Sizes (BUTTON_SIZES)

```typescript
{
  xsmall: ['px-3', 'py-1', 'text-xs'],
  small: ['px-4', 'py-1.5', 'text-sm'],
  medium: ['px-5', 'py-2', 'text-base'],
  large: ['px-6', 'py-2.5', 'text-lg'],
  xlarge: ['px-7', 'py-3', 'text-xl']
}
```

Both are merged with:
```typescript
{
  'nova-tw-button': ['border', 'border-solid'],
  'nova-tw-outline-button': ['bg-transparent', 'border', 'border-solid'],
  'nova-tw-flat-button': ['border', 'border-solid'],
  'nova-tw-raised-button': ['shadow-md', 'hover:shadow-lg'],
  'nova-tw-stroke-button': ['bg-transparent', 'border', 'border-2'],
}
```

#### Customization Examples

1. Extending Base Classes

```typescript
import { BUTTON_PALETTE_CONFIGURATOR, BUTTON_SIZES, BASE_CLASSES } from '@andreasnicolaou/ngx-nova-tw-button';

@NgModule({
  providers: [
    {
      provide: BUTTON_PALETTE_CONFIGURATOR,
      useValue: {
        sizes: {
          ...BUTTON_SIZES, // Keep all sizes exactly as-is - no need to provide in general if not overriding
          large: [...BUTTON_SIZES.large, 'uppercase'], // Extend specific size
        },
        baseClasses: [...BASE_CLASSES, 'custom-class'], // Keeps defaults + adds new
        palette: {
          background: {
            emerald: ['bg-emerald-700'], // Override existing color
            brand: ['bg-brand-500'], // Add new color
          },
          text: {
            emerald: ['text-emerald-100'], // Custom text color
          },
        },
      },
    },
  ],
})
export class AppModule {}
```

**Result:**

- Maintains all default transitions and focus styles
- Adds custom-class to every button
- Large buttons gain uppercase while keeping other size classes

2. Complete Override

```typescript
import { BUTTON_PALETTE_CONFIGURATOR, BUTTON_SIZES, BASE_CLASSES } from '@andreasnicolaou/ngx-nova-tw-button';

@NgModule({
  providers: [
    {
      provide: BUTTON_PALETTE_CONFIGURATOR,
      useValue: {
        sizes: {
          medium: ['px-10', 'py-4'], // Custom medium size (loses text size classes)
        },
        baseClasses: ['new-transition'], // Replaces ALL base classes
        palette: {
          background: {
            emerald: ['bg-emerald-700'], // Override existing color
            brand: ['bg-brand-500'], // Add new color
          },
          text: {
            emerald: ['text-emerald-100'], // Custom text color
          },
        },
      },
    },
  ],
})
export class AppModule {}
```

**Result:**

- Replaces all transition/focus styles with new-transition
- Medium buttons lose default text sizing (only keeps padding)

3. Hybrid Approach

```typescript
import { BUTTON_PALETTE_CONFIGURATOR, BUTTON_SIZES, BASE_CLASSES } from '@andreasnicolaou/ngx-nova-tw-button';

@NgModule({
  providers: [
    {
      provide: BUTTON_PALETTE_CONFIGURATOR,
      useValue: {
        sizes: BUTTON_SIZES, // Keep all sizes exactly as-is - no need to provide in general if not overriding
        baseClasses: [...BASE_CLASSES.filter((c) => !c.includes('focus')), 'focus:ring-4'],
        palette: {
          background: {
            emerald: ['bg-emerald-700'], // Override existing color
            brand: ['bg-brand-500'], // Add new color
          },
          text: {
            emerald: ['text-emerald-100'], // Custom text color
          },
        },
      },
    },
  ],
})
export class AppModule {}
```

**Result:**

- Removes default focus rings but keeps other transitions
- Adds heavier focus:ring-4
- All sizes remain unchanged

**_Note_**: If no overrides are provided, defaults will be used internally via a fallback factory.

### Palette vs Sizes vs Base Classes

- Color Palettes (background, text, border, etc.) support partial overrides and will merge with built-in defaults. This allows you to extend the palette with custom colors without redefining everything.

- Sizes (xsmall, small, medium, etc.) will completely replace the defaults if provided. No merging or extension occurs — be sure to define all necessary size entries if you override this section.

- Base classes (common utility classes like transitions) follow the same behavior as sizes: if overridden, they fully replace the built-in defaults. This means you must provide a complete set of classes if you decide to customize this section.

## Contribution

Contributions are welcome! If you encounter issues or have ideas to enhance the library, feel free to submit an **issue** or **pull request**.
