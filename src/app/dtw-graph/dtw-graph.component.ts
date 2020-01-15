import {Component, Input, OnChanges} from '@angular/core';

interface DataPoint {
  name: string;
  value: number;
}

interface LineData {
  name: string;
  series: Array<DataPoint>;
}

@Component({
  selector: 'app-dtw-graph',
  templateUrl: './dtw-graph.component.html',
  styleUrls: ['./dtw-graph.component.scss']
})
export class DtwGraphComponent implements OnChanges {
  @Input() firstSequenceItems: Array<number>;
  @Input() secondSequenceItems: Array<number>;
  @Input() path: Array<number[]>;

  data: Array<LineData>;
  view: any[] = [700, 300];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Index';
  yAxisLabel = 'Value';
  tooltipDisabled = true;
  timeline = false;

  colorScheme = {
    domain: ['#7aa3e5', '#5AA454', '#E44D25']
  };

  constructor() {}

  ngOnChanges() {
    // DTW generation
    let data = new Array<LineData>();
    data = this.path.map(
      (x, index) => {
        return {
          name: 'DTW',
          series: [
            {
              name: index % 2 === 0 ? x[1].toString() : x[0].toString(),
              value: index % 2 === 0 ? this.firstSequenceItems[x[1]] : this.secondSequenceItems[x[0]],
            },
            {
              name: index % 2 === 1 ? x[1].toString() : x[0].toString(),
              value: index % 2 === 1 ? this.firstSequenceItems[x[1]] : this.secondSequenceItems[x[0]],
            },
          ]
        };
      });
    // Series adding
    data.push({
      name: 'Series1',
      series: this.firstSequenceItems.map(
        (x, index) => {
          return {
            name: index.toString(),
            value: x,
          };
        })
    });
    data.push({
      name: 'Series2',
      series: this.secondSequenceItems.map(
        (x, index) => {
          return {
            name: index.toString(),
            value: x,
          };
        })
    });

    this.data = data;
  }
}
