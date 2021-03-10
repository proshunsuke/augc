import fetch from 'node-fetch';

export async function fetchUrl(customUrl: string) {
    const response = await fetch(customUrl);
    return response.text();
}
