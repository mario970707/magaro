import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartHome } from './smart-home';

describe('SmartHome', () => {
  let component: SmartHome;
  let fixture: ComponentFixture<SmartHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
