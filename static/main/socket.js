// Handler when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const socket = io('http://localhost:3000');

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

  socket.on('connect', function () {
    console.log('Connected');
  });

  socket.on('onServerLockListToClient', (response) => {
    //현재 있는 서버 목록 추출
    const servernames = document.querySelectorAll('span');
    console.log(response, '왜안됨');

    console.log(
      Array.from(servernames).filter((servername) => {
        return response.includes(servername.innerText);
      }),
    );

    //절체 막을 거
    Array.from(servernames)
      .filter((servername) => {
        return response.includes(servername.innerText);
      })
      .forEach((servername) => {
        servername.parentNode.childNodes[1].disabled = true;
      });

    //절체 풀어줄거
    Array.from(servernames)
      .filter((servername) => {
        return !response.includes(servername.innerText);
      })
      .forEach((servername) => {
        servername.parentNode.childNodes[1].disabled = false;
      });
  });

  socket.on('disconnect', function () {
    console.log('Disconnected');
  });
});
