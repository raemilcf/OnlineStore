declare module '*.svg' {

    import React = require('react');
    export const ReactComponent : React.FC<React.SVGProps<SVGSVGElement>>;
    const src : string; 
    export default src;
}

//for svg icon in typescript, they need a way to tell ts that icon need to be imported 
//that's why we have to declare a svg module, indicating the import 