export interface TableProps {
    tableColumnList: Column[]
    tableData: any[]
    paginationOption?: PaginationOption
    tableOptions: TableOptions
}

export interface PaginationOption {
    currentPage: number
    pageSize: number
    total: number
    isShow?: boolean
    otherOptions?: { [propsName: string]: any }
}

export interface tableColumn {
    prop: string
    label: string
    slot?: string
    otherOptions?: { [propsName: string]: any }
}

type Type = 'selection' | 'index' | 'expand' | 'image' | 'tag'
type Size = 'large' | 'default' | 'small'
type Align = 'center' | 'left' | 'right'
type Command = string | number
type Order = 'ascending' | 'descending'
type EditCellType = 'input' | 'date' | 'select' | 'datetime'

/**
 * 排序
 */
export interface Sort {
    /**
     * 排序列
     */
    prop: string
    /**
     * 排序顺序
     */
    order: Order
}

/**
 * 表格配置
 */
export interface TableOptions {
    /**
     * 是否显示表头
     */
    showHeader?: boolean
    /**
     * 是否展示分页器
     */
    showPagination?: boolean
    /**
     * 表格是否带斑马纹
     */
    stripe?: boolean
    /**
     * 是否带有纵向边框
     */
    border?: boolean
    /**
     * 表格尺寸："large" | "default" | "small"
     */
    size?: Size
    /**
     * 表格高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
     */
    height?: string | number
    /**
     * 表格最大高度。 合法的值为数字或者单位为 px 的高度。
     */
    maxHeight?: string | number
    /**
     * 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style
     */
    rowStyle?: ({ row, rowIndex }: { row: any; rowIndex: any }) => any
    /**
     * 默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序 defaultSort: { prop: 'xxx', order: 'ascending' }
     */
    defaultSort?: Sort
    /**
     * tooltip主题色
     */
    tooltipEffect?: 'dark' | 'light'
    /**
     * 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style
     */
    headerRowStyle?: ({ row, rowIndex }: { row: any; rowIndex: any }) => any
    /**
     * 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
     */
    headerCellStyle?: ({
        row,
        column,
        rowIndex,
        columnIndex
    }: {
        row: any
        column: any
        rowIndex: any
        columnIndex: any
    }) => any
    /**
     * 加载状态
     */
    loading?: boolean
    /**
     * 显示在加载图标下方的加载文案
     */
    'element-loading-text'?: string
    /**
     * 	自定义加载图标
     */
    'element-loading-spinner'?: string
    /**
     * 	背景遮罩的颜色
     */
    'element-loading-background'?: string
    /**
     * 自定义加载图标 (与 element-loading-spinner 相同)
     */
    'element-loading-svg'?: string
    /**
     * 自定义加载图标位置
     */
    'element-loading-svg-view-box'?: string
    /**
     * 设置表格单元、行和列的布局方式
     */
    tableLayout?: 'fixed' | 'auto'
    /**
     * 是否要高亮当前行
     */
    highlightCurrentRow?: boolean
    /**
     * 行数据的 Key，用来优化 Table 的渲染，功能与显示树形数据时，该属性是必填的
     */
    rowKey?: string | ((row: any) => string)
    /**
     * 是否懒加载子节点数据
     */
    lazy?: boolean
    /**
     * 加载子节点数据的函数，lazy 为 true 时生效
     */
    load?: (row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => void,
    /**
     * 渲染嵌套数据的配置选项
     */
    treeProps?: { hasChildren?: string, children?: string, checkStrictly?: boolean }
}

/**
 * 按钮项
 */
export interface ButtonItem {
    /**
     * 按钮名称
     */
    name: string
    /**
     * 按钮的指令(作用)
     */
    command: Command
    /**
     * 按钮的类型(颜色)
     */
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}
export interface Filters {
    /**
     * 筛选标题
     */
    text: string
    /**
     * 筛选的值
     */
    value: string
}

/**
 * 表格的每一列
 */
export interface Column {
    /**
     * 对应列的类型。 如果设置了selection则显示多选框； 如果设置了 index 则显示该行的索引（从 1 开始计算）； 如果设置了 expand 则显示为一个可展开的按钮
     *
     * "selection" | "index" | "expand" | "image"
     */
    type?: Type
    /**
     * column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
     */
    label?: string
    /**
     * 字段名称 对应列内容的字段名， 也可以使用 property属性
     */
    prop?: string
    /**
     * 列自定义插槽
     */
    slot?: string
    /**
     * 列的宽度
     */
    width?: string | number

    /**
     * 最小列的宽度
     */
    minWidth?: string | number
    /**
     * 样式类名
     */
    className?: string
    /**
     * 列的对齐方式
     */
    align?: Align
    /**
     * 当内容过长被隐藏时显示 tooltip
     */
    showOverflowTooltip?: boolean
    /**
     * 列的操作项配置
     * @option1 action为数组时，直接在columnOptions写入
     * @option2 action为true时，通过插槽写入
     */
    action?: ButtonItem[] | boolean
    /**
     * 固定列：'left' | 'right' | boolean
     */
    fixed?: 'left' | 'right' | boolean
    /**
     * 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
     */
    sortable?: boolean | 'custom'
    /**
     * 数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性
     */
    filters?: Filters[]
}
