
const randomBaseStr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/**
 * 生成随机id
 * @param num 随机数长度(不包含时间戳)
 * @returns 随机id
 */
export const generateId = (num: number = 10):string =>  {
  let str = ''
  for(let i = 0; i < num; i++) {
    str += randomBaseStr[Math.floor(Math.random() * randomBaseStr.length)];
  }
  return `${str}-${Date.now()}`;
};