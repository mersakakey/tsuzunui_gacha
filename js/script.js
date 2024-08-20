// HTML要素の取得
const titleText = document.getElementById('titleText');
const captionText = document.getElementById('captionText');
const startButton = document.getElementById("startButton");
const drawButton = document.getElementById("drawButton");
const retryButton = document.getElementById("retryButton");
const shareButton = document.getElementById("shareButton");
const returnButtonElement = document.getElementById("returnButton");
const imageviewreturnButton = document.getElementById("returnToTitle");
const imageContainer = document.getElementById("imageContainer");
const actionButtons = document.getElementById("actionButtons");
const titleScreen = document.getElementById("titleScreen");
const mainScreen = document.getElementById("mainScreen");
const cardPack = document.getElementById("cardPack");
const blueCard = document.getElementById("blueCard");
const resultImage = document.getElementById("resultImage");
const displayImage = document.getElementById('displayImage');
const displayTitle = document.getElementById('displayTitle');
const displayCaption = document.getElementById('displayCaption');
const imageDisplay = document.getElementById('imageDisplay');

let imageData = [];
let currentImageId = '';


// JSONファイルから画像データを読み込む関数
function loadImageData() {
    return fetch('data/images.json')
        .then(response => response.json())
        .then(data => {
            imageData = data.map(image => ({
                fileName: `images/${image.fileName}.jpg`,
                title: image.title,
                caption: image.caption,
                rarity: image.rarity
            }));
        });
}

// URLパラメータから「id」を取得する関数
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// ページが読み込まれたときの処理
document.addEventListener('DOMContentLoaded', () => {
    loadImageData().then(() => {
        const id = getQueryParam('id');

        if (id) {
            const imageIndex = imageData.findIndex(image => image.fileName.includes(id));
            
            if (imageIndex !== -1) {
                const image = imageData[imageIndex];
                
                // タイトル画面とメイン画面を非表示
                titleScreen.style.display = 'none';
                mainScreen.style.display = 'none';
                imageDisplay.style.display = 'block';

                // 画像とタイトル、キャプションを設定
                displayImage.src = image.fileName;
                displayTitle.textContent = `[${image.rarity}]:${image.title}`;
                displayCaption.textContent = `"${image.caption}"`;
            }
        }

        // タイトルに戻るボタンのイベントリスナー
        imageviewreturnButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // タイトルページへのリンク
        });
    });
});

// タイトル画面からメイン画面に遷移する関数
function startApp() {
    titleScreen.style.display = "none";
    mainScreen.style.display = "block";
}

// ガチャを引く関数
function drawGacha() {
    if (imageData.length === 0) return;

    const randomIndex = Math.floor(Math.random() * imageData.length);
    const selectedItem = imageData[randomIndex];    

    // 現在表示されている画像のIDを保存
    currentImageId = selectedItem.fileName.split('/').pop().split('.')[0]; // tsuzu1 などのIDを抽出


    // ボタンを非表示にする
    drawButton.style.display = "none";
    titleText.classList.remove('fading-visible');
    captionText.classList.remove('fading-visible');
    actionButtons.classList.remove('fading-visible');
    actionButtons.classList.add('fading-hidden');
    titleText.classList.add('fading-hidden'); // タイトルテキストを非表示
    captionText.classList.add('fading-hidden');

    // カードパックと青色のカード、結果画像の初期設定
    cardPack.style.display = "block";
    blueCard.style.display = "block";
    resultImage.style.display = "none"; // 最初は結果画像を非表示
    actionButtons.style.display = "none"; // アクションボタンを非表示

        // 青いカードの色を設定するクラスをリセット
        blueCard.className = 'blueCard'; // 基本クラスのリセット

        // rarityに応じて青いカードの色を変更
        switch (selectedItem.rarity) {
            case 'TR':
                blueCard.classList.add('blueCardTSUZU');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(255, 0, 0, 0.8)'); // 赤
                break;
            case 'BR':
            case 'UR':
                blueCard.classList.add('blueCardBR');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(190, 12, 255, 0.8);'); // 紫
                break;
            case 'SR':
                blueCard.classList.add('blueCardSR');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(251, 255, 0, 0.8)'); // 黄色
                break;
            case 'R':
                blueCard.classList.add('blueCardR');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(0, 0, 255, 0.8)'); // 緑
                break;
            case 'N':
                blueCard.classList.add('blueCardN');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(0, 0, 255, 0.8)'); // 緑
                break;
            default:
                // デフォルトの色設定
                blueCard.classList.add('blueCardN');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(0, 0, 255, 0.8)'); // 緑
                break;
        }

    // アニメーションをリセットして再適用
    cardPack.style.animation = "showPack 3s forwards";
    blueCard.style.animation = "showBlueCard 4.5s forwards 1.5s";

    // ランダムに選択された画像を結果画像にセット
    resultImage.src = selectedItem.fileName;
    titleText.textContent = `[${selectedItem.rarity}] ${selectedItem.title}`;
    captionText.textContent = `"${selectedItem.caption}"`;

    // 早めに結果画像を表示
    setTimeout(() => {
        resultImage.style.display = "block";
        resultImage.style.animation = "showResultImage 2s forwards 3s";
    }, 1500);

    // アニメーションが終わったら、カードパックと青色のカードを非表示
    setTimeout(() => {
        cardPack.style.display = "none";
        blueCard.style.display = "none";
        // showSparkleEffect()
        actionButtons.style.display = "block";
    }, 6500); // ここはアニメーションの終了時間に合わせて調整

    // すべてのボタンを再表示するタイミングを調整
    setTimeout(() => {
        actionButtons.classList.remove('fading-hidden');
        actionButtons.classList.add('fading-visible');
        titleText.classList.remove('fading-hidden'); // タイトルテキストを再表示
        titleText.classList.add('fading-visible');
        captionText.classList.remove('fading-hidden'); // キャプションテキストを再表示
        captionText.classList.add('fading-visible');
    }, 7000); // ここも全アニメーションの合計時間に合わせて調整
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

    titleText.textContent = "まいにちつづぬいガチャ";
    captionText.textContent = ``;
    
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
    const url = `${encodeURIComponent(window.location.href)}?id=${currentImageId}`;
    const text = encodeURIComponent(`${titleText.textContent}がでたよ。\n#まいにちつづぬいガチャ\n`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, "_blank");
}

// キラキラエフェクトを表示する関数
function showSparkleEffect() {
    const sparkleEffect = document.getElementById('sparkleEffect');
    
    // Anime.jsでアニメーションを設定
    anime({
        targets: sparkleEffect,
        scale: [0, 1.5],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutSine',
        complete: function() {
            // アニメーションが終わった後にエフェクトを非表示にする
            setTimeout(() => {
                anime({
                    targets: sparkleEffect,
                    scale: [1.5, 0],
                    opacity: [1, 0],
                    duration: 1000,
                    easing: 'easeInSine'
                });
            }, 500);
        }
    });
}

// イベントリスナーの設定
startButton.addEventListener("click", startApp);
drawButton.addEventListener("click", drawGacha);
retryButton.addEventListener("click", retryGacha);
returnButtonElement.addEventListener("click", returnToTitle);
shareButton.addEventListener("click", shareResult);
