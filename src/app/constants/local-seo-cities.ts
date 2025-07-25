const PREFIX_LOCAL = 'cortador-de-jamon';

const SUFIX_LOCAL = [
  'calpe',
  'altea',
  'denia',
  'javea',
  'moraira',
  'benidorm',
  'aspe',
  'novelda',
  'elda',
  'elche',
];

export const LOCALIDADES_VALIDAS = SUFIX_LOCAL.map(
  (sufijo) => `${PREFIX_LOCAL}-${sufijo}`
);
