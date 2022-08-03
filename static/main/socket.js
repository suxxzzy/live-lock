// Handler when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const socket = io('http://localhost:3000');

  socket.on('connect', function () {
    console.log('connected:접속한 누구나 볼 수 있어요');
    socket.emit('getServerLockList', function (response) {
      console.log(response, '새로 접속한 사람도 볼수있엏ㅎㅎ');
      //버튼 목록을 필터링한다.
      const buttonsArray = document.querySelectorAll('.transfer');
      const locked = Array.from(buttonsArray).filter((btn) =>
        response.includes(btn.previousElementSibling.innerText),
      );
      const unlocked = Array.from(buttonsArray).filter(
        (btn) => !response.includes(btn.previousElementSibling.innerText),
      );
      console.log(locked, unlocked, '구분.');
      //locked에 있는 것만 잠금처리
      locked.forEach((btn) => {
        btn.disabled = true;
        btn.parentElement.childNodes[3].classList.add('locked');
      });

      unlocked.forEach((btn) => {
        btn.disabled = false;
        btn.parentElement.childNodes[3].classList.remove('locked');
      });
    });
  });

  let selectedServer;
  //절체
  const buttonsArray = document.querySelectorAll('.transfer');
  buttonsArray.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      selectedServer = e.target.previousElementSibling.innerText;

      socket.emit('onServerLock', selectedServer);
    }),
  );

  //취소
  const cancelButtonsArray = document.querySelectorAll('.cancel');
  cancelButtonsArray.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      selectedServer = e.target.parentNode.childNodes[0].innerText;

      socket.emit('onServerUnlock', selectedServer);
    }),
  );

  socket.on('onServerLockListToClient', (response) => {
    //현재 있는 서버 목록 추출
    const servernames = document.querySelectorAll('span');
    //절체 막을 거
    Array.from(servernames)
      .filter((servername) => {
        return response.includes(servername.innerText);
      })
      .forEach((servername) => {
        servername.parentNode.childNodes[1].disabled = true;
        servername.parentNode.childNodes[3].classList.add('locked');
      });

    //절체 풀어줄거
    Array.from(servernames)
      .filter((servername) => {
        return !response.includes(servername.innerText);
      })
      .forEach((servername) => {
        servername.parentNode.childNodes[1].disabled = false;
        servername.parentNode.childNodes[3].classList.remove('locked');
      });
  });

  socket.on('disconnect', function () {
    console.log('Disconnected');
  });
});
