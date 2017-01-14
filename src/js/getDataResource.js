async function getDataResource(resources) {
  const table = await resources[0].table
  const data = await table.read()
  return data
  //resources argument must be array of Resource class objects
  /*
  let arrayOfData = []
  for (let i=0; i<resources.length; i++) {
    resources[i].table(table => {
      table.read().then(data => {
        arrayOfData.push(data)
      })
    })
  }
  return arrayOfData*/
}

export default getDataResource
