import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyPieChartData } from '../../models/portfolio-models';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-plotly-pie-chart',
  imports: [PlotlyModule],
  templateUrl: './plotly-pie-chart.component.html',
  styleUrl: './plotly-pie-chart.component.css'
})
export class PlotlyPieChartComponent implements OnChanges {

  @Input() inputData!: PlotlyPieChartData;

  public graph = {
    data: [
      {
        values:[],
        labels:[],
        type:'pie'
      }
    ],
    layout: {
      title:{text:''},
      autosize: true,
    },
    config:{
      displayModeBar: false,
      responsive: true
    },
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.inputData){
      this.graph.data[0].values = this.inputData.values as never[];
      this.graph.data[0].labels = this.inputData.labels as never[];
      this.graph.layout.title.text = this.inputData.title;
    }
  }

}
