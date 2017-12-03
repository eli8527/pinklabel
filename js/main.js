---
---
$(function() {
  var items = {{ site.shop | jsonify }};

  $('.drag-bar').mousedown(handle_mousedown);
  function handle_mousedown(e){
    var mouse = {};
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    var elem = $(this).parent().closest('div');
    var offset = $(elem).offset();
    pauseEvent(e);

    function handle_dragging(e){
        var left = offset.left + (e.pageX - mouse.x);
        var top = offset.top + (e.pageY - mouse.y);
        $(elem).offset({top: top, left: left});
        pauseEvent(e);
    }
    function handle_mouseup(e){
        $('body')
        .off('mousemove', handle_dragging)
        .off('mouseup', handle_mouseup);
    }
    $('body')
      .on('mouseup', handle_mouseup)
      .on('mousemove', handle_dragging);
  }

  $('.ad_images').each(function() {
    var item_id = parseInt($(this).attr('id').substring(3));
    var item_img = items.filter(function(item) {
      if (item.item_id === item_id)
        return true;
    })[0].image;

    $(this).click(function(e) {
      console.log([e.clientX, e.clientY]);
        var floater = document.createElement('div');
          $(floater).addClass('floater')
            .addClass('floater')
            .width(Math.random()*400+200)
            .offset({top: 0, left: 0})
            .appendTo($('body'));

        var drag = document.createElement('div');
          $(drag).addClass('drag-bar')
            .mousedown(handle_mousedown)
            .appendTo(floater);

        var close = document.createElement('img');
        close.setAttribute('src', 'img/close-01.png');
        close.setAttribute('width', '15px');
        $(close).addClass('close')
          .appendTo(drag);

        var content = document.createElement('div');
        $(content).addClass('floater-content')
          .html('<img src="item_img/' + item_img + '">')
          .appendTo(floater);

        $(close).click(function() {
          $(floater).remove();
        });
        $(floater).offset({top: e.pageY, left: e.pageX});

    });
  });

  window.updateFields = function updateFields() {
    var numItems = 0;
    var grandTotal = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var item_id = item.item_id;

      var quantity = $('#qty_' + item_id).val();
      var total = quantity * item.cost;
      total = Math.round(total * 100) / 100;
      grandTotal += total;

      total = total > 0 ? total : '';
      $('#total_' + item_id).val(total);
    }

    grandTotal = grandTotal > 0 ? grandTotal : '';
    $('#grandtotal').val(grandTotal);
  }

  function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}
});
