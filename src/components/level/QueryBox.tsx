import type { Dispatch, SetStateAction } from "react";

function QueryBox({text, setText}: {text: string, setText: Dispatch<SetStateAction<string>>}) {

  return (
    <textarea
      spellCheck={false}
      autoCorrect="off"
      autoCapitalize="off"
      className="grow border-1 border-stone-600 w-full h-84 p-4 focus:outline-none"
      value={text}
      onChange={(e: any)=>setText(e.target.value)}>
    </textarea>
  )
}

export default QueryBox;
