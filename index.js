const { program } = require('commander');
const fs = require('fs');

program
    .requiredOption('-i, --input <path>', 'шлях до JSON-файлу')
    .option('-o, --output <path>', 'шлях до файлу для збереження результату')
    .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();
const inputPath = options.input;
const outputPath = options.output;
const displayResult = options.display;

if (!fs.existsSync(inputPath)) {
    console.error('Cannot find input file');
    process.exit(1);
}

const rawData = fs.readFileSync(inputPath);
const jsonData = JSON.parse(rawData);

const filteredData = jsonData.filter(item => item.parent === "BS3_BanksLiab");

const result = filteredData
    .map(item => `${item.txten}: ${item.value}`) // txten - англійська назва показника
    .join('\n');

if (displayResult) {
    console.log(result);
}

if (outputPath) {
    fs.writeFileSync(outputPath, result);
}

if (!displayResult && !outputPath) {
    console.log("Please specify output method (-o or -d).");
}
