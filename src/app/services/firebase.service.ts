import { Task } from './../models/task';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { filter, find, groupBy, map, takeWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private itemsCollection: AngularFirestoreCollection<Task> | undefined;
  constructor(private firestore: AngularFirestore) { }


  //The document take done-inprogress-todo
  getTasks(): Observable<Task[]> {
    this.itemsCollection = this.firestore.collection<Task>('task');
    return this.itemsCollection.snapshotChanges().pipe(
      map(tasks => {
        return tasks.map(
          task => {
            const data = task.payload.doc.data() as Task;
            const id = task.payload.doc.id;
            return { id, ...data };
          });
      })
    );
  }


  addTask(task: Task) {
    const id = Math.random().toString(36).substring(7);
    const item: Task = {
      status: '',
      description: '',
      index: 1
    }
    const addToFirebase = this.firestore.collection<Task>(task.status);
    addToFirebase.add(item);
  }

  updateTask(task: any, newStatus: String) {
    this.firestore.collection('task').doc(task.id).set({
      ...task,
      status: newStatus
    })
  }

  transferArrayItem(task: Task, containerData: string, previousIndex: any, currentIndex: any) {
    this.updateTask(task, containerData);
  }

}
