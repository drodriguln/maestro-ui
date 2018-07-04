export const isEmpty = (myObject) => {
  if (myObject == null) return true;
  for(var key in myObject) {
      if (myObject.hasOwnProperty(key)) {
          return false;
      }
  }
  return true;
}
