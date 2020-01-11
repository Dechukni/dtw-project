import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { EditDistance } from '../algorithms/edit-distance';

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
  hoverColumn: number

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
      this.firstStringItems = this.formValueToArray(this.form.value.firstString);
      this.secondStringItems = this.formValueToArray(this.form.value.secondString);

      const { matrix, distance } = EditDistance.run(this.firstStringItems, this.secondStringItems);

      this.resultMatrix = matrix;
      this.distance = distance;

      this.cdr.markForCheck();
    }
  }

  onMouseOver(row: number, column: number) {
    this.hoverRow = row;
    this.hoverColumn = column;
  }

  private formValueToArray(value: string): Array<string> {
    return value.split('');
  }
}
