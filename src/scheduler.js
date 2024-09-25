let enterframeFunc = window.requestAnimationFrame;
let frameRate = 60;
let timeScale = 1;
let currentTime = 0;
let deltaTime = 0;
let prevTime = 0;

// tasks
const enterframeTasks = new Map();
const delayTasks = [];
let highTasks = [];
let nextTasks = [];

// indexing
let idTable = 0;

/**
 * Add an enterframe task
 *
 * @param {function} mFunc the function to be called in enterframe
 * @param {object} mArgs the arguments for the function
 * @returns {number} the id of the task
 * @throws {Error} Throws an error if the provided mFunc is not a function.
 */
function addEF(mFunc, mArgs) {
  if (typeof mFunc !== "function") {
    throw new Error("Invalid function provided for enterframe task.");
  }

  const id = ++idTable;
  enterframeTasks.set(id, { func: mFunc, args: mArgs });
  return id;
}

/**
 * Remove an enterframe task
 *
 * @param {number} mIndex the id of the task to be removed
 * @returns {number} return -1
 */
function removeEF(mIndex) {
  enterframeTasks.delete(mIndex);

  return -1;
}

/**
 * Add a delayed task
 *
 * @param {function} mFunc the function to be called
 * @param {number} mDelay the delay time for the task
 * @param {object} mArgs the arguments for the function
 * @param {bool} mRepeat if the task should repeat
 * @throws {Error} Throws an error if the provided mFunc is not a function.
 */
function delay(mFunc, mDelay, mArgs, mRepeat = false) {
  if (typeof mFunc !== "function") {
    throw new Error("Invalid function provided for delayed task.");
  }

  delayTasks.push({
    func: mFunc,
    args: mArgs,
    delay: mDelay,
    time: currentTime,
    repeat: mRepeat,
  });
}

/**
 * Schedules a function to be executed in the next frame.
 *
 * @param {Function} mFunc - The function to be executed.
 * @param {Array} mArgs - The arguments to be passed to the function.
 * @throws {Error} Throws an error if the provided mFunc is not a function.
 */
function next(mFunc, mArgs) {
  if (typeof mFunc !== "function") {
    throw new Error("Invalid function provided for next frame task.");
  }
  nextTasks.push({ func: mFunc, args: mArgs });
}

/**
 * Sets the frame rate and defines the enterframe function.
 *
 * @param {number} mFrameRate - The desired frame rate in frames per second.
 */
function setFrameRate(mFrameRate) {
  frameRate = mFrameRate;

  enterframeFunc = (mFunc) => {
    requestAnimationFrame((timestamp) => {
      const desiredTime = 1000 / frameRate;
      const timeDiff = timestamp - prevTime;
      if (timeDiff >= desiredTime) {
        mFunc(timestamp);
      } else {
        setTimeout(() => enterframeFunc(mFunc), desiredTime - timeDiff);
      }
    });
  };
}

/**
 * Sets the time scale for the scheduler.
 *
 * @param {number} mTimeScale - The new time scale value to be set.
 */
function setTimeScale(mTimeScale) {
  timeScale = mTimeScale;

  setFrameRate(frameRate * timeScale);
}

/**
 * Retrieves the current time scale.
 *
 * @returns {number} The current time scale.
 */
function getTimeScale() {
  return timeScale;
}

/**
 * Sets the function to be called on each enter frame event.
 *
 * @param {Function} mFunc - The function to be executed on each enter frame.
 */
function setEnterframeFunc(mFunc) {
  enterframeFunc = mFunc;
}

/**
 * Processes and executes tasks from the enterframeTasks array.
 * Iterates through each task in the enterframeTasks array and calls the task's function with its arguments if the task is not null or undefined.
 */
function process() {
  let i = 0;
  let task;

  // enterframe tasks
  for (let [id, task] of enterframeTasks) {
    if (task !== null && task !== undefined) {
      task.func(task.args);
    }
  }

  // high priority tasks
  while (highTasks.length > 0) {
    task = highTasks.pop();
    task.func(task.args);
  }

  // delay tasks
  for (i = 0; i < delayTasks.length; i++) {
    task = delayTasks[i];
    // console.log(currentTime, task.time, task.delay);
    if (currentTime - task.time > task.delay / timeScale) {
      task.func(task.args);
      if (task.repeat) {
        task.time = currentTime; // Reschedule
      } else {
        delayTasks.splice(i, 1); // Remove non-repeating task
      }
    }
  }
}

/**
 * Retrieves the current time.
 *
 * @returns {Date} The current time.
 */
function getTime() {
  return currentTime;
}

/**
 * Retrieves the delta time.
 *
 * @returns {number} The delta time.
 */
function getDeltaTime() {
  return deltaTime;
}

/**
 * Main loop function that processes and updates the current time.
 *
 * @param {number} [mTimestamp] - Optional timestamp to set the current time.
 */
function loop(mTimestamp) {
  process();
  prevTime = currentTime;

  if (mTimestamp === undefined) {
    currentTime += (1000 / frameRate) * timeScale;
  } else {
    currentTime = mTimestamp;
  }

  deltaTime = currentTime - prevTime;

  // clear tasks
  highTasks = highTasks.concat(nextTasks);
  nextTasks = [];
  enterframeFunc(loop);
}

// start the engine
currentTime = performance.now();
loop(currentTime);

export default {
  addEF,
  removeEF,
  delay,
  next,
  getTime,
  getDeltaTime,
  setFrameRate,
  setTimeScale,
  getTimeScale,
};
