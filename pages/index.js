import Image from "next/image";
import { Inter } from "next/font/google";
import {
	PlusCircleIcon,
	TrashIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { httpGetAllTasks, httpDeleteTask } from "@/hooks/requests";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [tasksResponse, setTasksResponse] = useState([]);
	const [httpTasks, setHttpTasks] = useState([]);

	useEffect(() => {
		setHttpTasks(httpGetAllTasks());
		console.log(httpTasks);
	}, []);

	useEffect(() => {
		fetch("http://localhost:8000/tasks")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTasksResponse(data);
			})
			.catch((err) => {
				console.log(err);
			});

		setHttpTasks(httpGetAllTasks());
		console.log(httpTasks);
	}, []);

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between py-24 ${inter.className}`}
		>
			<div className="flex flex-col w-[70%] items-center bg-white/50 rounded-lg">
				<h1 className="font-thin text-4xl tracking-widest pt-2">
					Lurt's To Do List
				</h1>
				<div className="flex flex-row w-full justify-end space-x-8 pr-4 py-2">
					<Link href="/add">
						<div className="flex flex-row space-x-2 justify-center items-center bg-green-400 rounded-full px-4 py-2">
							<PlusCircleIcon className="h-8 w-8" />
							<p>Add Task</p>
						</div>
					</Link>
				</div>
				<div className="flex flex-col w-full min-h-96 px-4 pb-4">
					<div className="flex flex-row bg-black w-full items-center py-2 rounded-md">
						<div className="flex flex-col  justify-center  px-4 w-[10%]">
							<p className="text-lg font-light tracking-wider">Date Created</p>
						</div>
						<div className="border-x border-gray-300 h-10" />
						<div className="flex flex-col justify-center  px-4 w-[60%]">
							<p className="text-lg font-light tracking-wider">Task Name</p>
						</div>
						<div className="border-x border-gray-300 h-10" />
						<div className="flex flex-col  justify-center  px-4 w-[10%]">
							<p className="text-lg font-light tracking-wider">Last Updated</p>
						</div>
						<div className="border-x border-gray-300 h-10" />
						<div className="flex flex-col justify-center px-4 w-[20%]">
							<p className="text-lg font-light tracking-wider">
								Update / Delete
							</p>
						</div>
					</div>
					<div className="border border-y border-gray-300 mx-4 my-4" />
					<div className="flex flex-col w-full space-y-4">
						{tasksResponse.length > 0 ? (
							tasksResponse.map((task, i) => (
								<div
									className="flex flex-row bg-black w-full h-16 items-center rounded-md"
									key={task.id}
								>
									<div className="w-[10%] px-4">{task.date_created}</div>
									<div className="border-x border-gray-300 h-10" />
									<div className="w-[60%] px-4">{task.name}</div>
									<div className="border-x border-gray-300 h-10" />
									<div className="w-[10%] px-4">{task.date_updated}</div>
									<div className="border-x border-gray-300 h-10" />
									<div className="w-[20%] px-4 flex flex-row justify-evenly">
										<Link href={`/update/${task.id}`}>
											<div className="flex flex-col justify-center items-center bg-blue-400 rounded-full px-4 py-2">
												<PencilSquareIcon className="h-6 w-6" />
											</div>
										</Link>
										<a
											className="hover:cursor-pointer"
											onClick={() => {
												httpDeleteTask(task.id);
												window.location.reload(false);
											}}
										>
											<div className="flex flex-col justify-center items-center bg-red-400 rounded-full px-4 py-2">
												<TrashIcon className="h-6 w-6" />
											</div>
										</a>
									</div>
								</div>
							))
						) : (
							<></>
						)}

						{/* {tasks.map((task, i) => (
							<div
								className="flex flex-row bg-black w-full h-16 items-center rounded-md"
								key={i}
							>
								<div className="w-[10%] px-4">{task.created}</div>
								<div className="border-x border-gray-300 h-10" />
								<div className="w-[60%] px-4">{task.task}</div>
								<div className="border-x border-gray-300 h-10" />
								<div className="w-[10%] px-4">{task.updated}</div>
								<div className="border-x border-gray-300 h-10" />
								<div className="w-[20%] px-4 flex flex-row justify-evenly">
									<Link href="/update">
										<div className="flex flex-col justify-center items-center bg-blue-400 rounded-full px-4 py-2">
											<PencilSquareIcon className="h-6 w-6" />
										</div>
									</Link>
									<Link href="/">
										<div className="flex flex-col justify-center items-center bg-red-400 rounded-full px-4 py-2">
											<TrashIcon className="h-6 w-6" />
										</div>
									</Link>
								</div>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</main>
	);
}
