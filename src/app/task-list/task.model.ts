export interface Task {
    id: number,
    projectId: number,
    detail: string,
    status: STATUS,
    assignedToUserID: number,
    createdOn: Date
}

export enum STATUS
{
    New = 0,
    InProgress = 1,
    QA = 2,
    Completed = 3
}