import { trigger, state, style, transition, animate } from '@angular/animations';

export const animations = [
  trigger('in', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-1rem)' }),
      animate('300ms ease-in', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
    ]),
  ])
];
