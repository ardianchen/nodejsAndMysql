import fs from 'fs'
import shell from 'shelljs'
import { resolve, join } from 'path'
import { hostname } from 'src/lib/util'
import Utility from 'src/lib/utility'

const STORAGE_PATH = resolve(process.env.NODE_PATH, 'public/storage')

const buildTargetDirPath = (dir) => {
  if (dir) {
    return join(STORAGE_PATH, `${dir}`)
  }
  return join(STORAGE_PATH, '/')
}

const convertToRelativePath = (absolutePath) => absolutePath.replace(STORAGE_PATH, '')

const filename = (file) => {
  const convertRelativeFileName = Utility.simpliFileName(file.originalname)
  return `${file.filename}-${convertRelativeFileName}`
}

const buildTargetFilePath = (file, dir = null) => {
  return join(buildTargetDirPath(dir), filename(file))
}

const isDirectoryExists = (dir) => fs.existsSync(dir)

const makeDir = (dir) => shell.mkdir('-p', dir)

const url = (relativePath) => `${hostname()}/public/storage${relativePath}`

const move = async (file, dir = null) => {
  const tempFilePath = resolve(process.env.NODE_PATH, file.path)

  const targetDirPath = buildTargetDirPath(dir)

  if (!isDirectoryExists(targetDirPath)) {
    await makeDir(targetDirPath)
  }

  const targetFilePath = buildTargetFilePath(file, dir)

  await shell.exec(`mv ${tempFilePath} ${targetFilePath}`)

  const relativePath = convertToRelativePath(targetFilePath)

  return {
    uuid: null,
    original_file_url: url(relativePath),
    original_filename: filename(file),
    size: file.size
  }
}

export default {
  move
}
