import * as path from 'path';
import { promises as fs } from 'fs';
const lapsPath = path.join(path.resolve(), 'db', 'laptops.csv')
const keys = [
    'name',
    'resolution',
    'screen_type',
    'cpu',
    'cores',
    'ram',
    'data_drives',
    'gpu',
    'os',
    'price'
]
async function loadLaptops() {
    const data = await fs.readFile(lapsPath, 'utf-8')
    const lapsValues = data.split('\n')
                            .filter(i => !!i)
                            .map(str => str.split(','))
    return lapsValues.map(values => Object.fromEntries(keys.map((k, i) => [k, values[i]])))
}

function applyFilters(laptops, params) {
    const searchQuery = params.searchQuery.toLowerCase()
    return laptops.filter(item => filterBySearchQuery(item, searchQuery)
                               //если параметр не указан - считаем, что item проверку по нему прошел
                               && (params.price_from && params.price_to ? filterByPrice(item, params.price_from, params.price_to) : true)
                               && (params.ram_from && params.ram_to ? filterByRAM(item, params.ram_from, params.ram_to) : true)
            //if no param - we dont spend resources on a func call
                               && (params.hasOwnProperty('os')? !(item.os === 'без ОС') : true)
                               && (params.hasOwnProperty('resolution')?  checkArrProps(item, 'resolution',  params.resolution) : true)
                               && (params.hasOwnProperty('screen_type')? checkArrProps(item, 'screen_type', params.screen_type) : true)
                               && (params.hasOwnProperty('data_drives')? checkArrProps(item, 'data_drives', params.data_drives) : true)
    )
}

function filterBySearchQuery(item, searchQuery) {
    searchQuery = searchQuery.toLowerCase()
    return Object.values(item)
                 .some(val => val.toLowerCase()
                 .includes(searchQuery))
}

function filterByPrice(item, lower, upper) {
    const price = Number(item.price.split(' ').slice(0, -1).join(''))
    return Number(lower) <= price && price <= Number(upper)
}

function filterByRAM(item, lower, upper) {
    const ram = Number(item.ram.split(' ')[1])
    return Number(lower)<=ram && ram<= Number(upper)
}

function checkArrProps(item, key, arr){
    return (Array.isArray(arr)? arr : [arr]).some(val => item[key].includes(val))
}

export { loadLaptops,
         applyFilters
}
