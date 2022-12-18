import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
});

const showReversedString = () => rl.on('line', (string) => {
    console.log(
      `Your reversed string is: ${ string.split('').reverse().join('') }\n`
    );
  });

showReversedString();
  