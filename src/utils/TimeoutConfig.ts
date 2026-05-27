export class TimeoutConfig {
    static getDefaultTimeout(): number {
        return 30000;
    }
    static getTimeout(customTimeout?: number): number {
        return customTimeout ?? this.getDefaultTimeout();
    }
    static timeoutForDashboard(): number {
        return 30000 
    }
}