import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FivExpandable } from '@fivethree/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class AppCardComponent implements OnInit {

  @ViewChild('ex') fivExpandable: FivExpandable;
  @Input() public title: string;
  @Input() public isOpen = false;
  @Input() public subtitle: string;
  @Input() public color = '';
  @Input() public mode: 'button' | 'expandable' | 'base' = 'expandable';
  @Input() public icon = 'chevron-down-outline';

  constructor() {
  }

  ngOnInit() {
  }

  public toggle() {
    console.log('[silicia card] toggle');
    this.fivExpandable.toggle();
  }

  public open() {
    console.log('[silicia card] open');
    this.fivExpandable.open();
  }

  public close() {
    console.log('[silicia card] close');
    this.fivExpandable.close();
  }
}
