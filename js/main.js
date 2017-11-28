$(function() {
  $('.drag-bar').mousedown(handle_mousedown);

  function handle_mousedown(e){
    var mouse = {};
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    var elem = $(this).parent().closest('div');
    var offset = $(elem).offset();

    function handle_dragging(e){
        var left = offset.left + (e.pageX - mouse.x);
        var top = offset.top + (e.pageY - mouse.y);
        $(elem).offset({top: top, left: left});
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
});
