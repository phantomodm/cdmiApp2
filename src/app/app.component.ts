import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokenService } from './services/auth-token.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cdmiApp';
  constructor(public user: UserService, private token: AuthTokenService) {}
  ngOnInit(): void {}
  logout() {
    this.user.logout();
  }
}
