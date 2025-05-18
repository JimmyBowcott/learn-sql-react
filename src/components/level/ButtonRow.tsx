function ButtonRow() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-4">
        <button className="cursor-pointer">{'>'}</button>
        <button className="cursor-pointer">;</button>
      </div>
      <div className="flex gap-4">
        <button className="cursor-pointer">Clear</button>
        <button className="cursor-pointer">Back</button>
      </div>
    </div>
  )
}

export default ButtonRow;
