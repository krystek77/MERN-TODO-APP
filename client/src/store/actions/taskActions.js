import type from './types';
import { configToken } from '../actions/userActions';

export const configTokenFormData = getState => {
	//get token from local storage
	const token = getState().user.token;
	const headers = {};
	//
	if (token) {
		headers['x-auth-token'] = token;
	}
	//
	return headers;
};

export const getAllTasks = controller => {
	return (dispatch, getState) => {
		dispatch({
			type: type.GET_TASKS_INIT,
		});

		fetch('http://localhost:4000/tasks', {
			method: 'GET',
			headers: configToken(getState),
			signal: controller.signal,
		})
			.then(result => {
				if (result.ok) {
					return result.json();
				}
				throw new Error();
			})
			.then(tasks => {
				dispatch({
					type: type.GET_TASKS_SUCCESS,
					tasks: tasks,
				});
			})
			.catch(error => {
				dispatch({
					type: type.GET_TASKS_ERROR,
				});
			});
	};
};
//
export const deleteTask = idTask => {
	return (dispatch, getState) => {
		fetch(`http://localhost:4000/tasks/${idTask}`, { method: 'DELETE' })
			.then(result => {
				console.log(result, idTask);
				dispatch({ type: type.DELETE_TASK, id: idTask });
			})
			.catch(error => {
				dispatch({ type: type.DELETE_TASK_ERROR, id: idTask });
			});
	};
};
//
export const createTask = task => {
	return (dispatch, getState) => {
		// console.log('TASK', task);
		fetch('http://localhost:4000/tasks', {
			method: 'POST',
			body: task,
			headers: configTokenFormData(getState),
		})
			.then(result => {
				// console.log(result);
				dispatch({ type: 'CREATE_TASK', task: task });
			})
			.catch(error => {
				dispatch({ type: 'CREATE_TASK_ERROR' });
			});
	};
};
//
export const editTask = (task, id) => {
	// console.log(id);
	return (dispatch, getState) => {
		fetch(`http://localhost:4000/tasks/${id}`, {
			method: 'PUT',
			body: task,
		})
			.then(response => {
				// console.log(response);
				return response.json();
			})
			.then(result => {
				dispatch({ type: type.EDIT_TASK, task: result.task, message: result.message });
			})
			.catch(error => {
				// console.log(error);
				dispatch({ type: type.EDIT_TASK_ERROR, error: error.message });
			});
	};
};
//
export const getTaskById = (idTask, abortController) => {
	return (dispatch, getState) => {
		fetch(`http://localhost:4000/tasks/${idTask}`, {
			method: 'GET',
			signal: abortController.signal,
		})
			.then(result => {
				// console.log(result);
				if (result.ok) {
					return result.json();
				}
			})
			.then(task => {
				dispatch({ type: type.GET_TASK_BY_ID, task: task });
			})
			.catch(error => console.log(error));
	};
};
//
export const finishTask = task => {
	// console.log(task);
	return (dispatch, getState) => {
		fetch(`http://localhost:4000/tasks/finish/${task._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		})
			.then(response => {
				// console.log(response);
				return response.json();
			})
			.then(result => {
				// console.log(result);
				dispatch({ type: type.FINISH_TASK, message: result.message, task: task });
			})
			.catch(error => {
				// console.log(error);
				dispatch({ type: type.FINISH_TASK_ERROR, message: error.message });
			});
	};
};
//
export const clearMessage = () => {
	return (dispatch, getState) => {
		dispatch({ type: type.CLEAR_MESSAGE, message: '' });
	};
};
