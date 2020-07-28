import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CombinazionePage } from './combinazione.page';

describe('CombinazionePage', () => {
  let component: CombinazionePage;
  let fixture: ComponentFixture<CombinazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinazionePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CombinazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
