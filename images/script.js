document.addEventListener("DOMContentLoaded", () => {
  const lines = [
    document.getElementById("line1"),
    document.getElementById("line2"),
    document.getElementById("line3"),
    document.getElementById("line4")
  ];
  const enterBtn = document.getElementById("enterBtn");

  lines[0].classList.add("visible");
  lines[0].classList.remove("hidden");

  let index = 1;
  const interval = setInterval(() => {
    if (index < lines.length) {
      lines[index].classList.remove("hidden");
      lines[index].classList.add("visible");
      index++;
    } else {
      clearInterval(interval);
      enterBtn.classList.remove("hidden");
    }
  }, 3500); // 3.5s delay between lines

  enterBtn.addEventListener("click", () => {
    document.getElementById("intro").style.display = "none";
    document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
  });
});
// === Quote Cycling for Memory 2 ===
document.addEventListener("DOMContentLoaded", () => {
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
function handleScrollFade() {
  const parts = document.querySelectorAll('.memory-part');
  parts.forEach(part => {
    const rect = part.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      part.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleScrollFade);
window.addEventListener('load', handleScrollFade);

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
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  // Bước 1: Hiện background khi gần tới scene
  if (progress > -0.1 && progress < 0.9) {
    bg.style.opacity = '1';
  } else {
    bg.style.opacity = '0';
  }

  // Bước 2: Hiện dòng chữ ở khoảng 10–30%
  if (progress > 0.1 && progress < 0.5) {
    text.style.opacity = '1';
  } else {
    text.style.opacity = '0';
  }

  // Bước 3: QR hiện ở khoảng 40–60%
  // TEXT: hiện từ 10% đến 35%
if (progress > 0.1 && progress < 0.35) {
  text.style.opacity = '1';
} else {
  text.style.opacity = '0';
}

// QR: chỉ hiện **sau khi** text hoàn toàn mờ
if (progress >= 0.36 && progress < 0.65) {
  qr.style.opacity = '1';
} else {
  qr.style.opacity = '0';
}


  // Bước 4: Khi scroll quá 70% thì mờ cả QR và nền
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

  // ✅ CHỈ scroll đến ending-choice khi gửi xong
  setTimeout(() => {
    document.getElementById("ending-choice").scrollIntoView({ behavior: "smooth" });
  }, 4000);

  // ✅ Hiển thị Nexus scene sau scroll
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

    // Ngăn việc chọn lại nếu đã chọn trước đó
    if (button.classList.contains("disabled")) return;

    // Disable tất cả các nút sau khi 1 nút được chọn
    choiceButtons.forEach(btn => {
      btn.disabled = true;
      btn.classList.add("disabled");
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    });

    // ✅ Ngăn scroll toàn trang
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

  // 1. Ẩn nexus-related nếu có
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

  // 2. Nếu reload ở quá gần phần ending → tự scroll về phần thư
  let attempts = 0;
  const maxAttempts = 15;

  function tryScrollBackToLetter() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.body.scrollHeight;

    const endingTop = endingSection.getBoundingClientRect().top + scrollY;

    // Nếu đang ở gần phần ending (cách dưới cùng < 150px hoặc gần ending-section)
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
