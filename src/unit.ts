import { removeStorage, getStorage } from '.';

/**
 * 检查所有localStorage里面的数据是否过期，如果过期的话就标记为过期
 */
export const checkAllExpired = (): void => {
    let localStorageLength = localStorage.length;
    let now = Date.now();
    for (let i = 0; i < localStorageLength; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        if (value.expireTime < (now - value.time)) {
            value.isExpired = true;
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
};

