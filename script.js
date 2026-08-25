document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* =====================================================
       画面切り替え
    ===================================================== */

    const screens =
      document.querySelectorAll(
        ".screen"
      );


    function showScreen(id) {

      screens.forEach(
        function (screen) {

          screen.classList.add(
            "hidden"
          );

        }
      );


      const target =
        document.getElementById(id);


      if (target) {

        target.classList.remove(
          "hidden"
        );

        window.scrollTo(
          0,
          0
        );

      }

    }



    /* =====================================================
       STEP 1
       広告クリック
    ===================================================== */

    const ad =
      document.getElementById(
        "security-ad"
      );


    ad.addEventListener(
      "click",
      function () {

        showScreen(
          "screen-loading"
        );

        startLoading();

      }
    );


    /*
       キーボードでも広告を押せる
    */

    ad.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          showScreen(
            "screen-loading"
          );

          startLoading();

        }

      }
    );



    /* =====================================================
       ローディング
    ===================================================== */

    function startLoading() {

      const bar =
        document.getElementById(
          "progress-bar"
        );


      const text =
        document.getElementById(
          "loading-text"
        );


      let progress = 0;


      const messages = [

        "環境を確認しています…",

        "ブラウザを確認しています…",

        "接続状態を確認しています…",

        "セキュリティ状態を確認しています…",

        "最終確認中…"

      ];


      const timer =
        setInterval(
          function () {

            progress += 4;


            bar.style.width =
              progress + "%";


            const index =
              Math.min(
                Math.floor(
                  progress / 20
                ),
                messages.length - 1
              );


            text.textContent =
              messages[index];


            if (
              progress >= 100
            ) {

              clearInterval(
                timer
              );


              setTimeout(
                function () {

                  showScreen(
                    "screen-scan"
                  );

                  startScan();

                },
                500
              );

            }

          },
          100
        );

    }



    /* =====================================================
       スキャン
    ===================================================== */

    function startScan() {

      const danger =
        document.getElementById(
          "scan-danger"
        );


      const message =
        document.getElementById(
          "danger-message"
        );


      const button =
        document.getElementById(
          "detail-button"
        );


      danger.textContent =
        "確認しています…";


      button.classList.add(
        "hidden"
      );


      message.classList.add(
        "hidden"
      );


      setTimeout(
        function () {

          danger.textContent =
            "要確認";


          danger.style.color =
            "#c93232";


          message.classList.remove(
            "hidden"
          );


          button.classList.remove(
            "hidden"
          );

        },
        1800
      );

    }



    /* =====================================================
       詳細ボタン
    ===================================================== */

    const detailButton =
      document.getElementById(
        "detail-button"
      );


    detailButton.addEventListener(
      "click",
      function () {

        showScreen(
          "screen-alert"
        );

        startCountdown();

      }
    );



    /* =====================================================
       カウントダウン
    ===================================================== */

    let countdownTimer;


    function startCountdown() {

      const counter =
        document.getElementById(
          "countdown"
        );


      const panel =
        document.querySelector(
          ".alert-panel"
        );


      let seconds = 30;


      counter.textContent =
        "00:30";


      panel.classList.remove(
        "urgent"
      );


      clearInterval(
        countdownTimer
      );


      countdownTimer =
        setInterval(
          function () {

            seconds--;


            const tens =
              Math.floor(
                seconds / 10
              );


            const ones =
              seconds % 10;


            counter.textContent =
              "00:" +
              tens +
              ones;


            if (
              seconds <= 10
            ) {

              panel.classList.add(
                "urgent"
              );

            }


            if (
              seconds <= 0
            ) {

              clearInterval(
                countdownTimer
              );


              counter.textContent =
                "00:00";

            }

          },
          1000
        );

    }



    /* =====================================================
       本人確認ボタン
    ===================================================== */

    const finalButton =
      document.getElementById(
        "final-warning-button"
      );


    finalButton.addEventListener(
      "click",
      function () {

        clearInterval(
          countdownTimer
        );


        showScreen(
          "screen-reveal"
        );

      }
    );



    /* =====================================================
       クイズ
    ===================================================== */

    const quizData = [

      {

        question:
          "広告で「今すぐ」「無料」「30秒」などを強く出していた理由として、最も注意すべきものは？",

        options: [

          "利用者を急がせて、その場で操作させようとするため",

          "ページを軽くするため",

          "文字を読みやすくするため",

          "検索結果を増やすため"

        ],

        correct: 0,

        explanation:
          "急がせる表現は、落ち着いて確認する時間を減らしてしまう可能性があります。",

        memory:
          "急かされても、いったん止まる。"

      },


      {

        question:
          "不安を感じるセキュリティ通知が届いたとき、適切な行動は？",

        options: [

          "通知内のリンクをすぐに開く",

          "メッセージにパスワードを返信する",

          "公式サイトや公式アプリから自分で確認する",

          "友達にパスワードを聞く"

        ],

        correct: 2,

        explanation:
          "通知内のリンクをそのまま使わず、自分で公式の方法から確認するのが安全です。",

        memory:
          "公式サイトや公式アプリから確認する。"

      },


      {

        question:
          "今回の模擬サイトで特に注意すべきだった組み合わせは？",

        options: [

          "無料＋限定＋急がせる表現",

          "白い背景＋青い文字",

          "見出し＋本文",

          "ニュース＋広告"

        ],

        correct: 0,

        explanation:
          "強いメリットと緊急性を組み合わせることで、すぐに操作したくなる状況を作っていました。",

        memory:
          "「無料」や「限定」だけで安全とは判断しない。"

      },


      {

        question:
          "大きなカウントダウンを表示した主な目的として最も適切なのは？",

        options: [

          "時計を正確に合わせるため",

          "焦りを感じさせ、すぐ操作させるため",

          "通信速度を測るため",

          "日付を表示するため"

        ],

        correct: 1,

        explanation:
          "時間制限を強く見せることで、冷静に確認する前に行動してしまう可能性があります。",

        memory:
          "「残り○秒」と言われても、焦らない。"

      },


      {

        question:
          "今回の体験で最も大切な考え方はどれ？",

        options: [

          "見た目が本物っぽければ信用する",

          "ボタンが大きければ信用する",

          "焦らず情報源を確認する",

          "無料なら必ず利用する"

        ],

        correct: 2,

        explanation:
          "見た目や緊急性に流されず、送信元や公式情報を確認することが重要です。",

        memory:
          "迷ったら、まず落ち着いて情報源を確認する。"

      }

    ];



    /* =====================================================
       クイズ変数
    ===================================================== */

    let questionIndex = 0;

    let score = 0;

    let answered = false;


    const questionNumber =
      document.getElementById(
        "question-number"
      );


    const questionScore =
      document.getElementById(
        "question-score"
      );


    const questionText =
      document.getElementById(
        "question-text"
      );


    const answers =
      document.getElementById(
        "answers"
      );


    const quizResult =
      document.getElementById(
        "quiz-result"
      );


    const nextQuestion =
      document.getElementById(
        "next-question"
      );



    /* =====================================================
       正解時の達成演出
    ===================================================== */

    function showReward(
      memoryText
    ) {

      const overlay =
        document.createElement(
          "div"
        );


      overlay.className =
        "reward-overlay";


      const popup =
        document.createElement(
          "div"
        );


      popup.className =
        "reward-popup correct-answer";


      popup.innerHTML =

        "<div class='reward-main'>" +

        "✓ 正解！" +

        "</div>" +


        "<div class='reward-point'>" +

        "+1 POINT" +

        "</div>" +


        "<div class='reward-message'>" +

        memoryText +

        "</div>";


      document.body.appendChild(
        overlay
      );


      document.body.appendChild(
        popup
      );


      setTimeout(
        function () {

          popup.remove();

          overlay.remove();

        },
        1400
      );

    }



    /* =====================================================
       クイズ開始
    ===================================================== */

    function startQuiz() {

      questionIndex = 0;

      score = 0;

      showQuestion();

    }



    /* =====================================================
       問題表示
    ===================================================== */

    function showQuestion() {

      answered = false;


      const data =
        quizData[
          questionIndex
        ];


      questionNumber.textContent =
        "第" +
        (questionIndex + 1) +
        "問 / " +
        quizData.length +
        "問";


      questionScore.textContent =
        "正解 " +
        score;


      questionText.textContent =
        data.question;


      answers.innerHTML =
        "";


      quizResult.classList.add(
        "hidden"
      );


      nextQuestion.classList.add(
        "hidden"
      );


      data.options.forEach(
        function (
          text,
          index
        ) {

          const button =
            document.createElement(
              "button"
            );


          button.className =
            "quiz-option";


          button.type =
            "button";


          button.textContent =
            String.fromCharCode(
              65 + index
            ) +
            "　" +
            text;


          button.addEventListener(
            "click",
            function () {

              answerQuestion(
                index,
                button
              );

            }
          );


          answers.appendChild(
            button
          );

        }
      );

    }



    /* =====================================================
       回答
    ===================================================== */

    function answerQuestion(
      selected,
      selectedButton
    ) {

      if (answered) {

        return;

      }


      answered = true;


      const data =
        quizData[
          questionIndex
        ];


      const buttons =
        document.querySelectorAll(
          ".quiz-option"
        );


      buttons.forEach(
        function (button) {

          button.disabled =
            true;

        }
      );


      if (
        selected === data.correct
      ) {

        selectedButton.classList.add(
          "correct"
        );


        score++;


        showReward(
          data.memory
        );


        quizResult.textContent =
          "正解です。 " +
          data.explanation;

      } else {

        selectedButton.classList.add(
          "wrong"
        );


        buttons[data.correct]
          .classList.add(
            "correct"
          );


        quizResult.textContent =
          "もう一度考えてみましょう。 " +
          data.explanation;

      }


      quizResult.classList.remove(
        "hidden"
      );


      questionScore.textContent =
        "正解 " +
        score;


      nextQuestion.classList.remove(
        "hidden"
      );

    }



    /* =====================================================
       次の問題
    ===================================================== */

    nextQuestion.addEventListener(
      "click",
      function () {

        questionIndex++;


        if (
          questionIndex >=
          quizData.length
        ) {

          showQuizClear();

        } else {

          showQuestion();

        }

      }
    );



    /* =====================================================
       全問クリア
    ===================================================== */

    function showQuizClear() {

      const finalScore =
        document.getElementById(
          "final-score"
        );


      finalScore.textContent =
        score;


      showScreen(
        "screen-clear"
      );

    }



    /* =====================================================
       解説 → クイズ
    ===================================================== */

    const toQuiz =
      document.getElementById(
        "to-quiz"
      );


    toQuiz.addEventListener(
      "click",
      function () {

        showScreen(
          "screen-quiz"
        );


        startQuiz();

      }
    );



    /* =====================================================
       クイズ → 最終チャレンジ
    ===================================================== */

    const toFinal =
      document.getElementById(
        "to-final"
      );


    toFinal.addEventListener(
      "click",
      function () {

        showScreen(
          "screen-final"
        );

      }
    );



    /* =====================================================
       最終シミュレーション
    ===================================================== */

    const finalOptions =
      document.querySelectorAll(
        ".final-option"
      );


    const finalResult =
      document.getElementById(
        "final-result"
      );


    finalOptions.forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const answer =
              button.dataset.answer;


            finalResult.classList.remove(
              "hidden"
            );


            if (
              answer === "good"
            ) {

              finalResult.innerHTML =

                "<strong>" +
                "良い判断です。" +
                "</strong>" +

                "<br><br>" +

                "メッセージ内のリンクを" +
                "そのまま使うのではなく、" +
                "自分で公式サイトや公式アプリを開いて" +
                "確認する方法があります。" +

                "<br><br>" +

                "<button " +
                "id='finish-button' " +
                "class='main-button' " +
                "type='button'>" +
                "エンディングへ" +
                "</button>";


              document
                .getElementById(
                  "finish-button"
                )
                .addEventListener(
                  "click",
                  function () {

                    showScreen(
                      "screen-end"
                    );

                  }
                );

            } else {

              finalResult.innerHTML =

                "<strong>" +
                "ここで一度止まりましょう。" +
                "</strong>" +

                "<br><br>" +

                "不安をあおるメッセージほど、" +
                "中のリンクをすぐ使わず、" +
                "公式サイトや公式アプリから" +
                "確認することが大切です。";

            }

          }
        );

      }
    );

  }
);