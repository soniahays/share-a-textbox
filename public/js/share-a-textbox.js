$(function() {
    $.ajax({
        type: 'GET',
        url: '/text',
        success:function(data) {
            console.log("returned data:",data);
            $('#text-content').html(data.text);
        }
        , error: function(jqXHR, textStatus, err){
           console.log('text status '+textStatus+', err '+err);
        }
    }),
        $('#save-text').click(function(){
            var textContent = $('#text-content').val();
            console.log(textContent)
            $.ajax({
                type: 'POST',
                data: {'text':textContent},
                url: '/share',
                success:function(data) {
                    console.log(data);

                }
                , error: function(jqXHR, textStatus, err){
                    console.log('text status '+textStatus+', err '+err)
                }
            })

        })
});
