import { Component, OnInit } from '@angular/core';
import { ADMIN_URL, ADMIN_USERS_TITLE_TOOLBAR } from '../../constants/adminPageConstants';

@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.page.html',
  styleUrls: ['./adm-users.page.scss'],
})
export class AdmUsersPage implements OnInit {
  public tittleToolbar = ADMIN_USERS_TITLE_TOOLBAR;
  public urlBack = ADMIN_URL;

  constructor() { }

  ngOnInit() {
  }

}
