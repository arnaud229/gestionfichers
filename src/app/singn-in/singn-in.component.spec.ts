import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingnInComponent } from './singn-in.component';

describe('SingnInComponent', () => {
  let component: SingnInComponent;
  let fixture: ComponentFixture<SingnInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingnInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingnInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
