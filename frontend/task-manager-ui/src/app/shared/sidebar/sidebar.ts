import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  role = '';

  ngOnInit(): void {

    this.role = localStorage.getItem('role') || '';

  }

  logout(): void {

    localStorage.removeItem('role');

  }

}