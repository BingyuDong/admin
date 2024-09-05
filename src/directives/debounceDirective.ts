import { Directive } from 'vue';

const debounce: Directive = {
    mounted(el, binding) {
        let timer: any
        el.addEventListener('click', () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                binding.value()
            }, Number(binding.arg) || 1000)
        })
    }
};

export default debounce