export const isEmpty = (myObject) => {
  if (myObject == null) return true;
  for(let key in myObject) {
      if (myObject.hasOwnProperty(key)) {
          return false;
      }
  }
  return true;
}
