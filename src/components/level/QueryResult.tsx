import { useEffect, useState } from "react";
import * as schema from "../../data/schema.json";

function QueryResult({ res }: { res: any }) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const sortHeaders = (headers: string[]): string[] => {
    const indexMap = new Map(schema.order.map((key, idx) => [key, idx]));
    return [...headers].sort((a, b) => {
      const indexA = indexMap.get(a) ?? Infinity;
      const indexB = indexMap.get(b) ?? Infinity;
      return indexA - indexB;
    });
  }

  const parseHeaders = (): string[] => {
    try {
      if (res.length > 0) {
        return sortHeaders(Object.keys(res[0]));
      }
    } catch {
      setErrorMessage("An error has occured. Please try again later.")
      return [];
    }
    return [];
  }

  const parseResponse = () => {
    if (typeof res === "string") {
      setErrorMessage(res);
      setHeaders([]);
    } else {
      setHeaders(parseHeaders());
    }
  }

  useEffect(() => {
    parseResponse();
  }, [res])

  return (
    <div className="flex flex-col h-84 w-full items-center">
      <h2 className="font-bold text-xl">Result</h2>
      <div className="border-1 border-stone-600 w-full h-full p-4 overflow-scroll">
        {errorMessage.length > 0 && <p>{errorMessage}</p>}
        {errorMessage.length === 0 &&
          <table className="table-auto border border-stone-300 text-sm flex-1 mx-auto">
            <tr>
              {headers.map((header, key) =>
                <th className="border border-stone-300 px-2 py-1" key={`h-${key}`}>{header}</th>
              )}
            </tr>
            {Array.isArray(res) && res.map((row: any, i: number) => (
              <tr>
              {
                headers.map((header, key) => (
                  <td className="border border-stone-300 px-2 py-1" key={`row-${i}-${key}`}>{String(row[header])}</td>
                ))
              }
              </tr>
            ))
            }
          </table>
        }
      </div>
    </div>
  )
}

export default QueryResult;
