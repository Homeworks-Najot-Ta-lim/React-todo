import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function AllTodos() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    const notifySuccess = (message) =>
        toast.success(message, { position: "top-right", autoClose: 3000 });

    const notifyError = (message) =>
        toast.error(message, { position: "top-right", autoClose: 3000 });

    const addTask = () => {
        if (!newTask.trim()) {
            notifyError("Task cannot be empty!");
            return;
        }

        const newTaskObj = {
            id: Date.now(),
            text: newTask,
            completed: false,
            timestamp: new Date().toLocaleString(),
        };
        setTasks([...tasks, newTaskObj]);
        setNewTask("");
        notifySuccess("Task created successfully ✅");
    };

    const toggleComplete = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        notifyError("Task deleted ❌");
    };

    const editTask = (id, currentText) => {
        Swal.fire({
            title: "Edit Task",
            input: "text",
            inputValue: currentText,
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
                if (!value.trim()) {
                    return "Task cannot be empty!";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTasks = tasks.map((task) =>
                    task.id === id ? { ...task, text: result.value } : task
                );
                setTasks(updatedTasks);
                Swal.fire("Success", "Task updated successfully ✅", "success");
            }
        });
    };

    return (
        <div className="grid place-items-center w-[97vw] h-[90vh]">
            <div className="grid place-items-center">
                <div className="input-container grid grid-cols-6 gap-2">
                    <input
                        type="text"
                        placeholder="Create task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="col-span-4 text-xl p-3 rounded-lg border border-solid placeholder:text-blue-500"
                    />
                    <button
                        onClick={addTask}
                        className="col-span-2 text-xl p-3 rounded-lg border border-solid bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Create
                    </button>
                </div>

                <div className="todos mt-5 w-[100%]">
                    <ul className="w-[100%]">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className={`flex items-center justify-between p-3 rounded-lg border mb-2 w-[100%] ${
                                    task.completed ? "bg-green-100" : "bg-white"
                                }`}
                            >
                                <FaCheckCircle
                                    onClick={() => toggleComplete(task.id)}
                                    className={`cursor-pointer text-2xl ${
                                        task.completed
                                            ? "text-green-500"
                                            : "text-gray-400"
                                    }`}
                                />
                                <div className="flex-1 ml-3">
                                    <span
                                        className={`text-xl ${
                                            task.completed ? "line-through" : ""
                                        }`}
                                    >
                                        {task.text}
                                    </span>
                                    <div className="text-sm text-gray-500">
                                        {task.timestamp}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <FaEdit
                                        onClick={() => editTask(task.id, task.text)}
                                        className="cursor-pointer text-blue-500 text-2xl"
                                    />
                                    <FaTrashAlt
                                        onClick={() => deleteTask(task.id)}
                                        className="cursor-pointer text-red-500 text-2xl"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}
