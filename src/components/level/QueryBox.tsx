function QueryBox() {

  return (
    <textarea
      spellCheck={false}
      autoCorrect="off"
      autoCapitalize="off"
      className="grow border-1 border-stone-600 w-full min-h-96 p-4 focus:outline-none">
    </textarea>
  )
}

export default QueryBox;
