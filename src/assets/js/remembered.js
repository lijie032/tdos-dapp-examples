import Vue from 'vue'
//只对input生效
export default function (el) {
    var input = el;
   
    input.onkeyup = function (e) {
        // console.log(input.value)
   
        input.value = input.value.replace(/"/g, '').replace(/'/g, '')
        el.dispatchEvent(new Event("input"));
       
      
    };
    input.onblur =function(e){
        input.value = input.value.replace(/"/g, '').replace(/'/g, '')
        el.dispatchEvent(new Event("input"));
       
    }

    
}