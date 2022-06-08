/*!
 * storage-pocket 0.1.0 (https://github.com/MaxtuneLee/pocketjs)
 * API https://github.com/MaxtuneLee/pocketjs/blob/master/doc/api.md
 * Copyright 2017-2022 MaxtuneLee. All Rights Reserved
 * Licensed under MIT (https://github.com/MaxtuneLee/pocketjs/blob/master/LICENSE)
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 检查所有localStorage里面的数据是否过期，如果过期的话就标记为过期
 */
var checkAllExpired = function () {
    var localStorageLength = localStorage.length;
    var now = Date.now();
    for (var i = 0; i < localStorageLength; i++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage.getItem(key));
        if (value.expireTime < (now - value.time)) {
            value.isExpired = true;
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
};

/**
 * 在localStorage中存储数据
 * @param key 储存键
 * @param value 储存值
 * @param expire 过期时间
 */
var addStorage = function (key, value, expire) {
    if (expire === void 0) { expire = 0; }
    checkAllExpired();
    if (value === '' || value === undefined) {
        value = null;
    }
    expire = (expire ? expire : 0) * 1000;
    var dataId = localStorage.length + 1;
    var Data = {
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
var changeStorage = function (key, value, expire) {
    checkAllExpired();
    if (value === '' || value === undefined) {
        value = null;
    }
    var prevData = JSON.parse(localStorage.getItem(key));
    if (expire === null || expire === undefined) {
        expire = prevData.expireTime;
    }
    var Data = {
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
var removeStorage = function (key) {
    checkAllExpired();
    localStorage.removeItem(key);
};
/**
 * 清空localStorage
 */
var clearStorage = function () {
    localStorage.clear();
};
/**
 * 获取localStorage中所需的数据
 * @param key 需要获取的储存键
 * @returns 返回该键对应的值
 */
var getStorage = function (key) {
    checkAllExpired();
    if (localStorage.getItem(key) === null || JSON.stringify(localStorage.getItem(key)) === 'null') {
        return null;
    }
    var storage = JSON.parse(localStorage.getItem(key));
    var now = Date.now();
    if (storage.expire < (now - storage.time)) {
        removeStorage(key);
        return 'Storage expired';
    }
    else {
        return storage.value;
    }
};
/**
 * 查询localStorage数据是否过期
 * @param key 需要查询的储存键
 * @returns 如果储存键没过期，返回true，否则返回false
 */
var isExpired = function (key) {
    checkAllExpired();
    if (localStorage.getItem(key) === null || JSON.stringify(localStorage.getItem(key)) === 'null') {
        return true;
    }
    var value = JSON.parse(localStorage.getItem(key));
    var now = Date.now();
    if (value.expire && value.expire < (now - value.time)) {
        return true;
    }
    else {
        return false;
    }
};
/**
 * 手动让数据过期
 * @param key 需要设置过期的数据
 * @returns 如果找不到该数据则返回 'Data not found'
 */
var expireData = function (key) {
    checkAllExpired();
    if (localStorage.getItem(key) === null || JSON.stringify(localStorage.getItem(key)) === 'null') {
        return 'Data not found';
    }
    var value = JSON.parse(localStorage.getItem(key));
    value.isExpired = true;
    localStorage.setItem(key, JSON.stringify(value));
};
/**
 * 删除所有过期数据
 */
var clearExpired = function () {
    var localStorageLength = localStorage.length;
    for (var i = 0; i < localStorageLength; i++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage.getItem(key));
        if (value.isExpired === true) {
            removeStorage(key);
        }
    }
};
/**
 * 获取localStorage中的所有未过期数据
 * @returns 返回localStorage中的所有数据
 */
var getAllStorage = function () {
    checkAllExpired();
    var storageLength = localStorage.length;
    var storageArr = [];
    for (var i = 0; i < storageLength; i++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage.getItem(key));
        if (value.isExpired !== true) {
            storageArr.push({
                key: key,
                value: value
            });
        }
        return storageArr;
    }
};
/**
 * 获取所有已过期数据
 */
var getExpiredStorage = function () {
    checkAllExpired();
    var storageLength = localStorage.length;
    var storageArr = [];
    for (var i = 0; i < storageLength; i++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage.getItem(key));
        if (value.isExpired === true) {
            storageArr.push({
                key: key,
                value: value
            });
        }
        return storageArr;
    }
};

exports.addStorage = addStorage;
exports.changeStorage = changeStorage;
exports.removeStorage = removeStorage;
exports.clearStorage = clearStorage;
exports.getStorage = getStorage;
exports.isExpired = isExpired;
exports.expireData = expireData;
exports.clearExpired = clearExpired;
exports.getAllStorage = getAllStorage;
exports.getExpiredStorage = getExpiredStorage;
