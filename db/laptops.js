const laptops = []

//TODO import laptops from xsl

import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.resolve()
const filePath = path.join(__dirname, 'db', 'laptops.txt')
fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
        throw  err
    }
    const obj = JSON.parse(content)

    console.log(obj.data.states)
    // const data = Buffer.from(content)
    // console.log('Content: ', data.toString())
})
//https://www.dns-shop.ru/ajax-state/product-buy/?cityId=28&langId=ru
/*let XLSX = require('xlsx');
let workbook = XLSX.readFile('Master.xlsx');
let sheet_name_list = workbook.SheetNames;
console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))*/


//TODO filter function f: notebook_attributes -> filtered notebooks

//TODO  export { notebooks, f }
