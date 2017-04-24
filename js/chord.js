function getChords() {
  $.ajax({
    type: 'GET',
    url: API_URL + "/chord/list",
    statusCode: {
      200: function(response) {
        $("#chordList").empty(); // 一度表示しているリストを初期化します
        for (var i = 0; i < response.chord.length; i++) {
          /*
            以下のようなHTMLをchannelListに追加していきます
            <a class="list-group-item" href="chat.html#[チャンネル名]">
              <h4 class="list-group-item-heading">#[チャンネル名]</h4>
              <p class="list-group-item-text">[チャンネル説明]</p>
            </a>
          */
          var data = response.chord[i];
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
        }
      },
      400: function(response) {
        var responseJSON = JSON.parse(response.responseText);
        alert(responseJSON.message);
      }
    }
  });
}

function createChord() {
  var data = {
    name: escape($("#inputChord")[0].value),
    position: escape($("[name=firstchord]:checked").val()+$("[name=secondchord]:checked").val()+$("[name=thirdchord]:checked").val()
                    +$("[name=fouthchord]:checked").val()+$("[name=fifthchord]:checked").val()+$("[name=sixthchord]:checked").val())
  };
  $.ajax({
    type: 'POST',
    url: API_URL + "/chord/create",
    data: JSON.stringify(data),
    statusCode: {
      200: function() {
        // チャンネルの作成に成功した場合はもう一度チャンネルの一覧を読込直す
        getChords();
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
