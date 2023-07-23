import { useState } from 'react';
import { config } from '../utils/config';

/**
 * A custom hook for making a POST request and managing loading and error states.
 * @returns {UseMutationResponse} An array containing the postData function and FetchResponse object.
 */
export function useMutation(): [
  /**
   * Sends a POST request to the specified URI with the provided body.
   * @param {string} uri The URI to which the POST request will be sent.
   * @param {Object} body The data to be sent in the POST request body.
   */
  (uri: string, body: { [key: string]: string | number | Date | any }) => Promise<void>,

  /**
   * An object containing loader, error, and data.
   */
  FetchResponse
] {
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<any[]>([]);

  /**
   * Sends a POST request to the specified URI with the provided body.
   * @param {string} uri The URI to which the POST request will be sent.
   * @param {Object} body The data to be sent in the POST request body.
   */
  async function postData(uri: string, body: { [key: string]: string | number | Date | any }) {
    setLoader(true);
    try {
      const endpoint = `${config.baseUrl}/${uri}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...body, createdAt: new Date() })
      });
      const json = await response.json();
      setData(json);
    } catch (error: SyntaxError | Error | any) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  }

  return [postData, { loader, error, data }];
}


interface FetchResponse {
  loader: boolean;
  error: string;
  data: Array<{
    [key: string]: string | number | boolean;
  }>;
}
