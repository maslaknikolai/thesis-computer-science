import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import fileType from 'file-type'
import { FILE_UPLOAD_FOLDER } from '../config'

export default async function saveBase64File (base64string) {
  const matched = base64string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  const buffer = Buffer.from(matched[2], 'base64')

  const extensionResult = await fileType.fromBuffer(buffer)
  const extension = extensionResult.ext

  const fileName = `${uuidv4().replace(/-/g, '')}.${extension}`

  return new Promise((resolve, reject) => {
    fs.writeFile(FILE_UPLOAD_FOLDER + '/' + fileName, buffer, (err) => {
      if (err) {
        return reject(err)
      }

      resolve(fileName)
    })
  })
}
