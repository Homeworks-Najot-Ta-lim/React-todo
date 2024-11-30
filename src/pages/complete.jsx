import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CompletedTasks() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks); 
    }, []);

    const notifyError = (message) =>
        toast.error(message, { position: "top-right", autoClose: 3000 });
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        notifyError("Task deleted ❌");
    };  

    const completedTasks = tasks.filter((task) => task.completed);
    return (
        <div className="inline-flex w-[100vw] h-[10vh] items-center justify-center">
            <div className="grid place-items-center">
            <div className="completed-tasks mt-5 w-[100%]">
            <h2 className="text-xl font-bold mb-3">Completed Tasks</h2>
            {completedTasks.length > 0 ? (
                <ul className="w-[100%]">
                    {completedTasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between p-3 rounded-lg border mb-2 bg-green-100"
                        >
                            <div className="flex-1">
                                <span className="text-xl line-through">{task.text}</span>
                                <div className="text-sm text-gray-500">{task.timestamp}</div>
                            </div>
                            <FaTrashAlt
                                onClick={() => deleteTask(task.id)}
                                className="cursor-pointer text-red-500 text-2xl"
                                aria-label="Delete task"
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No completed tasks.</p>
            )}
        </div>
        </div>
        <ToastContainer />
        </div>
    );
}
