import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'node:readline';

const __dirname = path.resolve()
const filePath = path.join(__dirname, 'db', 'laptops.txt')
const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    console: false
})
const laptops = []
let re = / ,|, |\]| \[/gi

readInterface.on('line', function(line) {
    if(line.includes('[')&&line.includes(']')) {
        laptops.push(line.replace(re, match => ','))
    }
    if(line.includes('₽')&&!line.includes('/')){
        laptops[laptops.length-1]+=line+'\n'
    }
})

const filePath2 = path.join(__dirname, 'db', 'laptops.csv')
fs.writeFile(filePath2, '', err => {
    if (err) {
        throw err
    }
    console.log(`Файл ${filePath2} создан`)
    laptops.forEach(item => {
        fs.appendFile(filePath2, item, err => {
            if (err) {
                throw err
            }
        })
    })
})

//TODO filter function f: notebook_attributes -> filtered notebooks

//TODO  export { notebooks, f }
