export function pieChartHandel(obj: any) {
  const arr = []
  for (let key in obj) {
    if (key >= "6") break
    arr.push(obj[key])
  }

  const newArr = arr.map((item) => {
    return { value: item.f62, name: item.f14 }
  })
  return newArr
}

export function stringArrHandel(arr: any) {
  const curStr = arr[arr.length - 1]
  const newArr = curStr.split(",")
  console.log(newArr[1])
  return Number(newArr[1])
}

export function handelArrDate(arr: any) {
  const curStr = arr[arr.length - 1]
  const newArr = curStr.split(",")
  console.log(newArr[0])
  return String(newArr[0])
}
