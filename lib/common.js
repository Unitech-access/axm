
var Common = module.exports =  {};

Common.getDate = function getDate() {
  return Math.round(new Date().getTime() / 1000);
};
