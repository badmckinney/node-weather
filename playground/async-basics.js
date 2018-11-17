console.log('Starting app');

setTimeout(() => {
  console.log('Inside of Callback');
}, 2000);

setTimeout(()=> {
    console.log('setTimeout still works.');
}, 0);

console.log('Finishing up');
