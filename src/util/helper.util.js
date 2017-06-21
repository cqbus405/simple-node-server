import path from 'path'
import fs from 'fs'

export const listJSFiles = dir => fs.readdirSync(dir)