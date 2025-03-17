const { program } = require('commander');
const fs = require('fs');

program
    .option('-i, --input <path>', 'шлях до JSON')
  .option('-o, --output <path>', 'зберегти результат у файл')
    .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();
const inputPath = options.input;
const outputPath = options.output;
const displayResult = options.display;

if (!inputPath) {
    console.error("Please, specify input file");
    process.exit(1);
}

if (!fs.existsSync(inputPath)) {
    console.error("Cannot find input file");
    process.exit(1);
}

const rawData = fs.readFileSync(inputPath);
const jsonData = JSON.parse(rawData);

const filteredData = jsonData.filter(item => item.parent === "BS3_BanksLiab");

const result = filteredData
    .map(item => `${item.txten}: ${item.value}`)
    .join('\n');

if (displayResult) {
    console.log(result);
}

if (outputPath) {
    fs.writeFileSync(outputPath, result);
}


