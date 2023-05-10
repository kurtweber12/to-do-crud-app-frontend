import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { httpUpdateTask } from "@/hooks/requests";
import Link from "next/link";
import {
	PlusCircleIcon,
	HomeIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";

const Update = () => {
	const router = useRouter();
	const [task, setTask] = useState("");
	const [error, setError] = useState(false);
	const [errorFree, setErrorFree] = useState(false);
	const [tasksResponse, setTasksResponse] = useState([]);

	const id = router.query.slug;

	const handleSubmit = async () => {
		console.log(`Task: ${task}`);
		const data = {
			name: task,
		};
		console.log(JSON.stringify(data));
		const result = await httpUpdateTask(data, id);
		if (result.ok) {
			await setErrorFree(true);
		}
	};

	useEffect(() => {
		fetch(`http://localhost:8000/tasks/${id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTasksResponse(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between py-24">
			<div className="flex flex-col w-[70%] items-center bg-white/50 rounded-lg">
				<h1 className="font-thin text-4xl tracking-widest pt-2">Update Task</h1>
				<div className="flex flex-row w-[90%] border border-y border-gray-300 mx-4 my-4" />
				<div>
					<p className="text-2xl font-thin tracking-wider pb-4">
						Current Task:{" "}
						<span className="font-normal text-yellow-200">
							{tasksResponse.name}
						</span>
					</p>
				</div>
				<form className="flex flex-row w-full justify-between px-8 items-center pb-4">
					<label className="text-2xl">New Task Name:</label>
					<input
						type="text"
						placeholder="Task Name"
						className="text-black w-[80%] h-12 px-4"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
				</form>
				<div className="flex flex-row w-full justify-end mr-24 pb-4 space-x-4">
					<Link href="/">
						<div className="flex flex-row space-x-2 justify-center items-center bg-blue-400 rounded-full px-4 py-2">
							<HomeIcon className="h-8 w-8" />
							<p>Home</p>
						</div>
					</Link>
					<a
						onClick={() => {
							const data = task;
							handleSubmit(data);
						}}
						className="hover:cursor-pointer"
					>
						<div className="flex flex-row space-x-2 justify-center items-center bg-green-400 rounded-full px-4 py-2">
							<PencilSquareIcon className="h-8 w-8" />
							<p>Update Task</p>
						</div>
					</a>
				</div>
				{error ? (
					<p className="text-3xl text-red-400">
						An error occured while trying to add new task.
					</p>
				) : (
					<></>
				)}

				{errorFree ? (
					<p className="text-3xl text-green-400">Task updated successfully!</p>
				) : (
					<></>
				)}
			</div>
		</main>
	);
};

export default Update;
