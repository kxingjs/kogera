const URL_PATTERN = /(https?:\/\/[\x21-\x7e]+)/g;

export function detectUrls(str) {
    const list = str.match(URL_PATTERN);
    return list ? list : [];
}
