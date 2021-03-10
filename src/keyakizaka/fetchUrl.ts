import fetch from 'node-fetch';

// eslint-disable-next-line import/prefer-default-export
export async function fetchUrl(customUrl: string): Promise<string> {
  const response = await fetch(customUrl);
  return response.text();
}
