export function httpRequest(protocol: 'http' | 'https', address: string, port: number | string, location: string) {
    location = location.startsWith('/') ? location : `/${location}`;
    return `${protocol}://${address}:${port}${location}`
}