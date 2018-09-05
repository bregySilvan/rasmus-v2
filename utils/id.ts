export function createId(): string {
    let now = ''+Date.now();
    let timePart = now.substring(now.length -5)
    return timePart + Math.random().toString(36).substring(2);
}
