$(function() {

  function buildHTML(message) {
    if(message.image && message.body) {
      var html =  `<div class="main_chat__message__content" data-message-id="${message.id}" style="user-select: auto;">
                    <div class="main_chat__message__content--name" style="user-select: auto;">
                      ${message.user_name}
                      <span style="user-select: auto;">
                      ${message.created_at}
                    </span>
                    </div>
                    <div class="main_chat__message__content--message" style="user-select: auto;">
                      <div class="main_chat__message__content--message--text" style="user-select: auto;">
                        ${message.body}
                      </div>
                      <img class="lower-message__image" src="${message.image}">
                    </div>
                  </div>`
    }else if(message.image) {
      var html =  `<div class="main_chat__message__content" data-message-id="${message.id}" style="user-select: auto;">
                    <div class="main_chat__message__content--name" style="user-select: auto;">
                      ${message.user_name}
                      <span style="user-select: auto;">
                      ${message.created_at}
                    </span>
                    </div>
                    <div class="main_chat__message__content--message" style="user-select: auto;">
                      <img class="lower-message__image" src="${message.image}">
                    </div>
                  </div>`

    }else{
      var html = `<div class="main_chat__message__content" data-message-id="${message.id}" style="user-select: auto;">
                    <div class="main_chat__message__content--name" style="user-select: auto;">
                      ${message.user_name}
                      <span style="user-select: auto;">
                      ${message.created_at}
                    </span>
                    </div>
                    <div class="main_chat__message__content--message" style="user-select: auto;">
                      <div class="main_chat__message__content--message--text" style="user-select: auto;">
                        ${message.body}
                     </div>
                    </div>
                  </div>`
    }
    
   
    return html;

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
      $('.main_chat__message').append(html);
      $('form')[0].reset();
      $('.main_chat__message').animate({scrollTop: $('.main_chat__message')[0].scrollHeight});
      $('.message--btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
    })
  });

  var reloadMessages = function() {

    var last_message_id = $('.main_chat__message__content:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message').append(insertHTML);
        $('.main_chat__message').animate({ scrollTop: $('.main_chat__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  }; 
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});