import { Directive, ElementRef, Input, Inject, Optional, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  BUTTON_SIZES,
  BUTTON_ACTIVE_PALETTE,
  BUTTON_BORDER_PALETTE,
  BUTTON_FOCUS_PALETTE,
  BUTTON_HOST_ATTRIBUTES,
  BUTTON_HOST_ATTRIBUTES_CLASSES,
  BUTTON_HOVER_PALETTE,
  BUTTON_BACKGROUND_PALETTE,
  BUTTON_TEXT_PALETTE,
  BASE_CLASSES,
} from './ngx-nova-tw-button.palette';
import { BUTTON_PALETTE_CONFIGURATOR, ButtonPaletteConfiguration } from './ngx-nova-tw-button.token';

export type ButtonShape = 'square' | 'rounded' | 'pill' | 'rounded-custom';

@Directive({
  standalone: true,
  selector: `
    button[nova-tw-button], button[nova-tw-outline-button],
    button[nova-tw-flat-button], button[nova-tw-raised-button], button[nova-tw-stroke-button],
    a[nova-tw-button], a[nova-tw-outline-button],
    a[nova-tw-flat-button], a[nova-tw-raised-button], a[nova-tw-stroke-button]
  `,
})
export class NgxNovaButtonDirective implements OnInit, OnChanges {
  @Input() public size: keyof typeof BUTTON_SIZES = 'medium';
  @Input() public color: keyof typeof BUTTON_BACKGROUND_PALETTE = 'black';
  @Input() public shape: ButtonShape = 'rounded';

  private readonly directiveClasses = new Set<string>();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(BUTTON_PALETTE_CONFIGURATOR) private readonly palette?: ButtonPaletteConfiguration
  ) {}

  public ngOnInit(): void {
    this.applyButtonStyles();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('size' in changes || 'color' in changes || 'shape' in changes) {
      this.applyButtonStyles();
    }
  }

  private applyButtonStyles(): void {
    const hostElement = this.getHostElement();
    const matchedAttr = BUTTON_HOST_ATTRIBUTES.find((attr) => hostElement.hasAttribute(attr));
    if (!matchedAttr) return;

    // First capture current user classes (before any modifications)
    const userClasses = new Set(Array.from(hostElement.classList).filter((cls) => !this.directiveClasses.has(cls)));

    // Remove previous directive classes only
    this.directiveClasses.forEach((cls) => hostElement.classList.remove(cls));
    this.directiveClasses.clear();

    // Generate and apply NEW directive classes first
    const newDirectiveClasses = [
      ...this.getBaseClasses(matchedAttr),
      ...this.getSizeClasses(),
      ...this.getShapeClasses(),
      ...this.getColorSchemeClasses(matchedAttr),
    ].filter(Boolean);

    const finalClasses = [...newDirectiveClasses, ...userClasses].filter(Boolean);
    hostElement.className = finalClasses.join(' ');
    newDirectiveClasses.forEach((cls) => this.directiveClasses.add(cls));
  }

  private getBaseClasses(attr: string): string[] {
    const customBaseClasses = this.palette?.baseClasses;
    return [
      ...(customBaseClasses?.length ? customBaseClasses : BASE_CLASSES),
      ...BUTTON_HOST_ATTRIBUTES_CLASSES[attr],
    ].filter(Boolean);
  }

  private getSizeClasses(): string[] {
    const defaultSize = BUTTON_SIZES[this.size];
    const customSize = this.palette?.sizes?.[this.size];
    return (customSize?.length ? customSize : defaultSize).filter(Boolean);
  }

  private getShapeClasses(): string[] {
    switch (this.shape) {
      case 'square':
        return ['rounded-none'];
      case 'rounded':
        return ['rounded'];
      case 'pill':
        return ['rounded-full'];
      default:
        return ['rounded-custom'];
    }
  }

  private getColorSchemeClasses(attr: string): string[] {
    const baseColor = this.color;
    const isOutline = attr === 'nova-tw-outline-button' || attr === 'nova-tw-stroke-button';
    const textClasses = this.getColorClasses(BUTTON_TEXT_PALETTE, this.palette?.palette?.text, baseColor);
    const finalTextClass =
      isOutline && baseColor === 'black' && textClasses.includes('text-white') ? ['text-black'] : textClasses;

    return [
      ...(isOutline
        ? []
        : this.getColorClasses(BUTTON_BACKGROUND_PALETTE, this.palette?.palette?.background, baseColor)),
      ...(!isOutline && baseColor !== 'white' && baseColor !== 'neutral' ? ['text-white'] : finalTextClass),
      ...this.getColorClasses(BUTTON_BORDER_PALETTE, this.palette?.palette?.border, baseColor),
      ...this.getColorClasses(BUTTON_HOVER_PALETTE, this.palette?.palette?.hover, baseColor),
      ...this.getColorClasses(BUTTON_ACTIVE_PALETTE, this.palette?.palette?.active, baseColor),
      ...(isOutline && baseColor !== 'white' && baseColor !== 'neutral' ? ['hover:text-white'] : []),
      ...this.getColorClasses(BUTTON_FOCUS_PALETTE, this.palette?.palette?.focus, baseColor),
    ].filter(Boolean);
  }

  private getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private getColorClasses(
    defaultPalette: Record<string, string[]>,
    overridePalette: Partial<Record<string, string[]>> | undefined,
    color: string
  ): string[] {
    const mergedPalette = { ...defaultPalette, ...(overridePalette ?? {}) };
    return mergedPalette[color] ?? mergedPalette['neutral'] ?? [];
  }
}
