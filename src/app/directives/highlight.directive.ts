import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  @Input()
  highlight: Array<number>;
  @Input()
  hovered: Array<number>;
  @Input()
  highlightDiagonal = false;

  @HostBinding('class.highlight')
  get elementClass() {
    const [row, column] = this.highlight;
    const [hoverRow, hoverColumn] = this.hovered;

    return row === hoverRow - 1 && column === hoverColumn ||
      row === hoverRow - 1 && column === hoverColumn - 1 ||
      row === hoverRow && column === hoverColumn - 1;
  }

  @HostBinding('class.diagonal')
  get isHighlightDiagonal() {
    const [row, column] = this.highlight;
    const [hoverRow, hoverColumn] = this.hovered;

    if (this.highlightDiagonal) {
      return row === hoverRow - 1 && column === hoverColumn - 1;
    }

    return false;
  }

  constructor() { }
}
