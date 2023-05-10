import { PlusCircleIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { httpSubmitTask } from "@/hooks/requests";

const Add = () => {
	const [task, setTask] = useState("");
	const [error, setError] = useState(false);
	const [errorFree, setErrorFree] = useState(false);

	const handleSubmit = async (event) => {
		console.log(`Task: ${task}`);
		const data = {
			name: task,
		};
		console.log(JSON.stringify(data));
		const result = await httpSubmitTask(data);
		if (result.statusText === "Created") {
			await setErrorFree(true);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between py-24">
			<div className="flex flex-col w-[70%] items-center bg-white/50 rounded-lg">
				<h1 className="font-thin text-4xl tracking-widest pt-2">Add Task</h1>
				<div className="flex flex-row w-[90%] border border-y border-gray-300 mx-4 my-4" />
				<form className="flex flex-row w-full justify-between px-8 items-center pb-4">
					<label className="text-2xl">Task Name:</label>
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
							<PlusCircleIcon className="h-8 w-8" />
							<p>Add Task</p>
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
					<p className="text-3xl text-green-400">
						New task added successfully!
					</p>
				) : (
					<></>
				)}
			</div>
		</main>
	);
};

export default Add;
