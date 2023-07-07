import { faPlus, faSearch, faCodeBranch , faWalking , faLink, faBell,faEarthAmericas,faRunning, faVirus } from '@fortawesome/free-solid-svg-icons';

export const Options = [
  {
    label: 'Buscar Ubicación',
    description: 'Busca una ubicación existente en el sistema.',
    icon: faSearch,
    className: 'option-search',
    path: 'buscar',
  },
  {
    label: 'Todas las Ubicaciones',
    description: 'Muestra todas las ubicaciones registradas.',
    icon: faEarthAmericas,
    className: 'option-all',
    path: 'ubicaciones',
  },
  {
    label: 'Mover vector',
    description: 'Mueve un vector específico a otra ubicación de grado 1.',
    icon: faWalking,
    className: 'option-move',
    path: 'mover',
  },
  {
    label: 'Mover más corto vector',
    description: 'Mueve el vector más corto a otra ubicación.',
    icon: faRunning, 
    className: 'option-shortMove',
    path: 'moverMasCorto',
  },
  {
    label: 'Conectados',
    description: 'Muestra todas las ubicaciones conectadas de grado 1ª en el sistema.',
    icon: faCodeBranch,
    className: 'option-connected',
    path: 'conectados',
  },
  {
    label: 'Conectar',
    description: 'Conecta dos ubicaciones mediante un camino.',
    icon: faLink,
    className: 'option-connect',
    path: 'conectar',
  },
  {
    label: 'Expandir',
    description: 'Dado una ubicacion expande e infecta.',
    icon: faVirus,
    className: 'option-expandir',
    path: 'expandir',
  },
  {
    label: 'Suscribirte',
    description: 'Suscríbete a una ubicación para recibir actualizaciones y notificaciones.',
    icon: faBell,
    className: 'option-subscribe',
    path: 'subscribir',
  },
  {
    label: 'Mapa',
    description: 'Muestra todas las ubicaciones en un mapa',
    icon: faPlus,
    className: 'option-crear',
    path: 'crear',
  },
];
