import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountleftmenuComponent } from './myaccountleftmenu.component';

describe('MyaccountleftmenuComponent', () => {
  let component: MyaccountleftmenuComponent;
  let fixture: ComponentFixture<MyaccountleftmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccountleftmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountleftmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
