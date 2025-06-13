import { createContext } from 'react';
import TasksType from '../types/Task';
import { DEFAULT_TASKS } from '../constants/tasks';

const TasksContext = createContext<{
    tasks: TasksType[];
    setTasks: (tasks: TasksType[]) => void;
    tasksCollapsed: boolean;
    setTasksCollapsed: (collapsed: boolean) => void;
}>({
    tasks: DEFAULT_TASKS,
    setTasks: () => {},
    tasksCollapsed: true,
    setTasksCollapsed: () => {},
});

export default TasksContext;
