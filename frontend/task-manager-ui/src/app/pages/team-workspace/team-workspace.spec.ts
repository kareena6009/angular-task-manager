import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWorkspace } from './team-workspace';

describe('TeamWorkspace', () => {
  let component: TeamWorkspace;
  let fixture: ComponentFixture<TeamWorkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamWorkspace],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamWorkspace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
