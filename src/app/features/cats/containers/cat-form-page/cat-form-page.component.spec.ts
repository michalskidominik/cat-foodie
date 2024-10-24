import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormPageComponent } from './cat-form-page.component';

describe('CatFormPageComponent', () => {
  let component: CatFormPageComponent;
  let fixture: ComponentFixture<CatFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
