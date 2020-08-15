import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetardatiPage } from './retardati.page';

describe('RetardatiPage', () => {
  let component: RetardatiPage;
  let fixture: ComponentFixture<RetardatiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetardatiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetardatiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
