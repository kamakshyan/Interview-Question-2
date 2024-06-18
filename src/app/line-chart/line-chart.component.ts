import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { HttpClient } from '@angular/common/http';
import { title } from 'node:process';
import { filter } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges {
  @Input() selectedState: string = '';
  @Input() startDate: string = '';
  @Input() endDate: string = '';

  data: any;
  options: any;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedState'] || changes['startDate'] || changes['endDate']) {
      this.fetchData();
    }
  }

  fetchData() {
    if (!this.selectedState || !this.startDate || !this.endDate) {
      return;
    }

    const state = this.selectedState.toLowerCase();
    const apiUrl = `https://api.covidtracking.com/v1/states/${state}/daily.json`;

    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        const filteredData = data.filter(item => item.date >= this.startDate && item.date <= this.endDate);
        const dates = filteredData.map(item => item.date).reverse(); // Reversing Data as we need it in ascending order.
        const totals = filteredData.map(item => item.positiveIncrease).reverse(); // Data received from API is in Descending order

        this.data = {
          labels: dates,
          datasets: [
            {
              label: 'Total Cases',
              type: 'line',
              data: totals,
              fill: true,
              // Blue Line Chart
              backgroundColor: "rgb(216,230,253,0.5)",
              borderColor: '#42A5F5',
              //Orange Line Chart
              // backgroundColor:"rgba(255,167,38,0.2)",
              // borderColor: "rgb(249,115,22)",
              borderWidth: 1,
              tension: 0.5
            },
              // {
              //   label: 'Total Cases',
              //   type: 'bar',
              //   data: totals,
              //   fill: false,
              //   borderColor: '#42A5F5',
              //   tension: 0.5
              // }
          ]
        };

        this.options = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
            legend: {
              labels: {
                color: '#495057'
              }
            }
          },
          scales: {
            x: {
              position: 'bottom',
              title: {
                display: true,
                text: "Date",
                color: '#000', // Color of the label text
                font: {
                  size: 17 // Font size of the label text
                }
              },
              ticks: {
                color: '#6c757d'
              },
              grid: {
                color: '#dee2e6',
                drawBorder: false
              }
            },
            y: {
              position: 'bottom',
              title: {
                display: true,
                text: "Number of cases",
                color: '#000', // Color of the label text
                font: {
                  size: 17 // Font size of the label text
                }
              },
              ticks: {
                color: '#6c757d'
              },
              grid: {
                color: '#dee2e6',
                drawBorder: false
              }
            }
          }
        };
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
}
