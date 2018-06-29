import { Image } from '../models'

const createTable = async () => {
  const query = await Image()
  console.log(query)
}

export default {
  createTable
}
