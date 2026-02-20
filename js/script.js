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

// 10連ガチャ用要素
const tenDrawButton = document.getElementById("tenDrawButton");
const tenDrawScreen = document.getElementById("tenDrawScreen");
const tenDrawResultScreen = document.getElementById("tenDrawResultScreen");
const tenDrawGrid = document.getElementById("tenDrawGrid");
const tenDrawProgress = document.getElementById("tenDrawProgress");
const tenDrawRetryButton = document.getElementById("tenDrawRetryButton");
const tenDrawReturnButton = document.getElementById("tenDrawReturnButton");
const returnToTenDrawResultButton = document.getElementById("returnToTenDrawResult");

let imageData = [];
let currentImageId = '';
let tenDrawResults = []; // 10連ガチャの結果を保存


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
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(150, 0, 255, 0.8)'); // 紫
                break;
            case 'SR':
                blueCard.classList.add('blueCardSR');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(255, 255, 0, 0.8)'); // 黄色
                break;
            case 'R':
            case 'N':
                blueCard.classList.add('blueCardN');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(50, 80, 255, 0.8)'); // 緑
                break;
            default:
                // デフォルトの色設定
                blueCard.classList.add('blueCardN');
                blueCard.style.setProperty('--blue-card-shadow', '0 0 20px rgba(0, 0, 255, 0.8)'); // 緑
                break;
        }

    // アニメーションをリセットして再適用
    setTimeout(() => {
    cardPack.style.animation = "showPack 3s forwards";
    blueCard.style.animation = "showBlueCard 4.5s forwards 1.5s";
    }, 500);

    // ランダムに選択された画像を結果画像にセット
    resultImage.src = selectedItem.fileName;
    titleText.textContent = `[${selectedItem.rarity}] ${selectedItem.title}`;
    captionText.textContent = `"${selectedItem.caption}"`;

    // 早めに結果画像を表示
    setTimeout(() => {
        resultImage.style.display = "block";
        resultImage.style.animation = "showResultImage 2s forwards 3s";
    }, 2000);

    // アニメーションが終わったら、カードパックと青色のカードを非表示
    setTimeout(() => {
        cardPack.style.display = "none";
        blueCard.style.display = "none";
        // showSparkleEffect()
        actionButtons.style.display = "block";
    }, 7000); // ここはアニメーションの終了時間に合わせて調整

    // すべてのボタンを再表示するタイミングを調整
    setTimeout(() => {
        
        if (selectedItem.rarity === 'BR' || selectedItem.rarity === 'UR') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else if (selectedItem.rarity === 'TR') {
            var end = Date.now() + (15 * 100);

            // go Buckeyes!
            var colors = ['#bb0000', '#ffffff'];
            
            (function frame() {
              confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
              });
              confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
              });
            
                // 演出の継続を制御
            if (Date.now() < end ) {
                setTimeout(() => {
                requestAnimationFrame(frame);
                }, 50); // アニメーションの呼び出し間隔を調整
            }
            }());
        } else if (selectedItem.rarity === 'SR') {
            var defaults = {
                spread: 360,
                ticks: 50,
                gravity: 0,
                decay: 0.94,
                startVelocity: 30,
                colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
              };
              
              function shoot() {
                confetti({
                  ...defaults,
                  particleCount: 40,
                  scalar: 1.2,
                  shapes: ['star'],
                  origin: {y: 0.4}
                });
              
                confetti({
                  ...defaults,
                  particleCount: 10,
                  scalar: 0.75,
                  shapes: ['circle'],
                  origin: {y: 0.4}
                });
              }
              
              setTimeout(shoot, 0);
        }
        

        actionButtons.classList.remove('fading-hidden');
        actionButtons.classList.add('fading-visible');
        titleText.classList.remove('fading-hidden'); // タイトルテキストを再表示
        titleText.classList.add('fading-visible');
        captionText.classList.remove('fading-hidden'); // キャプションテキストを再表示
        captionText.classList.add('fading-visible');
    }, 7300); // ここも全アニメーションの合計時間に合わせて調整
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

// 10連ガチャのイベントリスナー
tenDrawButton.addEventListener("click", startTenDraw);
tenDrawRetryButton.addEventListener("click", startTenDraw);
tenDrawReturnButton.addEventListener("click", returnToTitleFromTenDraw);
returnToTenDrawResultButton.addEventListener("click", returnToTenDrawResultScreen);

// 10連ガチャを開始する関数
function startTenDraw() {
    if (imageData.length === 0) return;

    // 画面切り替え
    titleScreen.style.display = "none";
    tenDrawResultScreen.style.display = "none";
    tenDrawScreen.style.display = "block";

    // 結果配列をリセット
    tenDrawResults = [];

    // 10枚のカードをランダムに選択
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * imageData.length);
        tenDrawResults.push(imageData[randomIndex]);
    }

    // グリッドを作成
    const animationGrid = document.getElementById('tenDrawAnimationGrid');
    animationGrid.innerHTML = '';

    // 10個のセルを作成
    for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.className = 'ten-draw-animation-cell';
        cell.id = `cell-${i}`;
        cell.innerHTML = `
            <div class="cell-card-pack"></div>
            <div class="cell-blue-card"></div>
            <img class="cell-result-image" src="${tenDrawResults[i].fileName}" alt="">
        `;
        animationGrid.appendChild(cell);
    }

    // 進捗表示を初期化
    tenDrawProgress.textContent = '';

    // 順番に演出を開始
    playTenDrawGridAnimation(0);
}

// 10連ガチャのグリッド演出
function playTenDrawGridAnimation(index) {
    if (index >= 10) {
        // 全ての演出が終わったら結果画面を表示
        setTimeout(() => {
            showTenDrawResults();
        }, 1000);
        return;
    }

    const cell = document.getElementById(`cell-${index}`);
    const cardPack = cell.querySelector('.cell-card-pack');
    const blueCard = cell.querySelector('.cell-blue-card');
    const resultImage = cell.querySelector('.cell-result-image');
    const selectedItem = tenDrawResults[index];

    // 進捗表示
    tenDrawProgress.textContent = `${index + 1} / 10`;

    // 青いカードの色を設定
    blueCard.classList.remove('blueCardTSUZU', 'blueCardBR', 'blueCardSR', 'blueCardN');
    switch (selectedItem.rarity) {
        case 'TR':
            blueCard.classList.add('blueCardTSUZU');
            blueCard.style.setProperty('--blue-card-shadow', '0 0 15px rgba(255, 0, 0, 0.8)');
            break;
        case 'BR':
        case 'UR':
            blueCard.classList.add('blueCardBR');
            blueCard.style.setProperty('--blue-card-shadow', '0 0 15px rgba(150, 0, 255, 0.8)');
            break;
        case 'SR':
            blueCard.classList.add('blueCardSR');
            blueCard.style.setProperty('--blue-card-shadow', '0 0 15px rgba(255, 255, 0, 0.8)');
            break;
        default:
            blueCard.classList.add('blueCardN');
            blueCard.style.setProperty('--blue-card-shadow', '0 0 15px rgba(50, 80, 255, 0.8)');
            break;
    }

    // アニメーション実行
    cardPack.style.animation = "cellShowPack 0.8s forwards";

    setTimeout(() => {
        blueCard.style.animation = "cellShowBlueCard 0.8s forwards";
    }, 400);

    setTimeout(() => {
        resultImage.style.animation = "cellShowResult 0.5s forwards";
        // レアリティに応じたエフェクト
        playRarityEffect(selectedItem.rarity);
    }, 800);

    // 次のカードへ（1.2秒後）
    setTimeout(() => {
        playTenDrawGridAnimation(index + 1);
    }, 1200);
}

// レアリティに応じたエフェクトを再生
function playRarityEffect(rarity) {
    if (rarity === 'BR' || rarity === 'UR') {
        confetti({
            particleCount: 30,
            spread: 40,
            origin: { y: 0.6 }
        });
    } else if (rarity === 'TR') {
        confetti({
            particleCount: 20,
            angle: 60,
            spread: 30,
            origin: { x: 0 },
            colors: ['#bb0000', '#ffffff']
        });
        confetti({
            particleCount: 20,
            angle: 120,
            spread: 30,
            origin: { x: 1 },
            colors: ['#bb0000', '#ffffff']
        });
    } else if (rarity === 'SR') {
        confetti({
            particleCount: 20,
            spread: 360,
            ticks: 30,
            gravity: 0,
            decay: 0.94,
            startVelocity: 15,
            colors: ['FFE400', 'FFBD00', 'E89400'],
            shapes: ['star'],
            origin: { y: 0.5 }
        });
    }
}

// 10連ガチャ結果画面を表示
function showTenDrawResults() {
    tenDrawScreen.style.display = "none";
    tenDrawResultScreen.style.display = "block";

    // グリッドをクリア
    tenDrawGrid.innerHTML = '';

    // 10枚のカードを表示
    tenDrawResults.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'ten-draw-card';
        card.innerHTML = `
            <img src="${item.fileName}" alt="${item.title}">
            <span class="rarity-badge rarity-${item.rarity}">${item.rarity}</span>
        `;

        // クリックで詳細画面に遷移
        card.addEventListener('click', () => {
            showCardDetail(item);
        });

        tenDrawGrid.appendChild(card);
    });
}

// カード詳細を表示（10連ガチャから）
function showCardDetail(item) {
    tenDrawResultScreen.style.display = "none";
    imageDisplay.style.display = "block";

    displayImage.src = item.fileName;
    displayTitle.textContent = `[${item.rarity}]:${item.title}`;
    displayCaption.textContent = `"${item.caption}"`;

    // 「10連結果に戻る」ボタンを表示
    returnToTenDrawResultButton.style.display = "inline-block";
}

// 10連結果画面に戻る
function returnToTenDrawResultScreen() {
    imageDisplay.style.display = "none";
    tenDrawResultScreen.style.display = "block";
    // ボタンを非表示に戻す
    returnToTenDrawResultButton.style.display = "none";
}

// タイトルに戻る（10連ガチャから）
function returnToTitleFromTenDraw() {
    tenDrawResultScreen.style.display = "none";
    tenDrawScreen.style.display = "none";
    titleScreen.style.display = "block";
    // 10連結果ボタンを非表示に戻す
    returnToTenDrawResultButton.style.display = "none";
}
