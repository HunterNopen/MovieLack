import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmGalleryComponent } from './film-gallery.component';

describe('FilmGalleryComponent', () => {
  let component: FilmGalleryComponent;
  let fixture: ComponentFixture<FilmGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
