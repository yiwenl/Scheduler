// main.js
// import Scheduler from '../src/scheduler';
import Scheduler from '../build/scheduler';

let index = Scheduler.addEF(loop);
let count = 0;

function loop() {
	console.log('Loop', count, Scheduler.deltaTime);

	if(count ++ > 10) {
		Scheduler.removeEF(index);
		Scheduler.next(call, '00');
	}
}

Scheduler.delay(call, '01', 500);
Scheduler.delay(call, '02', 1000);



function call(str) {
	console.log('Calling : ', str);
}