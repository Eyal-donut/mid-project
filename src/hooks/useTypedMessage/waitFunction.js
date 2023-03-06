export const waitFunction = ms =>
new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, ms);
})