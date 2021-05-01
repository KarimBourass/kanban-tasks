import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {


  todo = [
    'Get to work',
  ];
  inProgress = [
    'Firebase',
    'Anguarl CDK'
  ];

  done = [
    'Get up',
  ];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('previousContainer',event.previousContainer);
    console.log('container',event.container);
    console.log('event.container.data,',event.container.data,);
    console.log('event.previousIndex,',event.previousIndex,);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
