const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .option('-i, --input <path>', 'Path to input file (required)')
  .option('-o, --output <path>', 'Path to output file')
  .option('-d, --display', 'Display result in console')
  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const data = fs.readFileSync(options.input, 'utf8');

if (options.display) {
  console.log('Data:', data);
}

if (options.output) {
  fs.writeFileSync(options.output, data, 'utf8');
  console.log(`Data saved to ${options.output}`);
}
