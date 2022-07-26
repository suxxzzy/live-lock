const ul = document.querySelector('ul');
let i = 1;
while (i <= 10) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = `${i}번째 게시물`;
  const btn = document.createElement('button');
  btn.innerText = '수정';
  li.append(span, btn);
  ul.appendChild(li);
  i++;
}
