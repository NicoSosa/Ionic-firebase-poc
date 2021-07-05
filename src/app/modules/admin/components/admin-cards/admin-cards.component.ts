import { Component, Input, OnInit } from '@angular/core';
import { AdminPageCard } from '../../constants/adminPageConstants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.scss'],
})
export class AdminCardsComponent implements OnInit {
  @Input() card: AdminPageCard;

  constructor(private router: Router) { }

  ngOnInit() {}


  goToUrl(url: string) {
    this.router.navigateByUrl(`admin/${url}`)
  }
  
}
