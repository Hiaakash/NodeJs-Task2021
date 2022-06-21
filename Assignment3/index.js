
// CustomForEach
arr = [1,2,3,4]
Array.prototype.customForEach = function(data) {
    var index;
    for(index  = 0;index <= this.length; index++ ){
        data(this[index]);
    } 
}
function data(val){
    console.log(val);
}
arr.customForEach(data);
