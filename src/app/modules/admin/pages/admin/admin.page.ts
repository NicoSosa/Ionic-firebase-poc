import { Component, OnInit } from '@angular/core';
import { ADMIN_PAGE_TITLE_TOOLBAR, ADMIN_PAGE_CARDS } from '../../constants/adminPageConstants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public tittleToolbar = ADMIN_PAGE_TITLE_TOOLBAR;
  public adminPageCards = ADMIN_PAGE_CARDS;

  constructor() { }

  ngOnInit() {
  }

}
