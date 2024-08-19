// 画像ファイル名の配列を作成
const images = [
    "images/tsuzu1.jpg",
    "images/tsuzu2.jpg",
    "images/tsuzu3.jpg",
    "images/tsuzu4.jpg",
    "images/tsuzu5.jpg",
    "images/tsuzu6.jpg",
];

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
const cardPack = document.getElementById("cardPack");
const blueCard = document.getElementById("blueCard");
const resultImage = document.getElementById("resultImage");

// タイトル画面からメイン画面に遷移する関数
function startApp() {
    titleScreen.style.display = "none";
    mainScreen.style.display = "block";
}

// ガチャを引く関数
function drawGacha() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];

    // ボタンを非表示にする
    drawButton.style.display = "none";
    retryButton.style.visibility = "hidden";
    shareButton.style.visibility = "hidden";
    returnButton.style.visibility = "hidden";

    // カードパックと青色のカード、結果画像の初期設定
    cardPack.style.display = "block";
    blueCard.style.display = "block";
    resultImage.style.display = "none"; // 最初は結果画像を非表示

    // アニメーションをリセットして再適用
    cardPack.style.animation = "showPack 3s forwards";
    blueCard.style.animation = "showBlueCard 3s forwards 1.5s";

    // ランダムに選択された画像を結果画像にセット
    resultImage.src = selectedImage;

    // 早めに結果画像を表示
    setTimeout(() => {
        resultImage.style.display = "block";
        resultImage.style.animation = "showResultImage 2s forwards 2s";
    }, 1500);

    // アニメーションが終わったら、カードパックと青色のカードを非表示
    setTimeout(() => {
        cardPack.style.display = "none";
        blueCard.style.display = "none";

        // アクションボタンを表示
        actionButtons.style.display = "block";
    }, 4500); // ここはアニメーションの終了時間に合わせて調整

    // すべてのボタンを再表示するタイミングを調整
    setTimeout(() => {
        retryButton.style.visibility = "visible";
        shareButton.style.visibility = "visible";
        returnButton.style.visibility = "visible";
    }, 6500); // ここも全アニメーションの合計時間に合わせて調整
}



// もう一度引く関数
function retryGacha() {
    drawGacha();
}

function returnToTitle() {
    mainScreen.style.display = "none";
    titleScreen.style.display = "block";
    
    // 要素の初期化
    drawButton.style.display = "block";
    actionButtons.style.display = "none";
    
    // 全てのスタイルをリセット
    resetStyles();
    
    // レイアウトの再計算
    drawButton.offsetHeight; // 強制的にレイアウトを再計算
}


function resetStyles() {
    // ガチャ画面の要素をリセット
    resultImage.style.display = "none";
    resultImage.style.opacity = 0;
    resultImage.style.transform = "translate(-50%, -50%) scale(0.8)";
    
    cardPack.style.display = "none";
    cardPack.style.opacity = 0;
    cardPack.style.transform = "translate(-50%, -50%) translateY(-50px)";
    
    blueCard.style.display = "none";
    blueCard.style.opacity = 0;
    blueCard.style.transform = "translate(-50%, -50%)";
    blueCard.style.boxShadow = "none";
    
    // drawButtonのスタイルをリセット
    drawButton.style.display = "block";
    drawButton.style.position = ""; // 位置のリセット
    drawButton.style.margin = "20px auto"; // 中央寄せ
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
