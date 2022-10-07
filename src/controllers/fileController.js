import fileServices from '../services/fileServices.js'

const getAllFiles = (req, res) => { 
  fileServices.getAllFiles((allFiles) => { 
    res.send(allFiles) 
  })
}

export default {
  getAllFiles
}