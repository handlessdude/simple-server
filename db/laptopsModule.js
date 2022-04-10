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
function filterBySearchQuery(laptops, searchQuery) {
    searchQuery = searchQuery.toLowerCase()
    return laptops.filter(item => Object.values(item)
                                        .some(val => val.toLowerCase()
                                                        .includes(searchQuery)))
}
export { loadLaptops, filterBySearchQuery }
