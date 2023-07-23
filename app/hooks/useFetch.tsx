import { useEffect, useState } from 'react';
import { config } from '../utils/config';

/**
 * Custom hook to fetch data from an API.
 * @param {string} uri - The API endpoint to fetch data from.
 * @param {boolean} enabled - Set to true to enable fetching (default: true).
 * @returns {FetchResponse} - An object containing loader, error, and data.
 */
export function useFetch(uri: string, enabled: boolean = true): FetchResponse {
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<Array<FetchData> | FetchData>([]);

  useEffect(() => {
    // abort controller to abort the fetch call
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const endpoint = `${config.baseUrl}/${uri}`;
        const response = await fetch(endpoint, {
          // pass the signal to the fetch call to abort the call
          // when the component unmount
          signal: signal
        });
        const json = await response.json();
        setData(json);
      } catch (error: SyntaxError | any) {
        if (error.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setError(error.message);
        }
      } finally {
        setLoader(false);
      }
    };

    if (enabled) {
      // enabled used to control when to fetch the data

      setTimeout(() => {
        // this set time out this to show the loader
        // if the data is fetched too fast

        fetchData();
      }, 500);
    }

    return () => {
      // abort the call when the component unmount
      abortController.abort();
    };
  }, [enabled]);

  return { loader, error, data };
}

interface FetchData {
  [key: string]: number | string | boolean | any;
}

interface FetchResponse {
  data: FetchData | FetchData[];
  error: string;
  loader: boolean;
}
