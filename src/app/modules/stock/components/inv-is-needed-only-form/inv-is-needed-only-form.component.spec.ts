import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvIsNeededOnlyFormComponent } from './inv-is-needed-only-form.component';

describe('InvIsNeededOnlyFormComponent', () => {
  let component: InvIsNeededOnlyFormComponent;
  let fixture: ComponentFixture<InvIsNeededOnlyFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvIsNeededOnlyFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvIsNeededOnlyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
