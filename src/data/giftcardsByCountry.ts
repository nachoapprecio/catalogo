import chile from './giftcards_chile.json';
import peru from './giftcards_peru.json';
import colombia from './giftcards_colombia.json';
import ecuador from './giftcards_ecuador.json';
import mexico from './giftcards_mexico.json';
import spain from './giftcards_spain.json';
import planet from '../assets/planet.svg';

export const giftcardsByCountry = {
  chile,
  peru,
  colombia,
  ecuador,
  mexico,
  spain,
};

export const countryList = [
  {
    code: 'all',
    name: 'Todos los países',
    image: planet,
  },
  {
    code: 'chile',
    name: 'Chile',
    image: 'https://estudios.apprecio.com/hubfs/sitio%20web/global/header-footer/imagenes/chile.svg',
  },
  {
    code: 'peru',
    name: 'Perú',
    image: 'https://estudios.apprecio.com/hubfs/sitio%20web/global/header-footer/imagenes/peru.svg',
  },
  {
    code: 'colombia',
    name: 'Colombia',
    image: 'https://estudios.apprecio.com/hubfs/sitio%20web/global/header-footer/imagenes/colombia.svg',
  },
  {
    code: 'ecuador',
    name: 'Ecuador',
    image: 'https://estudios.apprecio.com/hubfs/sitio%20web/global/header-footer/imagenes/ecuador.svg',
  },
  {
    code: 'mexico',
    name: 'México',
    image: 'https://estudios.apprecio.com/hubfs/sitio%20web/global/header-footer/imagenes/mexico.svg',
  },
  {
    code: 'spain',
    name: 'España',
    image: 'https://estudios.apprecio.com/hubfs/sitio%20web/global/header-footer/imagenes/espana.svg',
  },
];
