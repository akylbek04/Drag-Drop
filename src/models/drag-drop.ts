export interface Draggable {
  dragStart: (e: DragEvent) => void;
  dragEnd: (e: DragEvent) => void;
}

export interface DragTarget {
  dragOver: (e: DragEvent) => void;
  dragLeave: (e: DragEvent) => void;
  drop: (e: DragEvent) => void;
}
