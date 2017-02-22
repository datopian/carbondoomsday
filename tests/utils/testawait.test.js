import 'babel-polyfill'
import fs from 'fs'

function readFilePromisified(filename) {
  return new Promise(
    (resolve, reject) => {
      fs.readFile(filename, { encoding: 'utf8' },
        (error, data) => {
          if (error) {
            reject(error)
          } else {
            resolve(data)
          }
        })
    })
}

describe('await works', () => {
  it('returns some value', async () => {
    const path = 'fixtures/dp3/datapackage.json'
    let a = await readFilePromisified(path)
    a = JSON.parse(a)
    expect(a.title).toEqual('CO2 PPM - Trends in Atmospheric Carbon Dioxide')
  })
})
