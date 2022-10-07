import fetch from 'node-fetch'

const getAllFiles = (returnFiles) => { 
  
  let options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;',
      'Authorization': 'Bearer aSuperSecretKey',
    },
  }

  fetch('https://echo-serv.tbxnet.com/v1/secret/files', options)
    .then(resp => resp.json())
    .then(files => {

      options.headers = {
        'Content-Type': 'text/csv',
        'Authorization': 'Bearer aSuperSecretKey',
      }

      let urls = []
      for (let file of files.files) { 
        urls.push( fetch(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, options ))
      }

      Promise.allSettled(urls)
        .then(res => Promise.all(res.map(r => r.status === 'fulfilled' && r.value.text())))
        .then(results => {
          
          const formattedData = results
                                  .map(el => { 
                                    const splitBySpace = el.split(/\b\s+/)

                                    return splitBySpace.filter((el, index) => { 
                                      const splitByComma = el.split(',')
                                      if (splitByComma.length === 4 && index !== 0) {
                                        return el
                                      }
                                    })
                                  })
                                  .filter(el => el.length > 0)
          
          const lineToObject = formattedData.map(el => { 
                                           return el.map(el => { 
                                             const [file, text, number, hex] = el.split(',')
                                             return {file, text, number, hex}
                                           })
                                         })
          let responseData = []

          for (let data of lineToObject) { 
            responseData.push({
              file: data[0].file,
              lines: data.map(({text, number, hex}) => ({text, number, hex}))
            })
          }

          
          returnFiles(responseData) 
        })
    })
}

export default {
  getAllFiles
}