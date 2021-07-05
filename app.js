let localStream = null;
// 이제 app.js 파일을 만들어 본격적으로 
// 클라이언트 구현을 해보자. 
// 가장 첫번째로 할 일은 getUserMedia를 통해 
// 웹캠 화면을 가져오는 것이다.
if(navigator.getUserMedia) {
    navigator.getUserMedia(
        {
            video:true,audio:true
        },
        resultStream => {
            localStream = resultStream
            $('#video-preview')[0].srcObject = resultStream
        },
        error=> {
            console.log('웹캠 권한을 거부하였거나 오류가 발생하였습니다')
            console.error(error)
        }
        
    )
}else {
    console.log('브라우저가 웹캠을 지원하지 않습니다')
    
}