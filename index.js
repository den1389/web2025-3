const fs = require("fs");
const { program } = require("commander");

program
  .requiredOption("-i, --input <path>", "Шлях до файлу JSON")
  .option("-o, --output <path>", "Шлях до файлу для запису")
  .option("-d, --display", "Вивід у консоль");

program.parse(process.argv);
const options = program.opts();

let data;
try {
  data = fs.readFileSync(options.input, "utf8");
} catch (error) {
  console.error("Cannot find input file");
  process.exit(1);
}

let jsonData;
try {
  jsonData = JSON.parse(data);
} catch (error) {
  console.error("Error parsing JSON");
  process.exit(1);
}

const filteredData = jsonData.filter((item) => item.parent === "BS3_BanksLiab");

const output = filteredData.map((item) => `${item.nameEn}:${item.value}`).join("\n");

if (options.display) {
  console.log(output);
}

if (options.output) {
  try {
    fs.writeFileSync(options.output, output, "utf8");
    console.log(`Дані збережено у файл ${options.output}`);
  } catch (error) {
    console.error("Error writing to file");
  }
}
