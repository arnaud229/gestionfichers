import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingnUpComponent } from './singn-up.component';

describe('SingnUpComponent', () => {
  let component: SingnUpComponent;
  let fixture: ComponentFixture<SingnUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingnUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingnUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
