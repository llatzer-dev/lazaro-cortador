"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCALIDADES_VALIDAS = void 0;
const PREFIX_LOCAL = 'cortador-de-jamon';
const SUFIX_LOCAL = [
    'calpe',
    'javea',
    'moraira',
    'benidorm',
    'aspe',
    'novelda',
    'elda',
];
exports.LOCALIDADES_VALIDAS = SUFIX_LOCAL.map((sufijo) => `${PREFIX_LOCAL}-${sufijo}`);
