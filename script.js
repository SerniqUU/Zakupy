$(document).ready(function()
{
    // DRAG & DROP
    $("#shoppingList").sortable();

    function addItem(text, method = "append"){
        if(text.trim() === "") return;

        let li = $("<li>")
            .addClass("list-group-item")
            .text(text);

        if(method === "prepend"){
            $("#shoppingList").prepend(li);
        } else {
            $("#shoppingList").append(li);
        }

        $("#productInput").val("");
    }

    // Dodaj produkt
    $("#addProduct").click(function(){
        addItem($("#productInput").val());
    });

    // Usuń ostatni
    $("#removeLast").click(function(){
        $("#shoppingList li:last").remove();
    });

    // Dodaj na początku
    $("#addStart").click(function(){
        addItem($("#productInput").val(), "prepend");
    });

    // Dodaj na końcu
    $("#addEnd").click(function(){
        addItem($("#productInput").val(), "append");
    });

    // Wyczyść listę
    $("#clearList").click(function(){
        $("#shoppingList").empty();
    });

    // Przywróć listę
    $("#restoreList").click(function(){
        $("#shoppingList").html(`
            <li class="list-group-item">Jabłka</li>
            <li class="list-group-item">Banany</li>
            <li class="list-group-item">Ser</li>
        `);
    });

    // Pokoloruj co drugi
    $("#colorEven").click(function(){
        $("#shoppingList li:even").css("background-color", "#d1e7dd");
    });

    // Sortowanie alfabetyczne
    $("#sortList").click(function(){
        let items = $("#shoppingList li").get();

        items.sort(function(a, b){
            return $(a).text().localeCompare($(b).text());
        });

        $("#shoppingList").empty().append(items);
    });

    // Filtrowanie
    $("#filterInput").on("keyup", function(){
        let value = $(this).val().toLowerCase();

        $("#shoppingList li").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // EDYCJA + ACTIVE + FADE
    $(document).on("click", "#shoppingList li", function(){

        let li = $(this);

        if(li.find("input").length > 0) return;

        li.addClass("active");

        let currentText = li.text();

        li.fadeOut(200, function(){
            let input = $("<input>")
                .addClass("form-control")
                .val(currentText);

            li.html(input).fadeIn(200);

            input.focus();

            input.keypress(function(e){
                if(e.which === 13){
                    let newText = $(this).val();
                    li.fadeOut(200, function(){
                        li.text(newText)
                        .removeClass("active")
                        .fadeIn(200);
                    });
                }
            });
        });
    });

    });