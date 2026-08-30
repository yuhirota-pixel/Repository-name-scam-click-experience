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
       求人広告クリック
    ===================================================== */

    const jobAd =
      document.getElementById(
        "job-ad"
      );


    jobAd.addEventListener(
      "click",
      function () {

        showScreen(
          "screen-loading"
        );

        startLoading();

      }
    );


    jobAd.addEventListener(
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

        "条件を確認しています…",

        "勤務条件を確認しています…",

        "報酬条件を確認しています…",

        "一致する求人を探しています…",

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

                  startJobScan();

                },
                500
              );

            }

          },
          100
        );

    }



    /* =====================================================
       求人スキャン
    ===================================================== */

    function startJobScan() {

      const status =
        document.getElementById(
          "job-danger"
        );


      const message =
        document.getElementById(
          "job-message"
        );


      const button =
        document.getElementById(
          "job-detail-button"
        );


      status.textContent =
        "確認しています…";


      button.classList.add(
        "hidden"
      );


      message.classList.add(
        "hidden"
      );


      setTimeout(
        function () {

          status.textContent =
            "一致";


          status.style.color =
            "#b66a16";


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
       詳細を見る
    ===================================================== */

    const jobDetailButton =
      document.getElementById(
        "job-detail-button"
      );


    jobDetailButton.addEventListener(
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
          ".offer-panel"
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
       本人確認直前
    ===================================================== */

    const finalWarningButton =
      document.getElementById(
        "final-warning-button"
      );


    finalWarningButton.addEventListener(
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
          "「日給10万円」という表示を見るとき、まず何を確認するべき？",

        options: [

          "報酬だけでなく、求人元や仕事内容も確認する",

          "金額が大きいので安全だと判断する",

          "すぐ応募する",

          "友達にパスワードを聞く"

        ],

        correct: 0,

        explanation:
          "高額な報酬だけで判断せず、求人元や仕事内容などを確認することが重要です。",

        memory:
          "高額報酬より、まず確認。"

      },


      {

        question:
          "「残り3名」「今すぐ」などの表示で注意すべきことは？",

        options: [

          "急いで応募する",

          "焦らせるために使われる可能性がある",

          "必ず本物の求人だと考える",

          "広告では絶対に使われない"

        ],

        correct: 1,

        explanation:
          "人数や時間を強調することで、落ち着いて確認する前に行動させようとする場合があります。",

        memory:
          "「残りわずか」でも、いったん止まる。"

      },


      {

        question:
          "「未経験OK」「面接なし」などを強く見せる理由として注意すべきことは？",

        options: [

          "応募のハードルを低く感じさせる可能性がある",

          "必ず安全な会社だと分かる",

          "法律で安全性が保証される",

          "報酬額が自動的に確認される"

        ],

        correct: 0,

        explanation:
          "応募しやすそうに感じさせる表示だけでは、求人の信頼性までは確認できません。",

        memory:
          "簡単そうに見えても、求人元を確認する。"

      },


      {

        question:
          "SNSで高収入求人を見つけたとき、特に大切なのは？",

        options: [

          "投稿の金額だけを見る",

          "急いで応募する",

          "求人元や仕事内容を別の方法でも確認する",

          "個人情報を先に送る"

        ],

        correct: 2,

        explanation:
          "投稿だけを信用せず、求人元や仕事内容を別の方法でも確認することが大切です。",

        memory:
          "別の方法でも情報源を確認する。"

      },


      {

        question:
          "今回の体験で一番大切な考え方はどれ？",

        options: [

          "高収入なら安全",

          "急かされたらすぐ行動する",

          "見た目が本物なら信用する",

          "急かされても、まず確認する"

        ],

        correct: 3,

        explanation:
          "高額報酬や緊急性に流されず、まず情報源を確認することが重要です。",

        memory:
          "迷ったら、まず止まって確認する。"

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
       正解演出
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
          option,
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
            option;


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

          const finalScore =
            document.getElementById(
              "final-score"
            );


          finalScore.textContent =
            score;


          showScreen(
            "screen-clear"
          );

        } else {

          showQuestion();

        }

      }
    );



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
       クイズ → 最終
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

                "高収入という条件だけで判断せず、" +
                "求人元や仕事内容を別の方法でも確認することが大切です。" +

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

                "高額報酬や「今すぐ」などで急かされても、" +
                "まず求人元や仕事内容を確認しましょう。";

            }

          }
        );

      }
    );

  }
);
