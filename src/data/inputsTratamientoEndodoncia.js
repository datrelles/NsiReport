export const Inputs_EndodonciaGeneral = [
    { label: 'Paciente', type: 'text', name: 'paciente', placeholder: 'Nombre del paciente' },
    { label: 'Doctor (a)', type: 'text', name: 'doctor', placeholder: 'Nombre del doctor (a)' },
    { label: 'Fecha de los datos del examen', type: 'date', name: 'fecha' },
    { label: 'Direccion', type: 'text', name: 'direccion', placeholder: 'Tijuana. Baja California a ______ de _____ de 20 _______' },
    { label: 'Consentimiento firmado', type: 'text', name: 'consentimiento_firmado', placeholder: 'Detalle...' },
];

export const Inputs_EndodonciaDiagnostico = [
    { label: 'Diagnóstico pulpar de presunción: ', type: 'text', placeholder: 'Explique', name: 'diagnostico_pulpar_presuncion', },
    { label: 'Diagnóstico periapical: ', type: 'text', placeholder: 'Explique', name: 'diagnostico_periapical', },
    { label: 'Diagnóstico definitivo: ', type: 'text', placeholder: 'Explique', name: 'diagnostico_definitivo', },
    { label: 'Tratamiento indicado: ', type: 'text', placeholder: 'Explique', name: 'tratamiento_indicado', },
];

export const Inputs_TratamientoEndodoncia_Padre = [
    { label: 'Diente: ', type: 'text', placeholder: '', name: 'diente', },
    { label: 'Vital: ', type: 'text', placeholder: '', name: 'vital', },
    { label: 'Necrotico: ', type: 'text', placeholder: '', name: 'necrotico', },
    { label: 'Costo: ', type: 'number', placeholder: '', name: 'costo', },
    { label: 'Fecha de inicio: ', type: 'date', placeholder: '', name: 'fecha_inicio', },
    { label: 'Fcha de obturación: ', type: 'date', placeholder: '', name: 'fecha_obturacion', },
];

export const Inputs_TratamientoEndodoncia_Create = [
    { label: 'Fecha: ', type: 'date', placeholder: '', name: 'fecha', },
    { label: 'Procedimiento: ', type: 'text', placeholder: '', name: 'procedimiento', },
    { label: 'Conducto: ', type: 'text', placeholder: '', name: 'conducto', },
    { label: 'Conducto Tentativa: ', type: 'text', placeholder: '', name: 'conducto_tentativa', },
    { label: 'Conducto Definitiva: ', type: 'text', placeholder: '', name: 'conducto_definitiva', },
    { label: 'Referencia: ', type: 'text', placeholder: '', name: 'referencia', },
    { label: 'Última Lima Apical: ', type: 'text', placeholder: '', name: 'ultima_lima_apical', },
    { label: 'Notas: ', type: 'text', placeholder: '', name: 'notas', },
    { label: 'Abono: ', type: 'number', placeholder: '', name: 'abono', },
    { label: 'Balance: ', type: 'number', placeholder: '', name: 'balance', },
];