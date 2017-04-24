function getChords() {
  var setposition=escape($("[name=firstchord]:checked").val()+$("[name=secondchord]:checked").val()+$("[name=thirdchord]:checked").val()
                  +$("[name=fouthchord]:checked").val()+$("[name=fifthchord]:checked").val()+$("[name=sixthchord]:checked").val());
  $.ajax({
    type: 'GET',
    url: API_URL + "/chord/list",
    statusCode: {
      200: function(response) {
        $("#chordList").empty(); // 一度表示しているリストを初期化します
        for (var i = 0; i < response.chord.length; i++) {
          $("#chord").empty();
          /*
            以下のようなHTMLをchannelListに追加していきます
            <a class="list-group-item" href="chat.html#[チャンネル名]">
              <h4 class="list-group-item-heading">#[チャンネル名]</h4>
              <p class="list-group-item-text">[チャンネル説明]</p>
            </a>
          */
          var canvas = document.getElementById('position-graphic');
          if ( ! canvas || ! canvas.getContext ) { return false; }
          var ctx = canvas.getContext('2d');
          //canvas全体をクリア
          ctx.clearRect(0,0,400,160);

          var data = response.chord[i];
          if(setposition=="xxxxxx"){
            $("<a>", {
              class: "col-xs-2",
              href: "chord.html#" + unescape(data.name),
              style:"border: 1px solid"
            }).append($("<h4>", {
              class: "list-group-item-heading",
              text: unescape(data.name)
            })).append($("<p>", {
              class: "list-group-item-text",
              text: unescape(data.position)
            })).appendTo("#chordList");
          }else if(setposition==data.position){
                  var name=data.name;
                  var position=data.position;


                  ctx.fillStyle="#cc6317";
                  ctx.fillRect(20,20,360,100);
                  ctx.beginPath();
                  for(i=20;i<=120;i=i+20){
                  ctx.moveTo(20,i);
                  ctx.lineTo(380,i);
                  }
                  for(i=20;i<=380;i=i+35){
                  ctx.moveTo(i,20);
                  ctx.lineTo(i,120);
                  }
                  ctx.closePath();
                  ctx.stroke();

                  ctx.fillStyle="#000000";
                  ctx.font = "10px 'HG正楷書体-PRO'";
                  for(k=1;k<=10;k++){
                    ctx.fillText(k,(k*35),10);
                  }
                  ctx.font = "25px 'HG正楷書体-PRO'";
                  var txt="×";
                  for(j=0;j<=5;j++){
                    if(position[j]==0 || position[j]=="x"){
                      if (position[j]=="x") {
                        ctx.fillText(txt,10,28+(j*20));
                      }
                    }else{
                    ctx.beginPath();
                    ctx.arc(3+(position[j]*35), (j+1)*20, 10, 0, Math.PI*2, false);
                    ctx.closePath();
                    ctx.fill();
                    }
                  }
                  /*（1）Pタグの要素ノードオブジェクト*/
                　 var chordname = document.getElementById('chord');
                　 /*（2）新たにテキストノードを作成する*/
                　 var textNode = document.createTextNode(name);
                　 /*（3）作成したテキストノードをPタグ要素の子要素として追加する*/
                　 chordname.appendChild(textNode);

                var keep=escape($("[name=keepchord]:checked").val());
                if(keep==1){
                　 var keepchord = document.getElementById('keepchord');
                   var textNode = document.createTextNode(name+"→");
                　 keepchord.appendChild(textNode);
              }

            }else{
              /*（1）Pタグの要素ノードオブジェクト*/
            　 var chordname = document.getElementById('chord');
            　 /*（2）新たにテキストノードを作成する*/
            　 var textNode = document.createTextNode("一致するコードが見つかりませんでした。");
            　 /*（3）作成したテキストノードをPタグ要素の子要素として追加する*/
            　 chordname.appendChild(textNode);
            }
        }
      },
      400: function(response) {
        var responseJSON = JSON.parse(response.responseText);
        alert(responseJSON.message);
      }
    }
  });
}

function logout() {
  localStorage.removeItem("uid");
  location.href = "login.html";
}
