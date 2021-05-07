import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvOnlyInputFormComponent } from './inv-only-input-form.component';

describe('InvOnlyInputFormComponent', () => {
  let component: InvOnlyInputFormComponent;
  let fixture: ComponentFixture<InvOnlyInputFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvOnlyInputFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvOnlyInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
