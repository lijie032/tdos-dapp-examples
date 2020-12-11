import Vue from 'vue'
//只对input生效
export default function (el) {
    var input = el;
    input.onkeyup = function (e) {
        if(input.value.length==1){
            input.value = input.value.replace(/[^1-9]/g,'');
            el.dispatchEvent(new Event("input"));
        }else{
            input.value = input.value.replace(/[^\d]/g, "");
            el.dispatchEvent(new Event("input"));
        }
    };
    input.onblur =  function(e){
        if(input.value.length==1){
            input.value = input.value.replace(/[^1-9]/g,'');
            el.dispatchEvent(new Event("input"));
        }else{
            input.value = input.value.replace(/[^\d]/g, "");
            el.dispatchEvent(new Event("input"));
        }
    }
}