// main.js
import Scheduler from "../src/scheduler";
// import Scheduler from "../build/scheduler";

const maxFrame = 60;
let count = 0;
let countAnim = 0;
let taskId;
let startTime = performance.now();
function log() {
  console.log(
    "Count",
    count++,
    Scheduler.getTime(),
    performance.now(),
    Scheduler.getDeltaTime()
  );
  if (count > maxFrame) {
    Scheduler.removeEF(taskId);
  }
}

function animFrame() {
  console.log("Animation Frame", countAnim);
  if (countAnim++ < maxFrame) {
    requestAnimationFrame(animFrame);
  }
}

Scheduler.setFrameRate(30);
// Scheduler.setTimeScale(0.5);
taskId = Scheduler.addEF(log);
// animFrame();

function delayCall(mArgs) {
  console.log(
    "Delayed call",
    Scheduler.getTime(),
    performance.now() - startTime
  );
}

// Scheduler.delay(delayCall, 1000);
setTimeout(() => {
  console.log("1s");
}, 1000);
setTimeout(() => {
  console.log("2s");
}, 2000);

// window.setTimeout(delayCall, 1000 / 60);

/*
import Scheduler from "../build/scheduler";

let count = 0;
let efIndex;

function logMessage(msg) {
  console.log(msg, Scheduler.getDeltaTime(), Scheduler.getTime());
}

function log(msg) {
  logMessage(msg ? msg : "-");

  if (count++ > 60) {
    Scheduler.removeEF(efIndex);
  }
}
// efIndex = Scheduler.addEF(log);

// Scheduler.delay(log, "Delayed task - ", 2000);

function deferTest(o) {
  let t = 0;
  while (t < o.target) {
    t += Math.random();
  }
}

for (let i = 0; i < 10; i++) {
  const t = 600000;
  const target = Math.floor(t + Math.random() * t);
  Scheduler.defer(deferTest, { name: "task" + i, target });
}

function loop(mArgs) {
  console.log("Args", count, mArgs, performance.now());
  if (count++ < 60) {
    requestAnimationFrame(loop);
  }
}

loop();
*/
