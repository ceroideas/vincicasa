import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NautomaticosPage } from './nautomaticos.page';

describe('NautomaticosPage', () => {
  let component: NautomaticosPage;
  let fixture: ComponentFixture<NautomaticosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NautomaticosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NautomaticosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
