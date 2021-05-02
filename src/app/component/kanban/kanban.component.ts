import { AddTaskModalComponent } from './../add-task-modal/add-task-modal.component';
import { FirebaseService } from './../../services/firebase.service';
import { Task } from './../../models/task';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {


  todo: Task[] | undefined;
  inProgress: Task[] | undefined;
  done: Task[] | undefined;


  constructor(private fireService: FirebaseService,public dialog: MatDialog) {

    this.fireService.getTasks().subscribe(
      items => {
        this.todo = items.filter((item: any) => item.status == 'todo')
      }
    )

    this.fireService.getTasks().subscribe(
      items => {
        this.inProgress = items.filter((item: any) => item.status == 'inprogress')
      }
    )

    this.fireService.getTasks().subscribe(
      items => {
        this.done = items.filter((item: any) => item.status == 'done')
      }
    )

  }


  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.fireService.transferArrayItem(event.previousContainer.data[event.previousIndex],
        event.container.id,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openAdddTaskModal() {
    const dialogRef = this.dialog.open(AddTaskModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
