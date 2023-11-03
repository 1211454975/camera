function CountRuleExecutor(_poseData, _rule){
  var poseData = _poseData;
  var rule = _rule;
  var exec = function(){
    if(!rule)return {status:false};
    if(rule.calc=="or"){
      return execOr(rule);
    }
    if(rule.calc=="and"){
      return execAnd(rule);
    }
    return execSimpleRule(rule)
  }
  var execOr = function(rule){
    var children = rule.children || [];
    for(var i=0;i<children.length;i++){
      var res = exec(children[i]);
      if(res.status)return res;
    }
    return {status: false}
  }
  var execAnd = function(rule){
    var children = rule.children || []

    for(var i=0;i<children.length;i++){
      var res = exec(children[i])
      if(!res.status)return {status:false}
    }
    return {status:true}
  }
  var execSimpleRule = function(rule){
    var data = getData(rule.calc)
    if(!data)return {status:false}
    if(data>=(rule.angle-rule.offset) && data<=(rule.angle+rule.offset)){
      return {status:true}
    }else{
      return {status:false}
    }
  }

  this.exec = exec;
  
}