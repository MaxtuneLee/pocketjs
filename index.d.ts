/**
 * 在localStorage中存储数据
 * @param key 储存键
 * @param value 储存值
 * @param expire 过期时间
 */
export declare const addStorage: (key: string, value?: any, expire?: number) => void;
/**
 * 更新localStorage中的数据（注意：这将会给数据进行续活）
 * @param key 储存键
 * @param value 需要改变的值
 * @param expire 需要改变的过期时间
 */
export declare const changeStorage: (key: string, value?: any, expire?: number) => void;
/**
 * 删除localStorage中的相应数据
 * @param key 需要删除的储存键
 */
export declare const removeStorage: (key: string) => void;
/**
 * 清空localStorage
 */
export declare const clearStorage: () => void;
/**
 * 获取localStorage中所需的数据
 * @param key 需要获取的储存键
 * @returns 返回该键对应的值
 */
export declare const getStorage: (key: string) => any;
/**
 * 查询localStorage数据是否过期
 * @param key 需要查询的储存键
 * @returns 如果储存键没过期，返回true，否则返回false
 */
export declare const isExpired: (key: string) => boolean;
/**
 * 手动让数据过期
 * @param key 需要设置过期的数据
 * @returns 如果找不到该数据则返回 'Data not found'
 */
export declare const expireData: (key: string) => any;
/**
 * 删除所有过期数据
 */
export declare const clearExpired: () => void;
/**
 * 获取localStorage中的所有未过期数据
 * @returns 返回localStorage中的所有数据
 */
export declare const getAllStorage: () => any[];
/**
 * 获取所有已过期数据
 */
export declare const getExpiredStorage: () => any[];
