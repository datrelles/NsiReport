export const Inputs_DiagnosticoGeneral = [
    { label: 'Fecha general del tratamiento', type: 'date', name: 'fecha', placeholder: 'dd/mm/yyyy' },
];

export const Inputs_DiagnosticoTratamientoAdicional = [
    { label: 'Quirurgico: ', type: 'text', placeholder: 'Explique', name: 'quirurgico', },
    { label: 'Quirurgico Presupuesto: ', type: 'number', placeholder: '00.00', name: 'quirurgico_presupuesto', },

    { label: 'Periodontal: ', type: 'text', placeholder: 'Explique', name: 'periodental', },
    { label: 'Periodontal Presupuesto: ', type: 'number', placeholder: '00.00', name: 'periodental_presupuesto', },

    { label: 'Ortodóntico: ', type: 'text', placeholder: 'Explique', name: 'ortodontico', },
    { label: 'Ortodóntico Presupuesto: ', type: 'number', placeholder: '00.00', name: 'ortodontico_presupuesto', },

    { label: 'Otro: ', type: 'text', placeholder: 'Explique', name: 'otro',  },
    { label: 'Otro Presupuesto: ', type: 'number', placeholder: '00.00', name: 'otro_presupuesto', },
];
