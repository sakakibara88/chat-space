$(function(){
  
  var buildHTML = function(message) {
    let name_created_at = `<div  class="main-caht__caht-space__massge" >` +
    `<div class="main-caht__caht-space__massge__name-time" data-message-id=` + message.id + `>` +
      `<div class="main-caht__caht-space__massge__name-time__name" >` +
        message.user_name +
      `</div>` +
      `<div class="main-caht__caht-space__massge__name-time__time">` +
        message.created_at +
      `</div>` +
    `</div>`
    
    if (message.content && message.image) {
      var html = name_created_at +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      var html = name_created_at +
        `<div class="main-caht__caht-space__massge__text">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = name_created_at +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  
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
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.main-caht__caht-space__massge__name-time:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.main-caht__caht-space').append(insertHTML);
      $('.main-caht__caht-space').animate({ scrollTop: $('.main-caht__caht-space')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});