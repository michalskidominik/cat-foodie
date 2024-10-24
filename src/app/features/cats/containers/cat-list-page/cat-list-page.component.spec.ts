import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatListPageComponent } from './cat-list-page.component';

describe('CatListPageComponent', () => {
  let component: CatListPageComponent;
  let fixture: ComponentFixture<CatListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
