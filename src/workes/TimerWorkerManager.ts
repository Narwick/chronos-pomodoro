import type { TaskStateModel } from "../models/TaskStateModel";

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
    private worker: Worker;
    private constructor() {
        this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
    }

    static getInstance(): TimerWorkerManager {
        if (!instance) {
            instance = new TimerWorkerManager();
        }
        return instance;
    }
    postMessage(message: TaskStateModel): void {
        this.worker.postMessage(message);
    }

    onmessage(callback: (event: MessageEvent) => void): void {
        this.worker.onmessage = callback;
    }
    terminate(): void {
        this.worker.terminate();
        instance = null;
    }
}