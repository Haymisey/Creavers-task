import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatTableModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  marks: any[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getMyMarks().subscribe((data: any[]) => {
      this.marks = data;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
