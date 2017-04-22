const URL_PATTERN = /(https?:\/\/[\x21-\x7e]+)/g;

export function detectUrls(str) {
    const urlList = str.match(URL_PATTERN);
    return urlList ? urlList : [];
}
