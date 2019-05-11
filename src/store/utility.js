export const updatedObject = (oldObj, updatedVals)=>{
  return{
    ...oldObj,
    ...updatedVals
  }
}