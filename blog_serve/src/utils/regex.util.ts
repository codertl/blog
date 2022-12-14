// 非 0 正整数
export const regPositive: RegExp = /^[1-9]\d*$/g

// 非 0 正整数 或 空
export const regPositiveOrEmpty: RegExp = /\s*|^[1-9]\d*$/

// 中国 11 位手机号格式
export const regPhoneCN: RegExp = /^1\d{10}$/g
