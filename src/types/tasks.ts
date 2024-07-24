export interface ITask {
    id: string;
    title: string | null;
    description: string | null;
    tags: number[];
    completed?: boolean;
}