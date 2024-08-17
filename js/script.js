// HTML要素の取得
const startButton = document.getElementById("startButton");
const drawButton = document.getElementById("drawButton");
const retryButton = document.getElementById("retryButton");
const shareButton = document.getElementById("shareButton");
const returnButton = document.getElementById("returnButton");
const imageContainer = document.getElementById("imageContainer");
const actionButtons = document.getElementById("actionButtons");
const titleScreen = document.getElementById("titleScreen");
const mainScreen = document.getElementById("mainScreen");

// 画像ファイル名の配列を作成
const images = [
    "images/tsuzu1.jpg",
    "images/tsuzu2.jpg",
    "images/tsuzu3.jpg",
    "images/tsuzu4.jpg",
    "images/tsuzu5.jpg",
    "images/tsuzu6.jpg",

    // ここに200枚の画像ファイル名を追加
    // "images/image3.png",
    // ...
];

// タイトル画面からメイン画面に遷移する関数
function startApp() {
    titleScreen.style.display = "none";
    mainScreen.style.display = "block";
}

// ガチャを引く関数
function drawGacha() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    imageContainer.innerHTML = `<img src="${selectedImage}" alt="ガチャ結果">`;
    drawButton.style.display = "none";
    actionButtons.style.display = "block";
}

// もう一度引く関数
function retryGacha() {
    drawGacha();
}

// タイトルに戻る関数
function returnToTitle() {
    mainScreen.style.display = "none";
    titleScreen.style.display = "block";
    drawButton.style.display = "block";
    actionButtons.style.display = "none";
    imageContainer.innerHTML = ""; // 画像をクリア
}

// シェアする関数
function shareResult() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("ガチャを引いた結果をシェアしよう！");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, "_blank");
}

// イベントリスナーの設定
startButton.addEventListener("click", startApp);
drawButton.addEventListener("click", drawGacha);
retryButton.addEventListener("click", retryGacha);
returnButton.addEventListener("click", returnToTitle);
shareButton.addEventListener("click", shareResult);
