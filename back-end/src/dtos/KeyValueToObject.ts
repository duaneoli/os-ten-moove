export function keyValueToObject(data: Array<string>): any {
  return data.reduce((dict, value) => {
    const result = Object.fromEntries(
      value
        .split(',')
        .map((it) => it.split(':'))
        .map(([key, value]) => {
          const valueOrArray = value.endsWith(';') ? value.split(';').slice(0, -1) : value
          return [key, valueOrArray]
        }),
    )
    return { ...dict, ...result }
  }, {})
}
