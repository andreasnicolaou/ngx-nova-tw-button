import { InjectionToken } from '@angular/core';

export interface ButtonPaletteConfiguration {
  sizes?: Record<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge', string[]>;
  baseClasses?: string[];
  palette?: {
    background?: Record<string, string[]>;
    text?: Record<string, string[]>;
    border?: Record<string, string[]>;
    hover?: Record<string, string[]>;
    active?: Record<string, string[]>;
    focus?: Record<string, string[]>;
  };
}

export const BUTTON_PALETTE_CONFIGURATOR = new InjectionToken<ButtonPaletteConfiguration>(
  'BUTTON_PALETTE_CONFIGURATOR',
  {
    providedIn: 'root',
    factory: (): ButtonPaletteConfiguration => ({
      sizes: {
        xsmall: [],
        small: [],
        medium: [],
        large: [],
        xlarge: [],
      },
      baseClasses: [],
      palette: {
        background: {},
        text: {},
        border: {},
        hover: {},
        active: {},
        focus: {},
      },
    }),
  }
);
