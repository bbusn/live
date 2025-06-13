import { useState } from "react";
import TasksType from "../types/Task";
import TasksContext from "../contexts/TasksContext";
import User from "../objects/User";
import { DEFAULT_TASKS } from "../constants/tasks";

const TasksProvider = ({ children }: any) => {
    const [tasksCollapsed, setTasksCollapsed] = useState(true);
    const [tasks, setTasks] = useState<TasksType[]>(
        User.getInstance().tasks?.length ? User.getInstance().tasks : DEFAULT_TASKS
    );

    return (
        <TasksContext.Provider value={{ tasks, setTasks, tasksCollapsed, setTasksCollapsed }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
