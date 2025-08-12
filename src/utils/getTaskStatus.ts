import type { TaskModel } from "../models/TaskModel";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel){
    console.log('task')
    console.log(activeTask)
    if(task.completeDate) return 'Completa';
    if(task.interruptDate) return 'Interrompida';
    if(task.id === activeTask?.id) return 'Em progresso';
    return 'Abandonada';
}