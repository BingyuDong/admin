import { Directive } from 'vue';
import { ElMessage } from 'element-plus'
const copy: Directive = {
    beforeMount(el, binding) {
        // 将要复制的内容当作全局变量存储
        el.copyContent = binding.value;
        el.addEventListener('click', () => {
            if (!el.copyContent) {
                ElMessage.error('没有要复制的内容！！！')
                return
            }
            // 创建textarea标签
            const textarea = document.createElement('textarea');
            // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
            textarea.readOnly = 'readonly' as any;
            textarea.style.position = 'fixed';
            textarea.style.top = '-99999px';
            // 把目标内容赋值给它的value属性
            textarea.value = el.copyContent;
            document.body.appendChild(textarea);
            // 选中值并复制
            textarea.select();
            const res = document.execCommand('Copy');
            if (res) {
                ElMessage({
                    message: '复制成功！',
                    type: 'success',
                  })
            }
            // 移除textarea标签
            document.body.removeChild(textarea);
        })
    },
    updated(el, binding) {
        // 内容更新时及时更新全局变量的值
        el.copyContent = binding.value;
    },
    unmounted(el) {
        // 元素移除时卸载点击事件监听
        el.removeEventListener('click', () => { })
    }
};

export default copy