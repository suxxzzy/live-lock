const ul = document.querySelector('ul');
console.log(ul);
let i = 1;
while (i <= 17) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = `vweb${i}`;
  const btn = document.createElement('button');
  btn.classList.add('transfer');
  btn.innerText = '절체';
  const cancelbtn = document.createElement('button');
  cancelbtn.classList.add('cancel');
  cancelbtn.innerText = '취소';
  li.append(span, btn, cancelbtn);
  ul.append(li);
  i++;
}
