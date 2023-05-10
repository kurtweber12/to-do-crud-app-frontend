const API_URL = "http://localhost:8000";

async function httpSubmitTask(data) {
	try {
		return await fetch(`${API_URL}/new`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
	} catch (error) {
		console.log(err);
		return {
			ok: false,
		};
	}
}

async function httpUpdateTask(data, id) {
	try {
		return await fetch(`${API_URL}/tasks/${id}`, {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
	} catch (error) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

async function httpGetSingleTask(id) {
	try {
		const response = await fetch(`${API_URL}/tasks/${id}`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

async function httpGetAllTasks() {
	try {
		const response = await fetch(`${API_URL}/tasks`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

async function httpDeleteTask(task_id) {
	try {
		return await fetch(`${API_URL}/tasks/${task_id}`, {
			method: "delete",
		});
	} catch (error) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

export {
	httpSubmitTask,
	httpGetAllTasks,
	httpDeleteTask,
	httpUpdateTask,
	httpGetSingleTask,
};
