import { Directive } from 'vue';

const throttle: Directive = {
    mounted(el, binding) {
        let timer: any
        el.addEventListener('click', () => {
            if (!timer) {
                binding.value()
                timer = setTimeout(() => {
                    clearTimeout(timer)
                    timer = null
                }, Number(binding.arg) || 1000)
            }
        })
    }
};

export default throttle