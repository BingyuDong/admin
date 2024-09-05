declare global {
    interface Menu {
        /**父级id */
        parentId: number;
        /**id */
        id: number;
        /**是否显示 */
        isShow: boolean;
        /**名称 */
        name: string;
        /**页面路径 */
        component: string;
        /**字体图标 */
        icon: string;
        /**路由标题 */
        title: string;
        /**组件路径 */
        path: string;
        /**重定向 */
        redirect?: string
    }
}

export { }