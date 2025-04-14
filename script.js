document.addEventListener("DOMContentLoaded", () => {
  // === INTRO DIALOGUE ===
  const lines = [
    '"My name is Aurelius... and I followed her song here."',
    '"They say this place—The Veil—holds what memory leaves behind."',
    '"I still hear her voice... but she doesn\'t remember me."',
    '"Am I chasing ghosts—or refusing to let go?"'
  ];

  const dialogueLine = document.getElementById("dialogueLine");
  const nextBtn = document.getElementById("nextBtn");
  const enterStandaloneBtn = document.getElementById("enterVeilStandalone");
  const dialogueWrapper = document.querySelector(".dialogue-frame-wrapper");
  const aureliusImage = document.querySelector(".aurelius-silhouette");

  let currentLine = 0;
  let charIndex = 0;
  let isTyping = false;

  function typeLine() {
    isTyping = true;
    dialogueLine.textContent = "";
    charIndex = 0;
    const text = lines[currentLine];

    function typeChar() {
      dialogueLine.textContent += text.charAt(charIndex);
      charIndex++;
      if (charIndex < text.length) {
        setTimeout(typeChar, 35);
      } else {
        isTyping = false;
        if (currentLine === lines.length - 1) {
          setTimeout(() => {
            dialogueWrapper.style.opacity = "0";
            setTimeout(() => {
              dialogueWrapper.classList.add("hidden");
              enterStandaloneBtn.classList.remove("hidden");
              enterStandaloneBtn.classList.add("visible");
            }, 1000);
          }, 4000);
        } else {
          nextBtn.classList.remove("hidden");
        }
      }
    }

    typeChar();
  }

  function handleNext() {
    if (isTyping) return;
    nextBtn.classList.add("hidden");
    currentLine++;
    if (currentLine < lines.length) {
      typeLine();
    }
  }

  function enterTheVeil() {
    document.getElementById("intro").style.display = "none";
    document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
  }

  nextBtn.addEventListener("click", handleNext);
  enterStandaloneBtn.addEventListener("click", enterTheVeil);

  // === Delay intro dialogue box until Aurelius appears ===
  dialogueWrapper.classList.add("hidden");
  aureliusImage.addEventListener("animationend", () => {
    dialogueWrapper.style.opacity = "0";
    dialogueWrapper.classList.remove("hidden");

    setTimeout(() => {
      dialogueWrapper.style.transition = "opacity 1.5s ease";
      dialogueWrapper.style.opacity = "1";

      setTimeout(() => {
        typeLine();
      }, 600);
    }, 400);
  });

  // === Quote Cycling for Memory 2 ===
  const fadingTexts = [
    '“Where did the light go?”',
    '“I still remember her voice… or do I?”',
    '“Some days are just fragments of light.”',
    '“She whispered, but the words faded away.”'
  ];

  let i = 0;
  const memory2Text = document.getElementById("memory2-text");

  setInterval(() => {
    memory2Text.style.opacity = 0;
    setTimeout(() => {
      memory2Text.textContent = fadingTexts[i];
      memory2Text.style.opacity = 1;
      i = (i + 1) % fadingTexts.length;
    }, 300);
  }, 4000);
});



// === Scroll fade for .memory-part ===
function handleExclusiveScrollFade() {
  const parts = document.querySelectorAll('.memory-part');
  let activated = false;

  parts.forEach(part => {
    const rect = part.getBoundingClientRect();
    const partVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;

    if (partVisible && !activated) {
      part.classList.add('visible');
      activated = true;
    } else {
      part.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', handleExclusiveScrollFade);
window.addEventListener('load', handleExclusiveScrollFade);


// === Floating music sheets parallax on scroll ===
const fadingSheet = document.getElementById('fading-sheet');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = document.querySelector('.hero').offsetHeight;

  const triggerPoint = heroHeight * 0.6;
  const endPoint = heroHeight + 300;

  if (scrollY < triggerPoint) {
    fadingSheet.style.opacity = 0;
    fadingSheet.style.transform = 'translateY(0px) scale(1)';
    return;
  }

  const progress = Math.min((scrollY - triggerPoint) / (endPoint - triggerPoint), 1);
  const scale = 1 + progress * 0.4;
  const float = Math.sin(scrollY / 90) * 10;
  const opacity = Math.min(progress * 1.2, 1);

  fadingSheet.style.opacity = opacity;
  fadingSheet.style.transform = `translateY(${float}px) scale(${scale})`;
});

// === Timeline Navigation ===
document.querySelectorAll('.timeline-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const index = dot.getAttribute('data-scroll');
    const target = document.querySelector(`#memory-${index}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); // CHỈ SỬA DÒNG NÀY
  });
});


// === Highlight Active Dot ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = entry.target.id.split('-')[1];
      document.querySelectorAll('.timeline-dot').forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-scroll') === index) dot.classList.add('active');
      });
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.memory-wrapper').forEach(section => observer.observe(section));

// === Particle Background ===
const animatedBg = document.getElementById('animated-bg');
for (let i = 0; i < 20; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${100 + Math.random() * 100}px`;
  particle.style.animationDuration = `${8 + Math.random() * 6}s`;
  particle.style.animationDelay = `${Math.random() * 4}s`;
  const size = `${6 + Math.random() * 12}px`;
  particle.style.width = size;
  particle.style.height = size;
  animatedBg.appendChild(particle);
}

// === Ambient Audio Autoplay ===
window.addEventListener('load', () => {
  const bgAudio = new Audio('audio/ambient-loop.mp3');
  bgAudio.loop = true;
  bgAudio.volume = 0.3;
  bgAudio.play().catch(() => {
    document.addEventListener('click', () => {
      bgAudio.play();
    }, { once: true });
  });
});

// === Veil Scene Parallax & Text Reveal ===
window.addEventListener("scroll", () => {
  const section = document.getElementById("veil-scene");
  const layers = section.querySelectorAll(".veil-layer");
  const textLines = document.querySelectorAll("#veil-text-block p");

  const sectionTop = section.offsetTop;
  const scrollY = window.scrollY;
  const relativeScroll = scrollY - sectionTop;
  const maxScroll = window.innerHeight * 2;

  if (relativeScroll >= 0 && relativeScroll <= maxScroll) {
    const progress = relativeScroll / maxScroll;
    layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth);
      const translateY = progress * depth * 100;
      const scale = 1 + progress * depth * 2.5;
      layer.style.transform = `translateY(${translateY}px) scale(${scale})`;
    });
  }

  textLines.forEach((line, i) => {
    const trigger = sectionTop + window.innerHeight * (2.4 + i * 0.3);
    if (scrollY + window.innerHeight > trigger) line.classList.add("visible");
    else line.classList.remove("visible");
  });
});

const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const envelopeContainer = document.getElementById("envelopeContainer");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const heartBtn = document.getElementById("heartBtn");
  const textarea = document.getElementById("elaraMessage");
  const sendBtn = document.getElementById("sendToElara");
  const sentText = document.getElementById("sentConfirmation");

  yesBtn.addEventListener("click", () => {
    envelopeContainer.classList.remove("hidden");
    document.querySelector(".question-block").style.display = "none";
  });

  noBtn.addEventListener("click", () => {
    document.querySelector(".question-block").style.display = "none";
  });

  heartBtn.addEventListener("click", () => {
    envelopeWrapper.classList.add("flap");
    textarea.focus();
  });

  textarea.addEventListener("input", () => {
    sendBtn.style.display = textarea.value.trim() ? "inline-block" : "none";
  });

  sendBtn.addEventListener("click", () => {

    envelopeWrapper.classList.remove("flap");
    sendBtn.style.display = "none";

    setTimeout(() => {
      envelopeContainer.style.opacity = "0";
    }, 1200);

    setTimeout(() => {
      envelopeContainer.classList.add("hidden");
      sentText.classList.remove("hidden");
      sentText.style.opacity = "1";
    }, 2500);

    setTimeout(() => {
      document.getElementById("ending-choice").scrollIntoView({ behavior: "smooth" });
    }, 4000);
  });


// === Hover Parallax for .move items ===
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.move').forEach(layer => {
    const speed = parseFloat(layer.getAttribute('data-speed'));
    const x = (e.clientX - window.innerWidth / 2) * speed / 150;
    const y = (e.clientY - window.innerHeight / 2) * speed / 150;
    layer.style.transform = `translate(${x}px, ${y}px)`;
  });
});


document.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const scene = document.querySelector('#memory-3-final');
  const text = document.querySelector('.veil-choice-text');
  const qr = document.querySelector('.qr-code-wrapper');
  const bg = document.querySelector('.veil-full-bg');

  if (!scene) return;

  const sceneTop = scene.offsetTop;
  const sceneHeight = scene.offsetHeight;
  const progress = (scrollY - sceneTop) / sceneHeight;

  if (progress > -0.1 && progress < 0.9) {
    bg.style.opacity = '1';
  } else {
    bg.style.opacity = '0';
  }

  if (progress > 0.1 && progress < 0.5) {
    text.style.opacity = '1';
  } else {
    text.style.opacity = '0';
  }

if (progress > 0.1 && progress < 0.35) {
  text.style.opacity = '1';
} else {
  text.style.opacity = '0';
}

if (progress >= 0.36 && progress < 0.65) {
  qr.style.opacity = '1';
} else {
  qr.style.opacity = '0';
}


  if (progress > 0.7) {
    bg.style.opacity = '0';
    qr.style.opacity = '0';
    text.style.opacity = '0';
  }
});


sendBtn.addEventListener("click", () => {
  envelopeWrapper.classList.remove("flap");
  sendBtn.style.display = "none";

  setTimeout(() => {
    envelopeContainer.style.opacity = "0";
  }, 1200);

  setTimeout(() => {
    envelopeContainer.classList.add("hidden");
    sentText.classList.remove("hidden");
    sentText.style.opacity = "1";
  }, 2500);

  setTimeout(() => {
    const ending = document.getElementById("ending-choice");
    ending.style.visibility = "visible";
    ending.style.opacity = "1";
    ending.style.height = "auto";
    ending.style.overflow = "visible";

    ending.scrollIntoView({ behavior: "smooth" });
  }, 4000);

  setTimeout(() => {
    document.querySelector(".nexus-bg").style.opacity = "1";
    document.querySelector(".nexus-figure").classList.remove("hidden");
    document.querySelector(".nexus-figure").style.opacity = "1";
  }, 5000);

  setTimeout(() => {
    const bubble = document.querySelector(".nexus-bubble");
    bubble.classList.remove("hidden");
    bubble.style.opacity = "1";
  }, 6500);

  setTimeout(() => {
    const choices = document.querySelector(".choice-buttons");
    choices.classList.remove("hidden");
    choices.classList.add("show");
  }, 8500);
});



// === Ending ===
document.querySelectorAll(".choice-btn").forEach(button => {
  button.addEventListener("click", () => {
    const choiceButtons = document.querySelectorAll(".choice-btn");

    if (button.classList.contains("disabled")) return;

    choiceButtons.forEach(btn => {
      btn.disabled = true;
      btn.classList.add("disabled");
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    });

    document.body.style.overflow = "hidden";

    const choice = button.getAttribute("data-ending");
    const result = document.getElementById("ending-result");

    let message = "", sceneId = "", audioId = "";

    if (choice === "return") {
      message = "I reached through the mist and called you back. Your voice trembled—but you answered.";
      sceneId = "ending-return";
      audioId = "audio-return";
    } else if (choice === "letgo") {
      message = "I closed my eyes and let the melody fade. I remember you—but I set you free.";
      sceneId = "ending-letgo";
      audioId = "audio-letgo";
    } else if (choice === "stay") {
      message = "I stepped into the Veil. There was no turning back. But in your arms, I found peace.";
      sceneId = "ending-stay";
      audioId = "audio-stay";
    }

    result.textContent = message;
    result.classList.add("visible");

    document.querySelector(".nexus-figure").style.opacity = "0";
    document.querySelector(".nexus-bubble").style.opacity = "0";
    document.querySelector(".choice-buttons").style.opacity = "0";

    setTimeout(() => {
      document.querySelector(".nexus-figure").classList.add("hidden");
      document.querySelector(".nexus-bubble").classList.add("hidden");
      document.querySelector(".choice-buttons").classList.add("hidden");
    }, 1500);

    const allAudios = [
      document.getElementById("audio-return"),
      document.getElementById("audio-letgo"),
      document.getElementById("audio-stay")
    ];
    allAudios.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    setTimeout(() => {
      // Hiện nền tối (overlay full screen)
      document.getElementById("ending-dark-overlay").classList.add("visible");
      const endingScene = document.getElementById(sceneId);
      const audio = document.getElementById(audioId);
      if (endingScene) {
        endingScene.classList.add("visible", "fade-in");
        endingScene.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (audio) {
        audio.volume = 0.6;
        audio.play();
      }
    }, 1800);

  });
});







window.addEventListener('pageshow', (event) => {
  const nexusFigure = document.querySelector(".nexus-figure");
  const nexusBubble = document.querySelector(".nexus-bubble");
  const choiceBtns = document.querySelector(".choice-buttons");
  const letterSection = document.getElementById("elara-letter-section");
  const endingSection = document.getElementById("ending-choice");

  if (nexusFigure) {
    nexusFigure.classList.add("hidden");
    nexusFigure.style.opacity = "0";
  }
  if (nexusBubble) {
    nexusBubble.classList.add("hidden");
    nexusBubble.style.opacity = "0";
  }
  if (choiceBtns) {
    choiceBtns.classList.add("hidden");
    choiceBtns.classList.remove("show");
    choiceBtns.style.opacity = "0";
  }

  let attempts = 0;
  const maxAttempts = 15;

  function tryScrollBackToLetter() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.body.scrollHeight;

    const endingTop = endingSection.getBoundingClientRect().top + scrollY;

    const nearBottom = (scrollY + windowH >= docH - 150);
    const nearEnding = (scrollY >= endingTop - 300);

    if (nearBottom || nearEnding) {
      letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (attempts < maxAttempts) {
      attempts++;
      requestAnimationFrame(tryScrollBackToLetter);
    }
  }

  setTimeout(() => {
    requestAnimationFrame(tryScrollBackToLetter);
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  // Chặn scroll ban đầu
  document.body.style.overflow = "hidden";

  // Khi nhấn "Enter the Veil" thì mới cho scroll
  const enterBtn = document.getElementById("enterVeilStandalone");
  enterBtn.addEventListener("click", () => {
    document.body.style.overflow = "auto";
  });
});

// === Always scroll to top (Intro) on reload ===
window.addEventListener('beforeunload', function () {
  // Đảm bảo lúc reload lại thì trình duyệt luôn ở vị trí top
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  // Force scroll to top instantly on load
  window.scrollTo(0, 0);

  const introSection = document.getElementById("intro");
  if (introSection) {
    introSection.scrollIntoView({ behavior: "auto" });
  }

  // Lock scroll until enter button is clicked
  document.body.style.overflow = "hidden";
  const enterBtn = document.getElementById("enterVeilStandalone");
  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      document.body.style.overflow = "auto";
    });
  }
});
// === Show timeline only after Hero ===
window.addEventListener('scroll', () => {
  const timeline = document.querySelector('.timeline-vertical');
  const heroSection = document.querySelector('.hero');

  if (!timeline || !heroSection) return;

  const heroBottom = heroSection.getBoundingClientRect().bottom;

  if (heroBottom <= window.innerHeight * 0.8) {
    timeline.style.opacity = '1';
    timeline.style.pointerEvents = 'auto';
  } else {
    timeline.style.opacity = '0';
    timeline.style.pointerEvents = 'none';
  }
});




