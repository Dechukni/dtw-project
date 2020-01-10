import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-distance',
  templateUrl: './edit-distance.component.html',
  styleUrls: ['./edit-distance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDistanceComponent implements OnInit {
  form: FormGroup;
  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      firstString: [null],
      secondString: [null]
    })
  }

  runEditDistance() {
    console.log('Run EditDistance', this.form.value);
  }
}
