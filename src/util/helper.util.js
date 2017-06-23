import path from 'path'
import fs from 'fs'
import crypto from 'crypto'

export const listJSFiles = dir => fs.readdirSync(dir)

/**
 * [验证登录密码是否正确]
 * @param  {[string]}   pwd1     [用户输入的密码]
 * @param  {[string]}   pwd2     [数据库的密码]
 * @return {[bool]}            [登录密码是否正确]
 */
export const validatePassword = (pwd1, pwd2) => {
  let salt = pwd2.substr(0, 10);
  let validHash = salt + md5(pwd1 + salt);
  return pwd2 === validHash;
}

const md5 = str => crypto.createHash('md5').update(str).digest('hex')