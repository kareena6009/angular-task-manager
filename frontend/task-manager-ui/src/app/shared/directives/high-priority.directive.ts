import {
  Directive,
  ElementRef,
  Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appHighPriority]',
  standalone: true
})
export class HighPriorityDirective implements OnInit {

  @Input() priority = '';

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit(): void {

    if (this.priority === 'High') {

      this.el.nativeElement.style.border =
        '3px solid #ef4444';

    }

  }

}