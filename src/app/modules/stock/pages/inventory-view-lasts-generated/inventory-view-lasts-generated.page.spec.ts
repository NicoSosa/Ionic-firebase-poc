import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryViewLastsGeneratedPage } from './inventory-view-lasts-generated.page';

describe('InventoryViewLastsGeneratedPage', () => {
  let component: InventoryViewLastsGeneratedPage;
  let fixture: ComponentFixture<InventoryViewLastsGeneratedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryViewLastsGeneratedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryViewLastsGeneratedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
