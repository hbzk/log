var shareHide = true;
var nonHref = true;
var txt = 'semiLog';

var baseUrl = 'http://'+serverUrl+':2222/sns/snsResult.jsp?p=';
var facebookUrl = 'http://www.facebook.com/sharer/sharer.php?u=';
var twitterUrl = 'http://twitter.com/intent/tweet?text=' + txt + '&url=';
var lineUrl = 'http://line.me/R/msg/text/?';

// kakao dev Javascript 키 설정
Kakao.init('4793e016164b581fe2eff90fc0d7550e');

$(function(){
	// 공유 버튼
	$('#share').on('click', function(e){
		if (shareHide) { // 숨김 상태일때 
			$('#shareDiv').fadeToggle(1000); shareHide = false;
			makeHref();
		}
		else { 
			$('#shareDiv').fadeToggle(400); shareHide = true;
		}
	});
	
	// 모바일 기능 막기
	$('#shareDiv a').on('click', function(e) {
		// 모바일 아니면서
		var isMobile = (navigator.userAgent.match(/(android)|(iphone)|(ipod)|(ipad)/i));
		if (!isMobile) {
			var sns = e.currentTarget.id;
			// 페북이나 트위터가 아니면
			if (sns!='facebook' && sns!='twitter') {
				e.preventDefault();
				alert('이 기능은 모바일에서만 사용할 수 있습니다.');
			}
		}
	});
});
// <-- $(function(){}





// 공유 버튼 누를때 url 생성 후 링크 만들기
function makeHref() {
	if (nonHref) {
		var period = $('#stDt').text();
		var urlParam = SHA1(userNo + new Date());
		
		$.post('http://'+serverUrl+':1111/snsShare', {urlParam: urlParam, scope: scope, period: period, result: result})
		.done(function(insertId) {
			console.log(insertId);
			if (insertId != '') {
				$('#facebook').attr('href', facebookUrl + baseUrl + urlParam);
				$('#twitter').attr('href', twitterUrl + baseUrl + urlParam);
				$('#line').attr('href', lineUrl + encodeURIComponent(baseUrl) + urlParam);
				
				// 카카오톡 링크 버튼을 생성. 처음 한번만 호출
				Kakao.Link.createTalkLinkButton({
					  container: '#kakaotalk',
					  label: 'semiLog',
					  image: {
					    src: 'http://'+serverUrl+':2222/sns/img/semiLog_logo.png',
					    width: '100',
					    height: '100'
					  },
					  webButton: {
					    text: 'semiLog',
					    url: 'http://'+serverUrl+':2222/sns/snsResult.jsp?p=' + urlParam // kakao dev에 등록한 도메인의 URL이어야 함
					  }
				});
				$('#line>span').html('<script type="text/javascript"> new media_line_me.LineButton({"pc":true,"true":"kr","type":"d","text":"http://'+serverUrl+':2222/sns/snsResult.jsp","withUrl":false})');
			}
			nonHref = false;
		});
		
	}	
}