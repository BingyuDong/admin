
import { Directive } from 'vue';

const btnPermissionVerify: Directive = {
    mounted(el, btnKey) {
        const userRole = 'superAdmin' // 模拟用户角色
        const btnPermissionObject: Record<string, string[]> = {
            'test': ['superAdmin', 'admin']
        }; // 模拟按钮权限列表

        const key = btnKey.value as string;

        if(btnPermissionObject[key] && !(btnPermissionObject[key].some((item) => item === userRole))){
            el.style.display = 'none';
        }
    },
};

export default btnPermissionVerify