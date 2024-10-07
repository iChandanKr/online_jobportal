import { AuthService } from './services/auth.service';
import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {
  }
  title = 'client';
  ngOnInit(): void {
  }
}
