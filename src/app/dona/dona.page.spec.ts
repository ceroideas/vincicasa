import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonaPage } from './dona.page';

describe('DonaPage', () => {
  let component: DonaPage;
  let fixture: ComponentFixture<DonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
