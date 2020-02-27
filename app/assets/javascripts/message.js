$(function(){
  function buildHTML(message){
    if (message.image){
      var html =
       `<div class="main-caht__caht-space__massge__name-time" data-message-id=${message.id}>
          <div class="main-caht__caht-space__massge__name-time__name">
            ${message.user_name}
          </div>
          <div class="main-caht__caht-space__massge__name-time__time">
            ${message.created_at}
          </div>
        </div>
          <div class="main-caht__caht-space__massge__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="main-caht__caht-space__massge__name-time" data-message-id=${message.id}>
          <div class="main-caht__caht-space__massge__name-time__name">
            ${message.user_name}
          </div>
          <div class="main-caht__caht-space__massge__name-time__time">
            ${message.created_at}
          </div>
        </div>
          <div class="main-caht__caht-space__massge__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on("submit", function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-caht__caht-space').append(html);
      $('.main-caht__caht-space').animate({ scrollTop: $('.main-caht__caht-space')[0].scrollHeight});
      $('form')[0].reset();
      $(".main-caht__message-form__post-form--submit").prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $(".main-caht__message-form__post-form--submit").prop("disabled", false);
    });
  });
});