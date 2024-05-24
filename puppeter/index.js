// web scraping is quite heavy on CPU, we can use worker threads to optimize the CPU Intensive operations using node

// axios - a promise based http client for browsers and node
//cheerio - a light weight implemention of jquery that give access to the dom on the server

//Worker a class in worker_threads module to register a new worker
// isMainThread object in worker_threads module that helps us to know when we run either inside the main thread or a worker thread
const { log } = require('console');
const {Worker, isMainThread,parentPort} = require('worker_threads');
if(isMainThread){
    const worker = new Worker(__filename); //register a new a worker thread i,e index.js
    worker.once('message',(message) => {
        console.log(message,"what is message")
    })
    worker.postMessage('Main thread; HI!')
}else{
    parentPort.once('message',(message) => {
        console.log(message);
        parentPort.postMessage("worker says: Hello World")
    })
}
// when a new worker thread spawns, there is a messaging port that allows inter-thread communications.


