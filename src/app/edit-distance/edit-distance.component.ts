import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { EditDistance } from '../algorithms/edit-distance';

const formValueToArray = (value: string): Array<string> => {
  return value.split('');
};

@Component({
  selector: 'app-edit-distance',
  templateUrl: './edit-distance.component.html',
  styleUrls: ['./edit-distance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDistanceComponent implements OnInit {
  form: FormGroup;
  firstStringItems: Array<string>;
  secondStringItems: Array<string>;
  resultMatrix: Array<number[]>;
  distance: number;
  hoverRow: number;
  hoverColumn: number;

  parentRowItem: string;
  parentColumnItem: string;
  siblings: Array<number>;
  hovered: number;
  helperMatrix: Array<number[]>;

  constructor(private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      firstString: ['abracadabra', [Validators.required, Validators.pattern('^\\S*$')]],
      secondString: ['abarcababbra', [Validators.required, Validators.pattern('^\\S*$')]]
    });
  }

  runEditDistance() {
    if (this.form.valid) {
      this.firstStringItems = formValueToArray(this.form.value.firstString);
      this.secondStringItems = formValueToArray(this.form.value.secondString);

      const { matrix, distance } = EditDistance.run(this.firstStringItems, this.secondStringItems);

      this.resultMatrix = matrix;
      this.distance = distance;

      this.cdr.markForCheck();
    }
  }

  onMouseOver(row: number, column: number) {
    this.hoverRow = row;
    this.hoverColumn = column;

    this.parentRowItem = this.secondStringItems[row - 1];
    this.parentColumnItem = this.firstStringItems[column - 1];
    this.hovered = this.resultMatrix[row][column];
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
        this.resultMatrix[row - 1][0],
      ];
    }

    if (row === 0) {
      return [
        this.resultMatrix[0][column - 1],
      ];
    }

    return [
      this.resultMatrix[row - 1][column - 1],
      this.resultMatrix[row][column - 1],
      this.resultMatrix[row - 1][column],
    ].filter(cur => cur !== undefined);
  }
}
