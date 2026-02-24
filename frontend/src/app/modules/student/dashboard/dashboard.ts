import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatTableModule, MatIconModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  marks: any[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('Student Dashboard Initialized. User:', this.authService.currentUserValue);
    this.dataService.getMyMarks().subscribe((data: any[]) => {
      console.log('Student marks/curriculum received:', data);
      this.marks = data;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTeacherForMark(mark: any): string {
    return mark.teacher?.name || 'N/A';
  }
}
