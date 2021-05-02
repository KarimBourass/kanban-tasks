import { Task } from './../../models/task';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  status = ['todo', 'inprogress', 'done'];
  constructor(private fireService: FirebaseService) { }

  ngOnInit(): void {
  }


  onSubmit(contactForm: any) {
    const task: Task = {
      status: contactForm.value.status,
      description: contactForm.value.description
    }
    this.fireService.addTask(task)
  }

}
