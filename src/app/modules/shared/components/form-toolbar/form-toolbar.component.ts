import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-toolbar',
  templateUrl: './form-toolbar.component.html',
  styleUrls: ['./form-toolbar.component.scss'],
})
export class FormToolbarComponent implements OnInit {
  @Input() tittleToolbar: string;
  @Input() urlBack: string;
  @Output() clearForm = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl(this.urlBack);
  }

  clearEvent() {
    this.clearForm.emit(true);
  }
}
