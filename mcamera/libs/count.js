const Count = function(y){
  var c = 0;
  var flag = false;
  for(var i=0;i<y.length-1;i++){
    if(y[i] < y[i+1] && !flag)
      continue;
    else if(y[i]>y[i+1] && flag)
      continue;
    else {
      console.log(i, y[i])
      c++;
      flag = !flag;
    }
  }
  return c;
}
module.exports = {
  Count
}