import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DataCardsComponent } from './data-cards/data-cards.component';
import { StateFilterComponent } from './state-filter/state-filter.component';
import { DateFilterComponent } from './date-filter/date-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LineChartComponent,DataCardsComponent, StateFilterComponent, DateFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InterbizTask';
}
