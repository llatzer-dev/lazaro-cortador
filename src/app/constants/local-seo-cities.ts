const PREFIX_LOCAL = 'cortador-de-jamon';

const SUFIX_LOCAL = [
  'calpe',
  'altea',
  'denia',
  'javea',
  'moraira',
  'benidorm',
  'villajoyosa',
  'aspe',
  'novelda',
  'elda',
  'elche',
  'crevillente',
  'torrevieja',
  'santa-pola',
  'san-vicente-del-raspeig',
];

export const LOCALIDADES_VALIDAS = SUFIX_LOCAL.map(
  (sufijo) => `${PREFIX_LOCAL}-${sufijo}`
);
