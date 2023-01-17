const btnYes = document.querySelector(".yes");
const btnNo = document.querySelector(".no");
const msg = document.querySelector(".msg");
const myBar = document.querySelector(".progres-bar");
const box = document.querySelector(".box-wrapper");
const getBar = document.querySelector(".progres-bar div");
const gifImg = document.querySelector("img");
const saveBtn = document.querySelector(".pasti");
const wrapperBtn = document.querySelector(".chossing-wrapper");
const mybg = document.querySelector(".my-bg");
const animatePro = document.querySelector(".my-info");

function clicked() {
    animatePro.classList.toggle('animate');
}

// Waktu TUnggu Berlangsung
let setTime;

// Position Text User
let position = 0;

// DataBase Local Storage
let myDataBase = [];

let setMessage;

// Check Semua Data yang ada di URL
const params = new URLSearchParams(document.location.search);
let nameTr = params.has("name");
let textTr = params.has("text");
let numberTr = params.has('no');

// Document Check HTML
document.addEventListener("DOMContentLoaded", () => {
    mybg.classList.toggle("show");

    // Animasi Pertama
    setTimeout(() => { mybg.classList.toggle("blur")}, 1500);

    // Periksa Apakah LocalStorage True
    if(localStorage.hasOwnProperty("save")) {
      let myLocal = JSON.parse(localStorage.getItem('save'));
        myDataBase.push(myLocal);
        chatPosition(parseInt(myDataBase[0][0]))
        console.log(myDataBase);
     setTimeout(() => { box.classList.toggle("scaling")},3000);
    } else {
    setTimeout(() => { box.classList.toggle("scaling")},3000);
        chatPosition(0);
    }
  });

// Implikasi text 
function text(mes,yes,no,ima,fyes,fno,t) {
    setTimeout(() => {
        wrapperBtn.innerHTML = `
        <div class='yes' onclick='${fyes}'>${yes}</div>
        <div class='no' onclick='${fno}'>${no}</div>`
        msg.innerHTML = `"${mes}"`;
        gifImg.src = ima;
    },t);
}

// Animasi Box Message
function btnAnimate() {
    box.className = "box-wrapper scaler";
    setTimeout(() => {
    box.className = "box-wrapper scaling";
    },700);
}

// Animasi Bar Timer
function baringAnm() {
    myBar.className = "progres-bar";
    setTimeout(() => {
    myBar.className = "progres-bar baring";
    }, 500)
}

// Menampilkan Text hanya dengan satu Button
function textOneButton(mes,yes,fun,ima,t) {
    setTimeout(()=>{
        wrapperBtn.innerHTML = `<div class='yes' onclick='${fun}'>${yes}</div>`;
        msg.innerHTML = `"${mes}"`;
        gifImg.src = ima;
    },t);
}

// Remove Bar
function remBar() {
    myBar.style.display = "none";
}

// Function Membesar Text Dibagian Pertama
function letterCapitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Membuat Waktu Tunggu
function getTimeout() {
    setTime = setTimeout(() => {
        textOneButton(`"sombong Amat😒"`,`GO &#8592` ,`restart()`,"https://media.tenor.com/RJgIui1E_2QAAAAi/teddy-bear.gif",700);
        btnAnimate();
        remBar();
    },5200);    
}

// Refresh Page
function restart() {
    window.location.reload();
}

// Go to Link
function goLink() {
    window.location.replace(myDataBase[0][1]);
}

// Save Data
function saveD(n) {
    localStorage.setItem('save', JSON.stringify(myDataBase));
    chatPosition(n)
    btnAnimate();
}

// Generate Link
function GenerateLink() {
    let numberHp;
    let linkGet;
    if (numberTr) {
        numberHp = params.get("no");
        if(numberHp.charAt(0) == 0) {
            numberHp = "62"+numberHp.slice(0);
        }
    }
    if (numberTr && textTr) {
        linkGet = `https://api.whatsapp.com/send/?phone=${numberHp}&text=${params.get("text")}&type=phone_number&app_absent=0`;
    }
    if (numberTr && textTr == false) {
        linkGet = `https://api.whatsapp.com/send/?phone=${numberHp}&text&type=phone_number&app_absent=0`;
    }
    if (numberTr == false && textTr) {
        linkGet = `https://api.whatsapp.com/send/?phone&text=${params.get("text")}&type=phone_number&app_absent=0`;
    }
    if (numberTr == false && textTr== false) {
        linkGet = `https://api.whatsapp.com/send/?phone&text=${setMessage}&type=phone_number&app_absent=0`;
    }
    return linkGet;
}


// Button IS No
function yesPost(n) {
    btnAnimate();
    clearTimeout(setTime);
    chatPosition(n);
}

function noPost(n) {
    btnAnimate();
    clearTimeout(setTime);
    chatPosition(n)
}

function chatPosition(n) {
    switch (n) {
        case 0:
            if (nameTr) {
                text(`Sayang ku <b>${letterCapitalize(params.get("name"))}</b>,lagi sibuk gak?`,`gk nih`,`iya`,"./img/beruang.gif","yesPost(1)","noPost(2)",0);
        
                } else {
                  text(`Sayang ku, lagi sibuk gak?`, `gk nih`, `iya`,"./img/beruang.gif","yesPost(1)","noPost(2)",0);
            }
            break;
        case 2:
            text(`Sayang gak ada waktu buat aku? 😢😢`,`iya syg`,`maaf syg`, "./img/sedih.gif","yesPost(3)","noPost(9)",700);
            baringAnm();
            getTimeout();
            break;
        case 9:
            textOneButton(`ok😒`,`OK👍`,'saveD(15)',"./img/telur.gif",700);
            remBar();
            myDataBase.push(15);
            setMessage = "Mr.Cool😎";
            myDataBase.push(GenerateLink());
            break;
        case 15:
            textOneButton("Mr.Cool😎","Send <img src='./img/whats.svg'/>", "goLink()","./img/cool.gif",700);
            break;
        case 1:
            text("Yang bener, gak ganggu nie😘","iya syg","sebenernya ganggu😢","./img/kiss.gif","yesPost(4)","noPost(9)",700)
            getTimeout();
            baringAnm();
            break;
        case 4:
            textOneButton("Gak ada kok, Cuman Mau Bilang Sesuatu 👉👈","Bilang Apa tuh", "yesPost(5)","./img/panda.gif",700)
            baringAnm();
            getTimeout();
            break;
        case 5:
            textOneButton("I Love U ❤😜", "hihihi", "saveD(16)", "./img/peluk.gif",700);
            setMessage = "Si%20Paling%20Di%20Cintai💏";
            remBar();
            myDataBase.push(16);
            myDataBase.push(GenerateLink());
            break;
        case 16:
            textOneButton("Si Paling Di Cintai💏","<span>Send</span><img src='./img/whats.svg'/>","goLink()","./img/ganggu.gif",700);
            break;
        default:
            break;
    }
}