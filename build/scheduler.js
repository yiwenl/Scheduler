// Scheduler.js
const FRAMERATE = 60;

class Scheduler {

	constructor() {
		this._delayTasks = [];
		this._nextTasks = [];
		this._deferTasks = [];
		this._highTasks = [];
		this._usurpTask = [];
		this._enterframeTasks = [];
		this._idTable = 0;

		this._loop();
	}

	//  PUBLIC METHODS

	addEF(func, params) {
		params = params || [];
		const id = this._idTable;
		this._enterframeTasks[id] = { func, params };
		this._idTable++;
		return id;
	}

	removeEF(id) {
		if (this._enterframeTasks[id] !== undefined) {
			this._enterframeTasks[id] = null;
		}
		return -1;
	}

	delay(func, params, delay) {
		const time = new Date().getTime();
		const t = { func, params, delay, time };
		this._delayTasks.push(t);
	}

	defer(func, params) {
		const t = { func, params };
		this._deferTasks.push(t);
	}

	next(func, params) {
		const t = { func, params };
		this._nextTasks.push(t);
	}

	usurp(func, params) {
		const t = { func, params };
		this._usurpTask.push(t);
	}

	//  PRIVATE METHODS

	_process() {
		let i = 0;
		let task;
		let interval;
		let current;
		for (i = 0; i < this._enterframeTasks.length; i++) {
			task = this._enterframeTasks[i];
			if (task !== null && task !== undefined) {
				task.func(task.params);
			}
		}

		while (this._highTasks.length > 0) {
			task = this._highTasks.pop();
			task.func(task.params);
		}

		let startTime = new Date().getTime();

		for (i = 0; i < this._delayTasks.length; i++) {
			task = this._delayTasks[i];
			if (startTime - task.time > task.delay) {
				task.func(task.params);
				this._delayTasks.splice(i, 1);
			}
		}

		startTime = new Date().getTime();
		interval = 1000 / FRAMERATE;
		while (this._deferTasks.length > 0) {
			task = this._deferTasks.shift();
			current = new Date().getTime();
			if (current - startTime < interval) {
				task.func(task.params);
			} else {
				this._deferTasks.unshift(task);
				break;
			}
		}

		startTime = new Date().getTime();
		interval = 1000 / FRAMERATE;
		while (this._usurpTask.length > 0) {
			task = this._usurpTask.shift();
			current = new Date().getTime();
			if (current - startTime < interval) {
				task.func(task.params);
			}
		}

		this._highTasks = this._highTasks.concat(this._nextTasks);
		this._nextTasks = [];
		this._usurpTask = [];
	}

	_loop() {
		this._process();
		window.requestAnimFrame(() => this._loop());
	}
}

const scheduler = new Scheduler();

export default scheduler;