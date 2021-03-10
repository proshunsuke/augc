import fetch from 'node-fetch';

export default async function fetchUrl(customUrl: string): Promise<string> {
  const response = await fetch(customUrl);
  return response.text();
}
