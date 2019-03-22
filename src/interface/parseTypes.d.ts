interface AttrList {
    class?: string;
    props?: object;
	on?: object;
	attrs: any,
}


interface AstData {
    page: string;
    path: string;
    node: NodeData[];
    id?: string;
}

interface NodeData {
    tag: any;
    text?: string;
    attrList?: AttrList;
    children?: AstData[];
    id: string;
}

interface ParamData {
    key: 'string';
    type: 'string';
    value: 'string';
}
export { AstData, NodeData, ParamData, AttrList };
