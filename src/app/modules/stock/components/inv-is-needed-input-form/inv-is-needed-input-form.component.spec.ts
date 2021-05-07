import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvIsNeededInputFormComponent } from './inv-is-needed-input-form.component';

describe('InvIsNeededInputFormComponent', () => {
  let component: InvIsNeededInputFormComponent;
  let fixture: ComponentFixture<InvIsNeededInputFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvIsNeededInputFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvIsNeededInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
