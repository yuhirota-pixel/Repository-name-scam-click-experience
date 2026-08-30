document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     画面切り替え
  ===================================================== */

  const screens = document.querySelectorAll(".screen");

  function showScreen(id) {

    screens.forEach(function (screen) {
      screen.classList.add("hidden");
    });

    const target = document.getElementById(id);

    if (target) {
      target.classList.remove("hidden");
      window.scrollTo(0, 0);
    } else {
      console.error("画面が見つかりません:", id);
    }
  }


  /* =====================================================
     STEP 1
     最初の求人広告
  ===================================================== */

  const jobAd = document.getElementById("job-ad");

  if (jobAd) {

    jobAd.addEventListener("click", function () {
      showScreen("screen-job");
    });

    jobAd.addEventListener("keydown", function (event) {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        showScreen("screen-job");

      }

    });

  }


  /* =====================================================
     STEP 2
     求人詳細
  ===================================================== */

  const jobApplyButton =
    document.getElementById("job-apply-button");


  if (jobApplyButton) {

    jobApplyButton.addEventListener(
      "click",
      function () {

        showScreen("screen-scan");

        startJobScan();

      }
    );

  }


  /* =====================================================
     STEP 3
     求人診断
  ===================================================== */

  function startJobScan() {

    const rewardStatus =
      document.getElementById("scan-reward");

    const result =
      document.getElementById("match-result");

    const button =
      document.getElementById("match-detail-button");


    if (!rewardStatus || !result || !button) {
      console.error("求人診断の要素が見つかりません");
      return;
    }


    rewardStatus.textContent =
      "確認しています…";

    rewardStatus.style.color =
      "#777";

    result.classList.add("hidden");

    button.classList.add("hidden");


    setTimeout(function () {

      rewardStatus.textContent =
        "一致";

      rewardStatus.style.color =
        "#c26a18";

      result.classList.remove(
        "hidden"
      );

      button.classList.remove(
        "hidden"
      );

    }, 1800);

  }


  /* =====================================================
     STEP 4
     特別募集画面
  ===================================================== */

  const matchDetailButton =
    document.getElementById(
      "match-detail-button"
    );


  if (matchDetailButton) {

    matchDetailButton.addEventListener(
      "click",
      function () {

        showScreen("screen-alert");

        startCountdown();

      }
    );

  }


  /* =====================================================
     カウントダウン
  ===================================================== */

  let countdownTimer = null;


  function startCountdown() {

    const counter =
      document.getElementById(
        "countdown"
      );

    const panel =
      document.querySelector(
        ".offer-panel"
      );


    if (!counter) {
      console.error("countdownが見つかりません");
      return;
    }


    let seconds = 30;


    counter.textContent =
      "00:30";


    if (panel) {
      panel.classList.remove("urgent");
    }


    clearInterval(
      countdownTimer
    );


    countdownTimer =
      setInterval(function () {

        seconds--;


        const tens =
          Math.floor(seconds / 10);


        const ones =
          seconds % 10;


        counter.textContent =
          "00" +
          ":" +
          tens +
          ones;


        if (
          seconds <= 10 &&
          panel
        ) {

          panel.classList.add(
            "urgent"
          );

        }


        if (seconds <= 0) {

          clearInterval(
            countdownTimer
          );

          counter.textContent =
            "00:00";

        }

      }, 1000);

  }


  /* =====================================================
     本人確認直前
  ===================================================== */

  const finalWarningButton =
    document.getElementById(
      "final-warning-button"
    );


  if (finalWarningButton) {

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

  }


  /* =====================================================
     クイズ
  ===================================================== */

  const quizData = [

    {
      question:
        "「日給10万円」という広告を見たとき、まず確認したいものは？",

      options: [
        "金額だけを見る",
        "求人元や仕事内容を確認する",
        "すぐ応募する",
        "友達にパスワードを聞く"
      ],

      correct: 1,

      explanation:
        "高額報酬だけで判断せず、求人元や仕事内容が信頼できるかを確認することが大切です。",

      memory:
        "高額報酬より、まず確認。"
    },


    {
      question:
        "「残り3名」「今すぐ」などの表示で注意することは？",

      options: [
        "急いで応募する",
        "焦らせるための表現かもしれない",
        "必ず本物だと判断する",
        "求人では使われない表現だと考える"
      ],

      correct: 1,

      explanation:
        "残り枠や時間を強く見せることで、冷静に考える前に行動させようとする場合があります。",

      memory:
        "「残りわずか」でも、いったん止まる。"
    },


    {
      question:
        "「未経験OK」「面接不要」と書いてあったら？",

      options: [
        "安全な求人だと判断する",
        "応募条件だけでなく求人元も確認する",
        "すぐ個人情報を送る",
        "高収入なので確認は不要"
      ],

      correct: 1,

      explanation:
        "応募のしやすさだけでは、求人の信頼性までは判断できません。",

      memory:
        "簡単そうに見えても、求人元を確認する。"
    },


    {
      question:
        "高収入求人をSNSで見つけたとき、適切な行動は？",

      options: [
        "投稿だけを信用する",
        "急いで応募する",
        "求人元や仕事内容を別の方法でも確認する",
        "先に個人情報を送る"
      ],

      correct: 2,

      explanation:
        "SNSの投稿だけで判断せず、別の方法から情報を確認することが重要です。",

      memory:
        "別の方法でも情報源を確認する。"
    },


    {
      question:
        "今回の体験で最も大切な考え方はどれ？",

      options: [
        "高収入なら安全",
        "急かされたらすぐ行動する",
        "見た目が本物なら信用する",
        "急かされても、まず確認する"
      ],

      correct: 3,

      explanation:
        "強い言葉や急かす表示があっても、まず止まって情報源を確認することが重要です。",

      memory:
        "迷ったら、まず止まって確認する。"
    }

  ];


  /* =====================================================
     クイズ用変数
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

  function showReward(memoryText) {

    const overlay =
      document.createElement("div");

    overlay.className =
      "reward-overlay";


    const popup =
      document.createElement("div");

    popup.className =
      "reward-popup";


    popup.innerHTML =
      "<div class='reward-main'>✓ 正解！</div>" +
      "<div class='reward-point'>+1 POINT</div>" +
      "<div class='reward-message'>" +
      memoryText +
      "</div>";


    document.body.appendChild(
      overlay
    );

    document.body.appendChild(
      popup
    );


    setTimeout(function () {

      popup.remove();

      overlay.remove();

    }, 1400);

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

        button.disabled = true;

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

        document
          .getElementById(
            "final-score"
          )
          .textContent =
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
     「どこで怪しいと思った？」
  ===================================================== */

  const feelingOptions =
    document.querySelectorAll(
      ".feeling-option"
    );


  const feelingResult =
    document.getElementById(
      "feeling-result"
    );


  feelingOptions.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          feelingOptions.forEach(
            function (item) {

              item.classList.remove(
                "selected"
              );

            }
          );


          button.classList.add(
            "selected"
          );


          feelingResult.textContent =
            "「" +
            button.dataset.feeling +
            "」で怪しいと感じた、と記録しました。";


          feelingResult.classList.remove(
            "hidden"
          );

        }
      );

    }
  );


  /* =====================================================
     クリア → 最終
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

});