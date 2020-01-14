import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DynamicTimeWarping } from '../algorithms/dynamic-time-warping';

const formValueToArray = (value: string): Array<number> => {
  return value.split(' ')
    .map(item => parseInt(item, 10)).filter(item => !Number.isNaN(item));
};

@Component({
  selector: 'app-dtw',
  templateUrl: './dtw.component.html',
  styleUrls: ['./dtw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DTWComponent implements OnInit {
  form: FormGroup;
  firstSequenceItems: Array<number>;
  secondSequenceItems: Array<number>;
  resultMatrix: Array<number[]>;
  distance: number;
  hoverRow: number;
  hoverColumn: number;

  parentRowItem: number;
  parentColumnItem: number;
  siblings: Array<number>;
  hovered: number;

  tableSmall: boolean;
  tableTiny: boolean;

  path: Array<number[]>

  constructor(private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.buildForm();
    this.tableSmall = false;
    this.tableTiny = false;
  }

  buildForm() {
    return this.fb.group({
      firstSequence: ['4 2 1 4 8 8 9 3 2 3 2 2 6 9 2 1 1 6 1', [Validators.required, Validators.pattern('^[0-9\\s]*$')]],
      secondSequence: ['3 2 2 1 1 8 3 2 6 9 1 6 1', [Validators.required, Validators.pattern('^[0-9\\s]*$')]]
    });
  }

  getTableSize() {
    return {
      'table-small': this.tableSmall,
      'table-tiny': this.tableTiny
    };
  }

  setTableSize(firstSequenceItemsLength, secondSequenceItemsLength) {
    const maxLength = Math.max(firstSequenceItemsLength, secondSequenceItemsLength);
    if (maxLength > 25) {
      this.tableTiny = true;
      this.tableSmall = false;
    } else if (maxLength > 20) {
      this.tableTiny = false;
      this.tableSmall = true;
    } else {
      this.tableTiny = false;
      this.tableSmall = false;
    }

    return ;
  }

  runDtw() {
    if (this.form.valid) {
      this.firstSequenceItems = formValueToArray(this.form.value.firstSequence);
      this.secondSequenceItems = formValueToArray(this.form.value.secondSequence);

      const { matrix, distance } = DynamicTimeWarping.run(this.firstSequenceItems, this.secondSequenceItems);

      this.setTableSize(this.firstSequenceItems.length, this.secondSequenceItems.length);

      this.resultMatrix = matrix;
      this.distance = distance;
      this.path = DynamicTimeWarping.getPath(matrix);

      this.cdr.markForCheck();
    }
  }

  onMouseOver(row: number, column: number) {
    this.hoverRow = row;
    this.hoverColumn = column;

    this.parentRowItem = this.secondSequenceItems[row];
    this.parentColumnItem = this.firstSequenceItems[column];
    this.hovered = this.resultMatrix[column][row];
    this.siblings = this.getSiblings(row, column);
  }

  onMouseLeave() {
    this.hovered = undefined;
    this.hoverRow = undefined;
    this.hoverColumn = undefined;
  }

  private getSiblings(row, column) {
    if ((column === 0) && (row === 0)) {
      return [];
    }

    if (column === 0) {
      return [
        this.resultMatrix[0][row - 1],
      ];
    }

    if (row === 0) {
      return [
        this.resultMatrix[column - 1][0],
      ];
    }

    return [
      this.resultMatrix[column - 1][row],
      this.resultMatrix[column - 1][row - 1],
      this.resultMatrix[column][row - 1],
    ].filter(cur => cur);
  }

}
