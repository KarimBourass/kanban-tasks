import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent {

  @Input() minute!: number;
  @Input() seconde!: number;
  startTimerClicked : boolean = false;

  running = false;
  value = [25, 0];
  subscription!: Subscription;

  ngOnInit(): void {
    if (this.minute) {
      this.value[0] = this.minute;
    } else {
      this.minute = 25;
    }
    if (this.seconde) {
      this.value[1] = this.seconde;
    } else {
      this.seconde = 0;
    }
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  startTimer(): void {
    this.startTimerClicked = !this.startTimerClicked;
    if (!this.running) {
      // Set running to true.
      this.running = true;
      // Check if the timer is comeplete and if so reset it before starting.
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.resetTimer();
      }
      // Create Rxjs interval to call a update method every second.
      this.subscription = interval(1000).subscribe( x => this.updateTimer());
    }
  }

  stopTimer(): void {
    if (this.running) {
      this.startTimerClicked = !this.startTimerClicked;
      // Set running to false.
      this.running = false;
      // If we want to stop the timer then unsubscribe from the interval.
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }

  resetTimer(): void {
    // Set the minutes and seconds back to their original values.
    this.stopTimer();
    this.value = [this.minute, this.seconde];
  }

  updateTimer(): void {
    if (this.running) {
      // Check if the timer is comeplete and if so stop the timer and run onComplete().
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.stopTimer();
        // Make a sound/send an alert.
      } else if (this.value[0] !== 0 && this.value[1] === 0) {
        this.value = [this.value[0] - 1, 59];
      } else if (this.value[1] !== 0) {
        this.value = [this.value[0], this.value[1] - 1];
      }
    }
  }



}
