import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      firstSequence: ['', [Validators.required, Validators.pattern('^[0-9\\s]*$')]],
      secondSequence: ['', [Validators.required, Validators.pattern('^[0-9\\s]*$')]]
    });
  }

  runDtw() {
    console.log('Run DTW', this.form.value);
  }

}
