import { checkAllExpired } from './unit';

/**
 * 在localStorage中存储数据
 * @param key 储存键
 * @param value 储存值
 * @param expire 过期时间
 */
export const addStorage = (key: string, value?: any, expire = 0): void => {
    checkAllExpired();
    if (value === '' || value === undefined) {
        value = null;
    }
    expire = (expire ? expire : 0) * 1000;
    let dataId = localStorage.length + 1;
    let Data = {
        id: dataId,
        value: value,
        time: Date.now(),
        expireTime: expire,
        isExpired: false,
    };
    localStorage.setItem(key, JSON.stringify(Data));
};

/**
 * 更新localStorage中的数据（注意：这将会给数据进行续活）
 * @param key 储存键
 * @param value 需要改变的值
 * @param expire 需要改变的过期时间
 */
export const changeStorage = (key: string, value?: any, expire?: number): void => {
    checkAllExpired();
    if (value === '' || value === undefined) {
        value = null;
    }
    let prevData = JSON.parse(localStorage.getItem(key));
    if (expire === null || expire === undefined) {
        expire = prevData.expireTime;
    }
    let Data = {
        id: prevData.id,
        value: value,
        time: Date.now(),
        expireTime: expire,
        isExpired: false,
    };
    localStorage.setItem(key, JSON.stringify(Data));
};

/**
 * 删除localStorage中的相应数据
 * @param key 需要删除的储存键
 */
export const removeStorage = (key: string): void => {
    checkAllExpired();
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
    checkAllExpired();
    if (localStorage.getItem(key) === null || JSON.stringify(localStorage.getItem(key)) === 'null') {
        return null;
    }
    const storage = JSON.parse(localStorage.getItem(key));
    let now = Date.now();
    if (storage.expire < (now - storage.time)) {
        removeStorage(key);
        return 'Storage expired';
    } else {
        return storage.value;
    }
};

/**
 * 查询localStorage数据是否过期
 * @param key 需要查询的储存键
 * @returns 如果储存键没过期，返回true，否则返回false
 */
export const isExpired = (key: string): boolean => {
    checkAllExpired();
    if (localStorage.getItem(key) === null || JSON.stringify(localStorage.getItem(key)) === 'null') {
        return true;
    }
    const value = JSON.parse(localStorage.getItem(key));
    let now = Date.now();
    if (value.expire && value.expire < (now - value.time)) {
        return true;
    } else {
        return false;
    }
};

/**
 * 手动让数据过期
 * @param key 需要设置过期的数据
 * @returns 如果找不到该数据则返回 'Data not found'
 */
export const expireData = (key: string): any => {
    checkAllExpired();
    if (localStorage.getItem(key) === null || JSON.stringify(localStorage.getItem(key)) === 'null') {
        return 'Data not found';
    }
    const value = JSON.parse(localStorage.getItem(key));
    value.isExpired = true;
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 删除所有过期数据
 */
export const clearExpired = (): void => {
    let localStorageLength = localStorage.length;
    for (let i = 0; i < localStorageLength; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        if (value.isExpired === true) {
            removeStorage(key);
        }
    }
};

/**
 * 获取localStorage中的所有未过期数据
 * @returns 返回localStorage中的所有数据
 */
export const getAllStorage = (): any[] => {
    checkAllExpired();
    let storageLength = localStorage.length;
    let storageArr = [];
    for (let i = 0; i < storageLength; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        if (value.isExpired !== true) {
            storageArr.push({
                key: key,
                value
            });
        }
        return storageArr;
    }
};

/**
 * 获取所有已过期数据
 */
export const getExpiredStorage = (): any[] => {
    checkAllExpired();
    let storageLength = localStorage.length;
    let storageArr = [];
    for (let i = 0; i < storageLength; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        if (value.isExpired === true) {
            storageArr.push({
                key: key,
                value
            });
        }
        return storageArr;
    }
};