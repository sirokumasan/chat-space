$(function() {

  function buildHTML(message) {
    if(message.image) {
      var body_image = `<div class="main_chat__message__content--message" style="user-select: auto;">
                          <div class="main_chat__message__content--message--text" style="user-select: auto;">
                            ${message.body}
                          </div>
                          <img class="lower-message__image" src= ${message.image} alt="Tana" style="user-select: auto;">
                        </div>`                        

    } else {
      var body_image =  `<div class="main_chat__message__content--message" style="user-select: auto;">
                          <div class="main_chat__message__content--message--text" style="user-select: auto;">
                            ${message.body}
                          </div>
                        </div>`

    };

    var html = `<div class="main_chat__message__content" style="user-select: auto;">
                  <div class="main_chat__message__content--name" style="user-select: auto;">
                    ${message.user_name}
                    <span style="user-select: auto;">
                      ${message.created_at}
                    </span>
                  </div>
                  ${body_image}
                </div>`

    return html
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      console.log(data.body);
      $('.main_chat__message').append(html);
      $('form')[0].reset();
      $('.main_chat__message').animate({scrollTop: $('.main_chat__message')[0].scrollHeight});
      $('.message--btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
    })
  });
});