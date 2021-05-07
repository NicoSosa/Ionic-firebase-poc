import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvIsNeededHideFormComponent } from './inv-is-needed-hide-form.component';

describe('InvIsNeededHideFormComponent', () => {
  let component: InvIsNeededHideFormComponent;
  let fixture: ComponentFixture<InvIsNeededHideFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvIsNeededHideFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvIsNeededHideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
