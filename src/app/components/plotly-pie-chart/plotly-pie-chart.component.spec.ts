import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyPieChartComponent } from './plotly-pie-chart.component';

describe('PlotlyPieChartComponent', () => {
  let component: PlotlyPieChartComponent;
  let fixture: ComponentFixture<PlotlyPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotlyPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotlyPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
