const game = () => {
  const $ = document.querySelector.bind(document);
  let pScore = 0;
  let bScore = 0;

  // Hàm bắt đầu
  const start = () => {
    const playBtn = $("#play");
    const intro = $(".isIntro");
    const match = $(".isMatch");
    const score = $(".isScore");

    playBtn.addEventListener("click", () => {
      intro.classList.add("t-top");
      score.classList.add("fadeIn");
      score.classList.remove("fadeOut");
      match.classList.add("fadeIn");
      match.classList.remove("fadeOut");
    });
  }

  // Hàm chơi game
  const playMatch = () => {
    const options = document.querySelectorAll(".options button"); // Lấy NodeList button
    const hands = document.querySelectorAll(".hands img"); // Lấy NodeList img
    const pHand = $(".player-hand");
    const bHand = $(".bot-hand");

    // Lặp qua từng ảnh
    hands.forEach(hand => {
      // Add event animationend cho mỗi img
      hand.addEventListener("animationend", function () {
        this.style.animation = ''; // Reset animation
      });
    });

    // Option cho Bot
    const bOptions = ["ROCK", "PAPER", "SCISSOR"];

    // Lặp qua từng nút
    options.forEach(option => {
      // Add event click cho từng nút
      option.addEventListener("click", function () {
        const numRand = Math.floor(Math.random() * 3); // random 1 số từ 1 -> 3
        const bChoice = bOptions[numRand]; // lấy numRand làm key cho arr bOption => lấy value

        setTimeout(() => {
          // Gọi hàm so sánh
          compare(this.textContent, bChoice);
          
          pHand.src = `./assets/img/${this.textContent}.jpg`;
          bHand.src = `./assets/img/${bChoice}.jpg`;
        }, 2000);
        
        // Thêm animation shakeHand cho đẹp
        pHand.style.animation = "shakePlayer 2s ease";
        bHand.style.animation = "shakeBot 2s ease";
      });
    });
  }

  // Hàm so sánh
  const compare = (pChoice, bChoice) => {
    const result = $("#result");

    // Truờng hợp hoà
    if (pChoice === bChoice) {
      result.textContent = 'DRAW 😱😱😱';
      return;
    }

    // Trường hợp búa
    if (pChoice === 'ROCK') {
      if (bChoice === 'SCISSOR') {
        result.textContent = 'YOU WIN 😂😂😂';
        pScore++;
        updateScore();
        return;
      } else {
        result.textContent = 'YOU LOSE 😡😡😡';
        bScore++;
        updateScore();
        return;
      }
    }

    // Trường hợp bao
    if (pChoice === 'PAPER') {
      if (bChoice === 'ROCK') {
        result.textContent = 'YOU WIN 😂😂😂';
        pScore++;
        updateScore();
        return;
      } else {
        result.textContent = 'YOU LOSE 😡😡😡';
        bScore++;
        updateScore();
        return;
      }
    }

    // Trường hợp bao
    if (pChoice === 'SCISSOR') {
      if (bChoice === 'PAPER') {
        result.textContent = 'YOU WIN 😂😂😂';
        pScore++;
        updateScore();
        return;
      } else {
        result.textContent = 'YOU LOSE 😡😡😡';
        bScore++;
        updateScore();
        return;
      }
    }
  }

  // Hàm cập nhật điểm
  const updateScore = () => {
    const playerScore = $(".user-score");
    const botScore = $(".bot-score");
    playerScore.textContent = pScore;
    botScore.textContent = bScore;
  }

  start();
  playMatch();
}

game();