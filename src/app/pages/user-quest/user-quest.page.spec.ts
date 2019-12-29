import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserQuestPage } from './user-quest.page';

describe('UserQuestPage', () => {
  let component: UserQuestPage;
  let fixture: ComponentFixture<UserQuestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserQuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
