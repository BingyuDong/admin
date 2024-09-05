import { Directive } from 'vue';

const ellipsis: Directive = {
    beforeMount(el, binding) {
        el.style.width = `${binding.value?binding.value+'px':100+'%'}`
        el.style.whiteSpace = 'nowrap'
        el.style.overflow = 'hidden';
        el.style.textOverflow = 'ellipsis';
    },
};

export default ellipsis