import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCenter } from './project-center';

describe('ProjectCenter', () => {
  let component: ProjectCenter;
  let fixture: ComponentFixture<ProjectCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCenter],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCenter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
