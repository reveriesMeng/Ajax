window.onload = function() {

	function $(divid) {
		return document.getElementById(divid);
	}

	function chat() {

		var xhr = new XMLHttpRequest();

		var message = document.getElementsByClassName('chatBox-body-item'),
			messageback = message[0].cloneNode(true),
			messagemy = message[1].cloneNode(true);
		//自己发送的简讯
		messagemy.lastElementChild.lastElementChild.innerHTML = $('chatBox-footer-input').value;
		messagemy.style.display = 'flex';
		$('chatBox-body').appendChild(messagemy);
		$('chatBox-body').scrollTop = $('chatBox-body').scrollHeight; //插入一条消息滚动条下拉一次

		xhr.open('post', 'http://www.tuling123.com/openapi/api');
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {

			if (xhr.readyState == 4 && xhr.status == 200) {
				//机器人回复的消息
				messageback.lastElementChild.lastElementChild.innerHTML = JSON.parse(xhr.responseText).text;
				messageback.style.display = 'flex';
				$('chatBox-body').appendChild(messageback);
				$('chatBox-body').scrollTop = $('chatBox-body').scrollHeight; //插入一条消息滚动条下拉一次

			}

		}

		xhr.send("key=9257afd24a374c69b91eeb687d463763&userid=Fengmaybe&info=" + $('chatBox-footer-input').value);


		//ajax请求后清空发送框内容
		$('chatBox-footer-input').value = '';

	}

	$('chatBox-footer-btn').onclick = chat;  //点击按钮发送消息
	document.onkeydown = function(ev) {      //键盘enter发送消息
		if (ev.keyCode == 13) {
			chat();
		}
	}

}