import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.css'
})
export class DateFilterComponent {
  selectedOption: string = 'date'; // Default option
  selectedDate: string = ''; // For holding selected date
  selectedMonth: string = ''; // For holding selected month (YYYY-MM format)
  selectedYear: number = new Date().getFullYear(); // For holding selected year (default current year)

  optionSelected() {
    // Handle logic when option changes, e.g., filtering based on selection
    console.log('Selected Option:', this.selectedOption);
    console.log('Selected Date:', this.selectedDate);
    console.log('Selected Month:', this.selectedMonth);
    console.log('Selected Year:', this.selectedYear);
    // You can implement filtering or other logic based on selectedOption here
  }
}