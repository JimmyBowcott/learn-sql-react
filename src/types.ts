export type Level = {
  id: number,
  description: string,
  tables: number[]
  commands: {
    clauses: string[],
    modifiers: string[],
    operators: string[]
  }
}
