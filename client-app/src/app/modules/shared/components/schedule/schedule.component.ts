import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnChanges{
  @Input() startTime: number = 0;
  @Input() endTime: number = 24;

  timeSlots: number[] = Array.from({length: this.endTime - this.startTime}, (_, i) => i + this.startTime);
  @Input() occupiedSlots: number[] = [];
  selectedSlots: number[] = [];
  @Output() selectedSlotsChange = new EventEmitter<number[]>();

  isOccupied(slot: number): boolean {
    return this.occupiedSlots.includes(slot);
  }

  ngOnChanges() {
    this.timeSlots = Array.from({length: this.endTime - this.startTime}, (_, i) => i + this.startTime);
  }

  isSelected(slot: number): boolean {
    return this.selectedSlots.includes(slot);
  }

  selectSlot(slot: number): void {
    const index = this.selectedSlots.indexOf(slot);
    if (index > -1) {
      // If the slot is already selected, unselect all slots after it
      this.selectedSlots.splice(index);
    } else if (this.selectedSlots.length > 0) {
      const lastSlot = this.selectedSlots[this.selectedSlots.length - 1];
      if (slot === lastSlot + 1) {
        // If the slot is consecutive to the last selected slot
        this.selectedSlots.push(slot);
      } else {
        // If the slot is not consecutive, clear the selection and select the new slot
        this.selectedSlots = [slot];
      }
    } else {
      // If no slots are selected, select the slot
      this.selectedSlots.push(slot);
    }
    this.selectedSlotsChange.emit(this.selectedSlots);
  }

}
