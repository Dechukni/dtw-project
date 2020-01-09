import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      firstSequence: ['1 2 3 4 5 6 7', Validators.required],
      secondSequence: ['9 8 7 6 5 4 1', Validators.required]
    }) 
  }

  runDtw() {
    if (this.form.valid) {
      this.firstSequenceItems = this.formValueToArray(this.form.value.firstSequence);
      this.secondSequenceItems = this.formValueToArray(this.form.value.secondSequence);
      this.cdr.markForCheck();
    }
  }

  private formValueToArray(value: string): Array<number> {
    return value.split(' ')
      .map(item => parseInt(item));
  }

}
