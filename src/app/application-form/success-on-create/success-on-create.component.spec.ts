import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOnCreateComponent } from './success-on-create.component';

describe('SuccessOnCreateComponent', () => {
  let component: SuccessOnCreateComponent;
  let fixture: ComponentFixture<SuccessOnCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessOnCreateComponent]
    });
    fixture = TestBed.createComponent(SuccessOnCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
