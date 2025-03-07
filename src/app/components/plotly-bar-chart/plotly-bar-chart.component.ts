import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyBarChartData } from '../../models/portfolio-models';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-plotly-bar-chart',
  imports: [PlotlyModule],
  templateUrl: './plotly-bar-chart.component.html',
  styleUrl: './plotly-bar-chart.component.css'
})
export class PlotlyBarChartComponent implements OnChanges {
  @Input() inputData!: PlotlyBarChartData

  public graph = {
    data: [
      {
        x:[],
        y:[],
        type:'bar'
      }
    ],
    height:0,
    layout: {
      title:{text:''},
      xaxis:{visible:true},
      yaxis:{visible:true}
    },
    config:{displayModeBar: false}
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.inputData){
      this.graph.data[0].x = this.inputData.x as never[];
      this.graph.data[0].y = this.inputData.y as never[];
      this.graph.layout.title.text = this.inputData.title;
      this.graph.height = this.inputData.height;
    }
  }
}
