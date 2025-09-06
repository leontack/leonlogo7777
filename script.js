document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const signupBtn = document.getElementById('signup-btn');
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout');
  const userEmailSpan = document.getElementById('user-email');
  const addProductBtn = document.getElementById('add-product-btn');

  let currentUser = localStorage.getItem('currentUser') || null;
  let balance = parseFloat(localStorage.getItem('balance')) || 777777;

  function showToast(msg,type='success'){ const c=document.getElementById('toast-container'); const t=document.createElement('div'); t.className=`toast toast-${type}`; t.innerText=msg; c.appendChild(t); setTimeout(()=>c.removeChild(t),3000);}
  function getUsers(){return JSON.parse(localStorage.getItem('users'))||[];}
  function saveUsers(u){localStorage.setItem('users',JSON.stringify(u));}
  function getProducts(){return JSON.parse(localStorage.getItem('products'))||[];}
  function saveProducts(p){localStorage.setItem('products',JSON.stringify(p));}
  function getPurchases(){return JSON.parse(localStorage.getItem('purchases'))||[];}
  function savePurchases(p){localStorage.setItem('purchases',JSON.stringify(p));}

  function updateUI(){
    userEmailSpan.innerText=currentUser||'Гість';
    document.getElementById('balance').innerText=balance.toFixed(2);
    document.getElementById('add-product-section').style.display=currentUser?'block':'none';
    logoutBtn.style.display=currentUser?'inline-block':'none';
    loadProducts();
    renderAccount();
  }

  signupBtn.addEventListener('click',()=>{
    const email=emailInput.value.trim(),password=passwordInput.value.trim();
    if(!email||!password)return showToast('Заповніть усі поля','error');
    let users=getUsers();
    if(users.find(u=>u.email===email))return showToast('Користувач вже існує','error');
    users.push({email,password}); saveUsers(users); currentUser=email; balance=777777; localStorage.setItem('currentUser',currentUser); localStorage.setItem('balance',balance); updateUI(); showToast('Реєстрація успішна! $777,777 бонус');
  });

  loginBtn.addEventListener('click',()=>{
    const email=emailInput.value.trim(),password=passwordInput.value.trim();
    const user=getUsers().find(u=>u.email===email&&u.password===password);
    if(!user)return showToast('Неправильний email або пароль','error');
    currentUser=email; balance=parseFloat(localStorage.getItem('balance'))||777777;
    localStorage.setItem('currentUser',currentUser); localStorage.setItem('balance',balance); updateUI(); showToast('Вхід успішний');
  });

  logoutBtn.addEventListener('click'=>{currentUser=null; localStorage.removeItem('currentUser'); updateUI(); showToast('Вийшли з системи','warning');});

  addProductBtn.addEventListener('click',()=>{
    const name=document.getElementById('product-name').value.trim();
    const price=parseFloat(document.getElementById('product-price').value);
    const image=document.getElementById('product-image').value.trim();
    const type=document.getElementById('product-type').value;
    if(!name||!price||!image||!type)return showToast('Заповніть всі поля','error');
    const products=getProducts(); products.push({name,price,image,type,seller:currentUser}); saveProducts(products); loadProducts
