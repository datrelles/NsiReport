export const DATA_TABLE_Personal = {
    alerta_medica: 'Alerta médica',
    condicion: 'Condición',
    premedicacion: 'Premedicación',
    alergias: 'Alergias',
    anestesia: 'Anestesia',
    fecha: 'Fecha',
};
export const DATA_TABLE_PersonalInformationRows = [
    [
        { label: 'Nombre', field: 'name', colSpan: 2 },
        { label: 'Apellido paterno', field: 'paternal_last_name' },
        { label: 'Apellido materno', field: 'maternal_last_name' },
        { label: 'Tel. de trabajo', field: 'work_phone' },
    ],
    [
        { label: 'Celular', field: 'cell_phone', colSpan: 2 },
        { label: 'Correo electrónico', field: 'email', colSpan: 3 },
    ],
    [
        { label: 'Edad', field: 'age' },
        { label: 'Fecha de nacimiento', field: 'date_of_birth' },
        { label: 'Estatura', field: 'height_cm' },
        { label: 'Peso', field: 'weight_kg' },
        { label: 'Genero', field: 'gender' },
    ],
    [
        { label: 'Nacionalidad', field: 'nationality', colSpan: 2 },
        { label: 'Estado civil', field: 'marital_status' },
        { label: 'Ocupación', field: 'occupation', colSpan: 2 },
    ],
    [
        { label: 'Dirección', field: 'address', colSpan: 3 },
        { label: 'Código postal', field: 'postal_code', colSpan: 2 },
    ],
    [
        { label: 'Contacto en caso de emergencia', field: 'emergency_contact', colSpan: 3 },
        { label: 'Parentesco', field: 'relationship' },
        { label: 'Teléfono', field: 'emergency_phone' },
    ],
    [
        { label: 'Teléfono y dirección de su servicio médico en caso de urgencia', field: 'emergency_medical_service', colSpan: 5 },
    ],
    [
        { label: 'Aseguranza', field: 'insurance', colSpan: 5 },
    ]
];
export const DATA_TABLE_ParentGuardianRows = [
    [
      { label: 'Nombre', field: 'name' },
      { label: 'Apellido paterno', field: 'paternal_last_name' },
      { label: 'Apellido materno', field: 'maternal_last_name' },
      { label: 'Edad', field: 'age' },
      { label: 'Parentesco', field: 'relationship' },
    ],
    [
      { label: 'Celular', field: 'cell_phone', colSpan: 2 },
      { label: 'Correo electrónico', field: 'email', colSpan: 3 },
    ],
    [
      { label: 'Dirección', field: 'address', colSpan: 3 },
      { label: 'Ciudad', field: 'city' },
      { label: 'Código postal', field: 'postal_code' },
    ],
];
export const DATA_TABLE_PentalHealthAnswersRows = [
    [
        { label: '¿Le sangran sus encías al cepillarse?', field: 'sangrado_encias', typeComponent: 'Option' },
        { label: '¿Cuál es el motivo de su consulta?', field: 'motivo_consulta', colSpan: 2 },
    ],
    [
        { label: '¿Ha recibido tratamiento periodontal (de las encías)?', field: 'tratamiento_periodontal', typeComponent: 'Option' },
        { label: 'Fecha de su última consulta dental:', field: 'fecha_ultima_consulta', colSpan: 2 },
    ],
    [
        { label: '¿Ha recibido tratamiento de ortodoncia (frenos)?', field: 'tratamiento_ortodoncia', typeComponent: 'Option' },
        { label: '¿Cuál fue el tratamiento que le hicieron esa vez?', field: 'tratamiento_anterior', colSpan: 2 },
    ],
    [
        { label: '¿Tiene dientes sensibles al frío, calor, dulce o a la presion?', field: 'dientes_sensibles', typeComponent: 'Option' },
        { label: 'Fecha de sus últimos rayos X dentales:', field: 'fecha_ultimos_rayos_x', colSpan: 2 },
    ],
    [
        { label: '¿Siente flojo alguno de sus dientes?', field: 'dientes_flojos', typeComponent: 'Option' },
        { label: '¿Cuántas veces al día cepilla sus dientes?', field: 'veces_cepillado_diario', colSpan: 2 },
    ],
    [
        { label: '¿Tiene dolor de oído o de cuello?', field: 'dolor_oido_o_cuello', typeComponent: 'Option' },
        { label: '¿Usa el hilo dental?', field: 'usa_hilo_dental', typeComponent: 'Option' },
    ],
    [
        { label: '¿Usa prótesis dentales removibles (aparatos)?', field: 'usa_dentadura', typeComponent: 'Option' },
        { label: '¿Anteriormente le han enseñado la técnica de cepillado y de uso del hilo dental?', field: 'tecnica_cepillado_hilo_dental_ensenada', typeComponent: 'Option' },
    ],
    [
        { label: '¿Ha tenido alguna experiencia desagradable en tratamientos dentales recibidos anteriormente?', field: 'usa_dentadura', typeComponent: 'Option' },
    ],
    [
        { label: '¿cuál?', field: 'descripcion_experiencia_desagradable', colSpan: 2 },
    ],
];
export const DATA_TABLE_MedicalInformationRows = [
    [
        { label: 'Tuberculosis activa', field: 'tuberculosis_activa', typeComponent: 'Option' },
        { label: '¿Tiene buen estado de salud general?', field: 'buen_estado_salud_general', typeComponent: 'Option' },
    ],
    [
        { label: 'Tos persistente por más de tres semanas', field: 'tos_persistente', typeComponent: 'Option' },
        { label: '¿Toma o ha tomado algún medicamento recientemente?', field: 'medicamento_reciente', typeComponent: 'Option' },
    ],
    [
        { label: 'Tos que produce sangre', field: 'tos_con_sangre', typeComponent: 'Option' },
        { label: '¿Cuál? ¿Para qué lo toma?', field: 'motivo_medicamento', colSpan: 2 },
    ],
    [
        { label: '¿Toma bebidas alcohólicas?', field: 'toma_bebidas_alcoholicas', typeComponent: 'Option' },
        { label: '¿Le ha recomendado el médico o dentista anterior que tome antibiótico antes de recibir tratamiento dental?', field: 'recomendacion_antibiotico', typeComponent: 'Option' },
    ],
    [
        { label: '¿Fuma?', field: 'fuma', typeComponent: 'Option' },
        { label: '¿Qué antibiótico y qué dosis?', field: 'tipo_y_dosis_antibiotico', colSpan: 2 },
    ],
    [
        { label: '¿Usa drogas?', field: 'usa_drogas', typeComponent: 'Option' },
        { label: '¿Ha sido hospitalizado en los dos últimos años?', field: 'hospitalizacion_ultimos_dos_anios', typeComponent: 'Option' },
    ],
    [
        { label: '¿Tiene dependencia al alcohol o drogas?', field: 'dependencia_alcohol_drogas', typeComponent: 'Option' },
        { label: '¿Le han reemplazado alguna articulación (cadera, rodilla, codo, dedo)?', field: 'reemplazo_articulacion', typeComponent: 'Option' },
    ],
    [
        { label: '¿Ha cambiado su salud durante los dos años pasados?', field: 'cambio_salud_ultimos_dos_anios', typeComponent: 'Option' },
        { label: 'PARA MUJERES ÚNICAMENTE', typeComponent: 'Subtitle'},
    ],
    [
        { label: '¿Actualmente se encuentra bajo tratamiento médico?', field: 'bajo_tratamiento_medico', typeComponent: 'Option' },
        { label: '¿Está o pudiera estar embarazada?', field: 'embarazo', typeComponent: 'Option' },
    ],
    [
        { label: '¿De qué enfermedad está siendo tratado?', field: 'enfermedad_en_tratamiento', colSpan: 2},
        { label: '¿Está amamantando?', field: 'amamantando', typeComponent: 'Option' },
    ],
    [
        { label: '¿Padece alguna alergia o es alérgico a algún medicamento, aspirina, penicilina, anestésico, látex, metal, alimento o cualquier otra sustancia?', field: 'alergico_medicamento', typeComponent: 'Option' },
        { label: '¿Está tomando anticonceptivos u hormonas?', field: 'anticonceptivos_hormonas', typeComponent: 'Option' },
    ],
    [
        { label: '¿Especifique a cuál y el tipo de reacción?', field: 'alergias_descripcion', colSpan: 2},
        { label: '¿Cuál?', field: 'cual_anticonceptivos_hormonas', colSpan: 2},
    ],
];
