import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dtw',
  templateUrl: './dtw.component.html',
  styleUrls: ['./dtw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DTWComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      firstSequence: [null],
      secondSequence: [null]
    })
  }

  runDtw() {
    console.log('Run DTW', this.form.value);
  }

}
