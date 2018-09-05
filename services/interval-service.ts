import { createId } from '../utils/id';


export class IntervalService {

    private jobs: { [key: string]: NodeJS.Timer }

    public start(fn: Function, interval: number, executions: number = -1): string {
        let job: NodeJS.Timer;
        let jobFn: Function;
        if (executions > 0) {
            job = setInterval(() => --executions < 1 ? clearInterval(job) : fn(), interval);
        } else {
            job = setInterval(() => fn(), interval);
        }
        return this.saveJob(job);
    }

    public stop(id: string): void {
        let job = this.jobs[id];
        if (job) {
            clearInterval(job);
            this.jobs[id] = undefined;
        }
    }

    private saveJob(job: NodeJS.Timer): string {
        let id = createId();
        this.jobs[id] = job;
        return id;
    }


}