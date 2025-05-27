import { useEffect, useState } from "react";

function QueryResult({ res }: { res: string }) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const parseHeaders = (): string[] => {
    try {
      if (res.length > 0) {
        return Object.keys(res[0]);
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
    } else {
      setHeaders(parseHeaders());
    }
  }

  useEffect(() => {
    parseResponse();
  }, [res])

  return (
    <div className="flex flex-col grow w-full items-center">
      <h2 className="font-bold text-xl">Result</h2>
      <div className="grow border-1 border-stone-600 w-full">
        {errorMessage.length > 0 && <p>{errorMessage}</p>}
        {errorMessage.length === 0 &&
          <table>
            {headers.map((header, key) =>
              <th key={`h-${key}`}>{header}</th>
            )}
          </table>
        }
      </div>
    </div>
  )
}

export default QueryResult;
