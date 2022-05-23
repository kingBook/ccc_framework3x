import { sys, warn } from "cc";

/** 在游戏会话之间存储和访问玩家偏好。 */
export default class PlayerPrefs {

    /** 从偏好中删除所有键和值。请谨慎使用。 */
    public static deleteAll(): void {
        sys.localStorage.clear();
    }

    /** 从偏好中删除 key 及其对应值。 */
    public static deleteKey(key: string): void {
        sys.localStorage.removeItem(key);
    }

    /** 返回偏好设置文件中与 key 对应的值（如果存在）。如果不存在，则返回 defaultValue。 */
    public static getFloat(key: string, defaultValue: number = 0): number {
        let value: string | null = sys.localStorage.getItem(key);
        if (value === null) return defaultValue;
        let n: number = parseFloat(value);
        return isNaN(n) ? defaultValue : n;
    }

    /** 返回偏好设置文件中与 key 对应的值（如果存在）。如果不存在，则返回 defaultValue。 */
    public static getInt(key: string, defaultValue: number = 0): number {
        if (defaultValue !== (defaultValue | 0)) warn("defaultValue:" + defaultValue + "不是整数将自动取整");
        let value: string | null = sys.localStorage.getItem(key);
        if (value === null) return defaultValue | 0;
        let n: number = parseInt(value);
        return isNaN(n) ? (defaultValue | 0) : (n | 0);
    }

    /** 返回偏好设置文件中与 key 对应的值（如果存在）。如果不存在，则返回 defaultValue。 */
    public static getString(key: string, defaultValue: string = ""): string {
        let value: string | null = sys.localStorage.getItem(key);
        if (value) return value;
        return defaultValue;
    }

    /** 如果 key 在偏好中存在，则返回 true。 */
    public static hasKey(key: string): boolean {
        if (sys.localStorage.getItem(key)) return true;
        return false;
    }

    /** 设置由 key 标识的偏好的值。 */
    public static setFloat(key: string, value: number): void {
        sys.localStorage.setItem(key, value.toString());
    }

    /** 设置由 key 标识的偏好的值。 */
    public static setInt(key: string, value: number): void {
        if (value !== (value | 0)) warn("value:" + value + "不是整数将自动取整");
        value = value | 0;
        sys.localStorage.setItem(key, value.toString());
    }

    /** 设置由 key 标识的偏好的值。 */
    public static setString(key: string, value: string): void {
        sys.localStorage.setItem(key, value);
    }
}