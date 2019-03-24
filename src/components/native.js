const nativeTag = {
    div: {
        attrList: {
            style: {
                width: '820px',
                height: '600px',
                border: '1px solid #333',
                'line-height': '80px',
            },
            attrs: {
                'data-component-active': '',
            }
        },
        text: '测试',
        
        attrs:[
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'width',
                label: '宽(加单位)',
                value: '820px',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'height',
                label: '高(加单位)',
                value: '600px',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'border',
                label: '边框(加单位)',
                value: '1px solid #ccc',
            },
            {
                astKey: 'class',
                type: 'text',
                attrKey: 'class',
                label: '添加样式',
                value: '',
            },
            {
                astKey: 'text',
                type: 'text',
                attrKey: 'text',
                label: '文字',
                value: '这里是div',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'background',
                label: '背景色',
                value: '#00',
            },
            {
                astKey: 'props',
                attrKey: 'bindData',
                type: 'button',
                label: '添加绑定数据',
                value: '',
            },
            {
                astKey: 'props',
                attrKey: 'delete',
                type: 'button',
                label: '删除组件',
                value: '',
            },
            // readonly
        ],

    },

    img: {
        attrList: {
            style: {
                width: '100px',
                height: 'auto',
                
            },
            attrs: {
                'data-component-active': '',
            }
        },
        attrs:[
            {
                astKey: 'attrs',
                type: 'text',
                attrKey: 'src',
                label: '图片地址',
                value: 'https://picsum.photos/200/300?image=1',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'width',
                label: '宽(加单位)',
                value: '200px',
            },
            {
                astKey: 'attrs',
                attrKey: 'bindData',
                type: 'button',
                label: '添加绑定数据',
                value: '',
            },
            {
                astKey: 'class',
                type: 'text',
                attrKey: 'class',
                label: '添加样式',
                value: '',
            },
            {
                astKey: 'props',
                attrKey: 'delete',
                type: 'button',
                label: '删除组件',
                value: '',
            },
           
        ],

    },

    span: {
        attrList: {
            style: {
                color: '#333',
                'font-size': '14px',
            },
            attrs: {
                'data-component-active': '',
            }
        },
        text: '这里是text文字标签',
        
        attrs:[
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'color',
                label: '颜色',
                value: '#333',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'fontSize',
                label: '字号',
                value: '14px',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'display',
                label: '是否换行',
                value: 'block',
            },
            {
                astKey: 'text',
                type: 'text',
                attrKey: 'text',
                label: '内容',
                value: '这里是text文字标签',
            },
            {
                astKey: 'attrs',
                attrKey: 'bindData',
                type: 'button',
                label: '添加绑定数据',
                value: '',
            },
            {
                astKey: 'class',
                type: 'text',
                attrKey: 'class',
                label: '添加样式',
                value: '',
            },
            {
                astKey: 'props',
                attrKey: 'delete',
                type: 'button',
                label: '删除组件',
                value: '',
            },
        ],
    },

    a: {
        attrList: {
            style: {
               
            },
            attrs: {
                'data-component-active': '',
                href: 'javascript:;'
            },
        },

        text: '这里是a标签',
        
        attrs:[
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'color',
                label: '颜色',
                value: '#333',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'fontSize',
                label: '字号',
                value: '14px',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'display',
                label: '是否换行',
                value: 'block',
            },
            {
                astKey: 'text',
                type: 'text',
                attrKey: 'text',
                label: '内容',
                value: '这里是text文字标签',
            },
            {
                astKey: 'attrs',
                type: 'text',
                attrKey: 'href',
                label: '链接地址',
                value: 'javascript:;',
            },
            {
                astKey: 'attrs',
                attrKey: 'bindhrefData',
                type: 'button',
                label: '添加绑定数据',
                value: '',
            },
            {
                astKey: 'class',
                type: 'text',
                attrKey: 'class',
                label: '添加样式',
                value: '',
            },
            {
                astKey: 'props',
                attrKey: 'delete',
                type: 'button',
                label: '删除组件',
                value: '',
            },
        ],
    },
     
    ul: {

    }
}

export default nativeTag;