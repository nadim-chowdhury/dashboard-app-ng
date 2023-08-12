import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.scss'],
})
export class BigCardComponent {
  // @ViewChild('chartCanvas') chartCanvas: ElementRef;
  // private chart: Chart;
  // constructor() {}
  // ngOnInit(): void {
  //   this.createChart();
  // }
  // createChart() {
  //   const ctx = this.chartCanvas.nativeElement.getContext('2d');
  //   const labels = Utils.months({ count: 7 });
  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: {
  //         label: 'My First Dataset',
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         fill: false,
  //         borderColor: 'rgb(75, 192, 192)',
  //         tension: 0.1,
  //       },
  //     },
  //   });
  // }
}
