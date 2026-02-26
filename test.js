const myMap = (array) => {
  const newArray = []
  array.forEach((number) => newArray.push(number * 2))

  return newArray
}

console.log(myMap([1, 2, 3]))
