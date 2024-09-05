import type { FormInstance, FormRules } from 'element-plus'

/**
 * 自定义表单接受的props参数
 */
export interface FormProps {
    formOptions: FormOptions
    formItemOptionsList?: FormItemOptions[]
}

/**
 * form表单接受的配置参数
 */
export interface FormOptions {
    /**
     * 表单数据对象
    */
    model: Record<string, any>
    /**
     *  类名
     */
    class?: string
    /**
     *  样式
     */
    style?: string
    /**
     * 表单验证规则
     */
    rules?: FormRules
    /**
     * 行内表单模式
     */
    inline?: boolean
    /**
     * 表单域标签的位置
     */
    'label-position'?: 'left' | 'right' | 'top'
    /**
     * 标签的长度
     */
    'label-width'?: string | number
    /**
     * 	表单域标签的后缀
     */
    'label-suffix'?: string
    /**
     * 是否隐藏必填字段标签旁边的红色星号。
     */
    'hide-required-asterisk'?: boolean
    /**
     * 星号的位置
     */
    'require-asterisk-position'?: 'left' | 'right'
    /**
     * 是否以行内形式展示校验信息
     */
    'inline-message'?: boolean
    /**
     * 是否在输入框中显示校验结果反馈图标
     */
    'status-icon'?: boolean
    /**
     * 	是否在 rules 属性改变后立即触发一次验证
     */
    'validate-on-rule-change'?: boolean
    /**
     * 	用于控制该表单内组件的尺寸
     */
    'size'?: '' | 'large' | 'default' | 'small'
    /**
     * 当校验失败时，滚动到第一个错误表单项
     */
    'scroll-to-error'?: boolean
    /**
     * 是否为动态表单
     */
    'dynamicForm'?: boolean
}

/**
 * 表单项接受的配置参数
 */
export interface FormItemOptions {
    /**
     * 对应表单控件名称
     */
    controlName:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'color-picker'
    | 'date-picker'
    | 'autocomplete'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'rate'
    | 'select'
    | 'select-v2'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
    /**
     * 绑定控件所需要的参数
     */
    bindControlOptions?: BindControlOptions
    /**
    *  类名
    */
    class?: string
    /**
     *  样式
     */
    style?: string
    /**
     * FormOptions中model 的键名 提供给表单验证使用
     */
    prop: string
    /**
     * 标签文本
     */
    label: string
    /**
     * 标签宽度
     */
    'label-width'?: srting | number
    /**
     * 是否为必填项
     */
    required?: boolean
    /**
     * 表单验证规则
     */
    rules?: Arrayable<FormItemRule>
    /**
     * 	表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。
     */
    error?: string
    /**
     * 	是否显示校验错误信息
     */
    'show-message'?: boolean
    /**
     * 是否在行内显示校验信息
     */
    'inline-message'?: string | boolean
    /**
     * 用于控制该表单域下组件的默认尺寸
     */
    size?: '' | 'large' | 'default' | 'small'
    /**
     * 和原生标签相同能力
     */
    for?: string
    /**
     * formitem 校验的状态
     */
    'validate-status'?: '' | 'error' | 'validating' | 'success'
    /**
     * 是否显示（非css显示隐藏）
     */
    hide?: boolean | ComputedRef<boolean>
    /**
     * 插槽，可以适配更多场景
     */
    slot?: string
    /**
     * 是否可被删除
     */
    canDeleted?: boolean
}

/**
 * 表单项绑定控件的配置参数
 */
export interface BindControlOptions {
    /**
     * 类名
     */
    class?:string
    /**
     * 样式
     */
    style?:string
    /**
     * 输入框占位文本
     */
    placeholder?: string
    /**
     * 提供给单选按钮使用
     */
    radioOptionsList?: RadioOptions[]
    /**
     * 提供给select控件使用
     */
    selectOptionsList?: SelectOptions[]
    [prop: string]: any
}

/**
 * 单选框的配置项
 */
export interface RadioOptions {
    label: string | number | boolean
    optionName:string
    disabled?: boolean
    border?: boolean
    size?: 'large' | 'default' | 'small'
    name?: string
}

/**
 * select选择器的配置项
 */
export interface SelectOptions {
    label: string | number
    value: string | number | boolean | object
    disabled?: boolean
}