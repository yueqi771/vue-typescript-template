import Parse from './core';
import { AstData, NodeData, ParamData } from '@interface/parseTypes.d.ts';

const parse  = (ast: AstData[], targetRouter?: string) => {
    const $parse = new Parse(ast, targetRouter);

    $parse.initPage(ast);
    
    return $parse
}

export default parse;