import {
  Directive,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appHoverCard]',
  standalone: true
})
export class HoverCardDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {

    this.el.nativeElement.style.transform = 'translateY(-8px)';
    this.el.nativeElement.style.boxShadow =
      '0 10px 25px rgba(0,0,0,0.2)';
    this.el.nativeElement.style.backgroundColor = '#f8fbff';
    this.el.nativeElement.style.transition = '0.3s ease';
  }

  @HostListener('mouseleave')
  onMouseLeave() {

    this.el.nativeElement.style.transform = 'translateY(0)';
    this.el.nativeElement.style.boxShadow = 'none';
    this.el.nativeElement.style.backgroundColor = '';
  }
}
