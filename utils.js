
exports.sequence = function sequence(tasks, fn) {
    return tasks.reduce((promise, task) => promise.then(() => fn(task)), Promise.resolve());
}
