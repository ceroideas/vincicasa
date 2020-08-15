import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrequentiPage } from './frequenti.page';

describe('FrequentiPage', () => {
  let component: FrequentiPage;
  let fixture: ComponentFixture<FrequentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequentiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrequentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
