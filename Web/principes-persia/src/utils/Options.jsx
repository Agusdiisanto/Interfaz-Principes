// Aca podemos dejar una variable mas que sea clase para que cada uno tenga
// Algo destintivo

export const Options = [
    {
      label: 'Crear Ubicación',
      description: 'Crea una nueva ubicación en el sistema.',
      path: 'crear',
    },
    {
      label: 'Buscar Ubicación',
      description: 'Busca una ubicación existente en el sistema.',
      path: 'buscar',
    },
    {
      label: 'Todas las Ubicaciones',
      description: 'Muestra todas las ubicaciones registradas.',
      path: 'ubicaciones',
    },
    {
      label: 'Mover vector',
      description: 'Mueve un vector específico a otra ubicación de grado 1.',
      path: 'mover',
    },
    {
      label: 'Mover más corto vector',
      description: 'Mueve el vector más corto a otra ubicación.',
      path: 'moverMasCorto',
    },
    {
      label: 'Conectados',
      description: 'Muestra todas las ubicaciones conectadas de grado 1ª en el sistema.',
      path: 'conectados',
    },
    {
      label: 'Conectar',
      description: 'Conecta dos ubicaciones mediante un camino.',
      path: 'conectar',
    },
    {
      label: 'Suscribirte',
      description: 'Suscríbete a una ubicacion para recibir actualizaciones y notificaciones.',
      path: 'subscribir',
    },
    {
      label: 'Desuscribir',
      description: 'Deja de recibir actualizaciones y notificaciones',
      path: 'subscribir',
    },
];