
/* Inicia sort en las preguntas */
new Sortable(formsets, {
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
function agregarPregunta() {
    var formsets = $('#formsets');
    var question_template = $(":first", formsets);
    /* Copia el primer elemento y lo agrega al final */
    $(question_template).clone().appendTo(formsets);
    enumerarItems(formsets.children());
  }


function quitarPregunta(elemento){
    var formsets = $('#formsets');
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

function filtrarRespuestas(pregunta){
    var pregunta = $(pregunta);
    var pregunta_value = $(pregunta).val();
    var token = $("#main_form").find('input[name=csrfmiddlewaretoken]').val();
    var url = $("#main_form").find('input[name=url]').val();
    var html_code = '<option value="" selected="">---------</option>';
    $.ajax({
        url: url,
        data: {
            'csrfmiddlewaretoken': token,
            'pregunta': pregunta_value,
        },
        type: "POST",
        dataType : 'json',
        success: function(data){
            if (data){
                //console.log(JSON.stringify(data));
                $.each(data, function(arrayID,model) {
                    key = model.pk;
                    value = model.fields["respuesta"];
                    html_code = html_code + '<option value="'+key+'">'+value+'</option>';
                });

                var parent = $(pregunta).parent().parent()
                var select_id = $(parent).find('select[name=respuesta_condicional]');
                $(select_id)
                    .empty()
                    .append(html_code);

            }else{
                alert('no hay nada');
            }
        }
    });

    
}