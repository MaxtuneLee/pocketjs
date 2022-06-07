/**
 * 在localStorage中存储数据
 * @param key 储存键
 * @param value 储存值
 * @param expire 过期时间
 */
export const setStorage = (key: string, value?: any, expire=0): void => {
    if (value === '' || value === undefined) {
        value = null;
    }
    expire = (expire?expire:0) * 1000;
    let Data = {
        value: value,
        time: Date.now(),
        expire: expire
    };
    localStorage.setItem(key, JSON.stringify(Data));
};

/**
 * 删除localStorage中的相应数据
 * @param key 需要删除的储存键
 */
export const removeStorage = (key: string): void => {
    localStorage.removeItem(key);
};

/**
 * 清空localStorage
 */
export const clearStorage = (): void => {
    localStorage.clear();
};

/**
 * 获取localStorage中所需的数据 
 * @param key 需要获取的储存键
 * @returns 返回该键对应的值
 */
export const getStorage = (key: string): any => {
    if (localStorage.getItem(key) === null||JSON.stringify(localStorage.getItem(key))==='null') {
        return null;
    }
    const storage = JSON.parse(localStorage.getItem(key));
    let now = Date.now();
    if (storage.expire && storage.expire < (now - storage.time)) {
        removeStorage(key);
        return 'Storage expired';
    }else{
        return storage.value;
    }
};

/**
 * 获取localStorage中的所有数据
 * @returns 返回localStorage中的所有数据
 */
export const getAllStorage = (): any => {
    let storageLength = localStorage.length;
    let storageArr = [];
    for (let i = 0; i < storageLength; i++) {
        let key = localStorage.key(i);
        let value = getStorage(key);
        storageArr.push({
            key: key,
            value: value
        });
    }
    return storageArr;
};

/**
 * 
 * @param key 需要查询的储存键
 * @returns 如果储存键没过期，返回true，否则返回false
 */
export const isExpired = (key: string): boolean => {
    if (localStorage.getItem(key) === null||JSON.stringify(localStorage.getItem(key))==='null') {
        return true;
    }
    const storage = JSON.parse(localStorage.getItem(key));
    let now = Date.now();
    if (storage.expire && storage.expire < (now - storage.time)) {
        return true;
    }else{
        return false;
    }
};