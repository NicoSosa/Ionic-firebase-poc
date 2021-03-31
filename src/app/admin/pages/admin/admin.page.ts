import { Component, OnInit } from '@angular/core';
import { ADMIN_PAGE_TITLE_TOOLBAR, ADMIN_PAGE_CARDS } from '../../constants/adminPageConstants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public tittleToolbar = ADMIN_PAGE_TITLE_TOOLBAR;
  public adminPageCards = ADMIN_PAGE_CARDS;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToUrl(url: string) {
    this.router.navigateByUrl(`admin/${url}`)
  }
}
