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

  @Input()
  path: Array<number> = [];

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

  @HostBinding('class.path')
    get pathClass() {
      const [row, column] = this.highlight;
      
      return this.path.find(cur => cur[0] === row && cur[1] === column);
    }

  constructor() { }
}
