enum ExpireEnum {
  'expire' = '__expire__'
}

interface Result<T> {
  value: T | null
  message: string
}

type Key = string;

type Expire = ExpireEnum.expire | number;

interface StorageCls {
  set: <T>(key: Key, value: T, expire: Expire) => void
  get: <T>(key: Key) => Result< T | null>,
  remove: (key: Key) => void
  clear: () => void
}

export class MyLocalstorage implements StorageCls {
  set <T> (key: Key, value: T, expire: Expire = ExpireEnum.expire) {
    let data = {
      value,
      [ExpireEnum.expire]: expire
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  get <T> (key: Key): Result<T | null> {
    const value = localStorage.getItem(key);
    if(value) {
      const result = JSON.parse(value);
      if(typeof result[ExpireEnum.expire] === 'number' && result[ExpireEnum.expire] < Date.now()) {
        this.remove(key);
        return {
          value: null,
          message: '内容已过期'
        }
      }
      return {
        value: result.value,
        message: '获取成功'
      }

    }
    return {
      value: null,
      message: '内容不存在'
    }
  }

  remove(key: Key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}


