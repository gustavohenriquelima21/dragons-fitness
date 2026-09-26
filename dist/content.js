// Informações editáveis. Preencha horários apenas quando confirmados.
window.DRAGON_CONTENT = {
  instagram: 'https://www.instagram.com/dragonsfitnessacademia/',
  units: [
    { id: 'alto-umuarama', name: 'Alto Umuarama', label: 'Unidade 1', address: 'Av. Dom Pedro II, 1277', phone: '5534998144493', maps: 'https://maps.app.goo.gl/cN5ZUochWTaTG5NW9', hours: null },
    { id: 'novo-mundo', name: 'Novo Mundo', label: 'Unidade 2', address: 'Av. Victor Alves Pereira, 838', phone: '5534999118074', maps: 'https://maps.app.goo.gl/83MGnwBEH2JCSNXRA', hours: null }
  ],
  // Exemplo de formato, sem horários fictícios: hours: [{ days: 'Segunda a sexta', time: 'HORÁRIO CONFIRMADO' }]
  plans: [
    { id: 'mensal', name: 'Mensal', amount: 129.99, condition: 'Pagamento mensal' },
    { id: 'trimestral', name: 'Trimestral', amount: 119.99, condition: 'Até 3x de' },
    { id: 'semestral', name: 'Semestral', amount: 109.99, condition: 'Até 6x de' }
  ]
};
