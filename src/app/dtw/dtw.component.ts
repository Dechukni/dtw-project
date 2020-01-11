import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DynamicTimeWarping } from '../algorithms/dynamic-time-warping';

@Component({
  selector: 'app-dtw',
  templateUrl: './dtw.component.html',
  styleUrls: ['./dtw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DTWComponent implements OnInit {
  form: FormGroup;
  firstSequenceItems: Array<number>;
  secondSequenceItems: Array<number>
  resultMatrix: Array<number[]>;
  distance: number;
  hoverRow: number;
  hoverColumn: number;

  constructor(private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      firstSequence: ['4 2 1 4 8 8 9 3 2 3 2 2 6 9 2 1 1 6 1', [Validators.required, Validators.pattern('^[0-9\\s]*$')]],
      secondSequence: ['3 2 2 1 1 8 3 2 6 9 1 6 1', [Validators.required, Validators.pattern('^[0-9\\s]*$')]]
    });
  }

  runDtw() {
    if (this.form.valid) {
      this.firstSequenceItems = this.formValueToArray(this.form.value.firstSequence);
      this.secondSequenceItems = this.formValueToArray(this.form.value.secondSequence);
  
      const { matrix, distance } = DynamicTimeWarping.run(this.firstSequenceItems, this.secondSequenceItems);
  
      this.resultMatrix = matrix;
      this.distance = distance;
  
      this.cdr.markForCheck();
    }
  }

  onMouseOver(row: number, column: number) {
    this.hoverRow = row;
    this.hoverColumn = column;
  }

  private formValueToArray(value: string): Array<number> {
    return value.split(' ')
      .map(item => parseInt(item));
  }

}
