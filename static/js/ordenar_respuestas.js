$( "#id_tipo_representacion" ).change(function() {
    var value = $(this).val();
    var respuestas = $("#respuestas_texto")
    var respuestas2 = $("#respuestas_rango")

    if ((value == 'Fecha') || (value == 'Respuesta corta') || (value == 'Respuesta larga')){
        respuestas2.prop('hidden', true);
        respuestas.prop('hidden', true);
    }

    if ((value == 'Varias opciones') || (value == 'Una opción de varias') || (value == 'Opción desplegable')){
        respuestas2.prop('hidden', true);
        respuestas.removeAttr('hidden');
        respuestas.show(1000);
    }

    if (value == 'Rango'){
        respuestas.prop('hidden', true);
        respuestas2.removeAttr('hidden');
        respuestas2.show(1000);
    }
});

/* Inicia sort en las preguntas */
new Sortable(formsets_numero, {
    animation: 150,
    ghostClass: 'blue-background-class',

    /* Numeración de las preguntas despues de ordenar */
    onEnd: function (/**Event*/evt) {
        var items = evt.to.children;    // Get target's children
        /* Iteracion sobre los items para enumerar */
        enumerarItems(items);
    }
});

new Sortable(formsets_texto, {
    animation: 150,
    ghostClass: 'blue-background-class',

    /* Numeración de las preguntas despues de ordenar */
    onEnd: function (/**Event*/evt) {
        var items = evt.to.children;    // Get target's children
        /* Iteracion sobre los items para enumerar */
        enumerarItems(items);
    }
});

function enumerarItems(element){
    $.each(element, function( item, value ) {
        var counter = item + 1
        var idItem = 'row'+counter
        $(value).prop('id', idItem);
        
        var div = $(":first", value);
        var label = $(":first", div);
        $(label).text(counter);
    })
}

/* Agregar pregunta */
function agregarRespuesta(tipo) {
    if (tipo == 'texto'){
        var formsets = $('#formsets_texto');
    }
    
    if (tipo == 'numero'){
        var formsets = $('#formsets_numero');
    }
    
    var question_template = $(":first", formsets);
    /* Copia el primer elemento y lo agrega al final */
    $(question_template).clone().appendTo(formsets);
    enumerarItems(formsets.children());
  }


function quitarRespuesta(elemento, tipo){
    if (tipo == 'texto'){
        var formsets = $('#formsets_texto');
    }
    
    if (tipo == 'numero'){
        var formsets = $('#formsets_numero');
    }
    /* Identifica el row para eliminar una pregunta */
    var pregunta = $(elemento).parent().parent();
    /* Verifica que exista mas de una pregunta para no afectar la funcion agregarPregunta */
    if ($(formsets).children(".row").length > 1){
        /* Elimina pregunta del form */
        pregunta.remove();
        enumerarItems(formsets.children());
    }else{
        /* Muestra error si solo hay una pregunta */

        var option = {
            animation : true,
            delay : 3000,
            autohide : true,
        };

        var toastHTMLElement = $('#toast');
        var toastElement = new bootstrap.Toast(toastHTMLElement, option);
        toastElement.show();
    }
}
