// Application State
let currentChapterIdx = 0;
let userAnswers = {}; // { qId: selectedOptionIdx }
let score = 0;

// Initialize on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  loadProgress();
  setupNavigation();
  setupTabs();
  renderCurrentChapter();
  setupInteractiveTools();
  setupScratchpad();
});

// Load stored progress from localStorage
function loadProgress() {
  const savedScore = localStorage.getItem("math_score");
  const savedAnswers = localStorage.getItem("math_answers");
  if (savedScore !== null) score = parseInt(savedScore, 10);
  if (savedAnswers) userAnswers = JSON.parse(savedAnswers);
  updateStatsDisplay();
}

function saveProgress() {
  localStorage.setItem("math_score", score);
  localStorage.setItem("math_answers", JSON.stringify(userAnswers));
  updateStatsDisplay();
}

function updateStatsDisplay() {
  document.getElementById("global-score").textContent = score;
  const solvedCount = Object.keys(userAnswers).length;
  document.getElementById("solved-count").textContent = solvedCount;

  let totalQuestions = 0;
  if (typeof chaptersData !== 'undefined') {
    chaptersData.forEach(ch => {
      if (ch.quizzes) totalQuestions += ch.quizzes.length;
    });
  }
  const totalEl = document.getElementById("total-questions-count");
  if (totalEl) totalEl.textContent = totalQuestions || 34;
}

// Reset progress handler
document.getElementById("reset-progress-btn").addEventListener("click", () => {
  if (confirm("Do you want to reset your score and quiz answers?")) {
    score = 0;
    userAnswers = {};
    saveProgress();
    renderCurrentChapter();
  }
});

// Setup Sidebar and Nav Buttons
function setupNavigation() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const menuToggle = document.getElementById("mobile-menu-toggle");

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove("mobile-open");
    if (overlay) overlay.classList.remove("active");
  }

  function openMobileSidebar() {
    if (sidebar) sidebar.classList.add("mobile-open");
    if (overlay) overlay.classList.add("active");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (sidebar.classList.contains("mobile-open")) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMobileSidebar);
  }

  const navButtons = document.querySelectorAll("#chapter-list .nav-item");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll("#tools-list .nav-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      currentChapterIdx = parseInt(btn.dataset.chapter, 10);
      showChapterView();
      renderCurrentChapter();
      closeMobileSidebar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const toolButtons = document.querySelectorAll("#tools-list .nav-item");
  toolButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      toolButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const toolId = btn.dataset.tool;
      showToolView(toolId);
      closeMobileSidebar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.getElementById("back-to-chapter-btn").addEventListener("click", () => {
    showChapterView();
    navButtons[currentChapterIdx].classList.add("active");
    document.querySelectorAll("#tools-list .nav-item").forEach(b => b.classList.remove("active"));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Handle window resizing
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileSidebar();
    }
    resizeCanvas();
  });
}

// Switch between Learn and Practice tabs
function setupTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      
      tab.classList.add("active");
      const targetTab = tab.dataset.tab;
      document.getElementById(`tab-${targetTab}`).classList.add("active");
    });
  });
}

function showChapterView() {
  document.getElementById("chapter-view").classList.remove("hidden");
  document.getElementById("tool-view").classList.add("hidden");
}

function showToolView(toolId) {
  document.getElementById("chapter-view").classList.add("hidden");
  document.getElementById("tool-view").classList.remove("hidden");
  renderTool(toolId);
}

// Render Chapter Content & Quiz
function renderCurrentChapter() {
  const ch = chaptersData[currentChapterIdx];
  document.getElementById("ch-badge").textContent = ch.number;
  document.getElementById("ch-heading").textContent = ch.title;

  // Render Learn Section
  const bodyEl = document.getElementById("chapter-body");
  let html = `<div class="card" style="background:#f8fafc; margin-bottom:8px;">
    <strong>Summary:</strong> ${ch.summary}
  </div>`;

  ch.concepts.forEach(c => {
    html += `
      <div class="card">
        <div class="card-title">${c.heading}</div>
        <div>${c.text}</div>
        ${c.rule ? `<div class="rule-box">${c.rule}</div>` : ""}
        ${c.math ? `<div class="math-display">${c.math}</div>` : ""}
        ${c.example ? `
          <div class="example-box">
            <div class="example-header">💡 ${c.example.title}</div>
            <ol class="solution-steps">
              ${c.example.steps.map(s => `<li>${s}</li>`).join("")}
            </ol>
          </div>
        ` : ""}
      </div>
    `;
  });
  bodyEl.innerHTML = html;

  // Render Practice Section
  const quizEl = document.getElementById("quiz-container");
  let quizHtml = `<div class="card" style="margin-bottom:8px; background:#eff6ff; border-color:#93c5fd;">
    <strong>💡 Quick Tip:</strong> Select an option, then click "Check Answer" to test your knowledge! Earn 10 points per question.
  </div>`;

  ch.quizzes.forEach((q, idx) => {
    const isAnswered = userAnswers[q.id] !== undefined;
    const selectedIdx = isAnswered ? userAnswers[q.id] : null;
    const isCorrect = isAnswered && selectedIdx === q.correct;

    quizHtml += `
      <div class="quiz-item" id="quiz-card-${q.id}">
        <div class="quiz-question">Q${idx + 1}. ${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, oIdx) => {
            let cls = "option-btn";
            if (isAnswered) {
              if (oIdx === q.correct) cls += " correct";
              else if (oIdx === selectedIdx) cls += " wrong";
            } else if (selectedIdx === oIdx) {
              cls += " selected";
            }
            return `<button class="${cls}" onclick="selectQuizOption('${q.id}', ${oIdx})" ${isAnswered ? 'disabled' : ''}>${String.fromCharCode(65 + oIdx)}) ${opt}</button>`;
          }).join("")}
        </div>
        <div class="quiz-footer">
          <div>
            ${!isAnswered ? `<button class="btn btn-sm" onclick="checkQuizAnswer('${q.id}', ${currentChapterIdx}, ${idx})">Check Answer</button>` : ''}
            <span class="feedback-msg ${isAnswered ? (isCorrect ? 'show-correct' : 'show-wrong') : ''}" id="feedback-${q.id}">
              ${isAnswered ? (isCorrect ? '🎉 Correct! (+10 pts)' : '❌ Incorrect!') : ''}
            </span>
          </div>
          ${isAnswered ? `<span style="font-size:11.5px; color:#475569;">Explanation: ${q.explanation}</span>` : ''}
        </div>
      </div>
    `;
  });
  quizEl.innerHTML = quizHtml;

  // Trigger KaTeX rendering
  triggerMathRender();
}

// Global quiz selection handler
let pendingSelection = {};
window.selectQuizOption = function(qId, optIdx) {
  pendingSelection[qId] = optIdx;
  const card = document.getElementById(`quiz-card-${qId}`);
  if (card) {
    const btns = card.querySelectorAll(".option-btn");
    btns.forEach((b, i) => {
      b.classList.toggle("selected", i === optIdx);
    });
  }
};

window.checkQuizAnswer = function(qId, chIdx, qIdx) {
  const chosen = pendingSelection[qId];
  if (chosen === undefined) {
    alert("Please select an option first!");
    return;
  }
  const q = chaptersData[chIdx].quizzes[qIdx];
  userAnswers[qId] = chosen;
  if (chosen === q.correct) {
    score += 10;
  }
  saveProgress();
  renderCurrentChapter();
};

function triggerMathRender() {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "\\[", right: "\\]", display: true},
        {left: "\\(", right: "\\)", display: false},
        {left: "$", right: "$", display: false}
      ],
      throwOnError: false
    });
  }
}

// ----------------------------------------------------
// Interactive Math Tools
// ----------------------------------------------------
function setupInteractiveTools() {
  // Attached globally
}

function renderTool(toolId) {
  const container = document.getElementById("tool-body");
  const heading = document.getElementById("tool-heading");

  if (toolId === "hcf-lcm") {
    heading.textContent = "🧮 HCF & LCM Calculator";
    container.innerHTML = `
      <div class="card">
        <div class="tool-grid">
          <div class="input-group">
            <label>Enter First Number (a):</label>
            <input type="number" id="num1" class="input-control" value="24" min="1">
          </div>
          <div class="input-group">
            <label>Enter Second Number (b):</label>
            <input type="number" id="num2" class="input-control" value="36" min="1">
          </div>
        </div>
        <button class="btn" style="margin-top:6px;" onclick="calculateHcfLcm()">Calculate HCF & LCM</button>
        <div id="hcf-lcm-result" class="result-card" style="margin-top:8px;"></div>
      </div>
    `;
    calculateHcfLcm();
  } 
  else if (toolId === "algebra-solver") {
    heading.textContent = "⚡ Linear Equation Solver (ax + b = c)";
    container.innerHTML = `
      <div class="card">
        <p style="font-size:12px; margin-bottom:6px; color:#475569;">Solve linear equations in the form: <strong>ax + b = c</strong></p>
        <div class="tool-grid" style="grid-template-columns: 1fr 1fr 1fr;">
          <div class="input-group">
            <label>Coefficient a:</label>
            <input type="number" id="eq-a" class="input-control" value="3">
          </div>
          <div class="input-group">
            <label>Constant b:</label>
            <input type="number" id="eq-b" class="input-control" value="5">
          </div>
          <div class="input-group">
            <label>Result c:</label>
            <input type="number" id="eq-c" class="input-control" value="20">
          </div>
        </div>
        <button class="btn" style="margin-top:6px;" onclick="solveAlgebra()">Solve Equation</button>
        <div id="algebra-result" class="result-card" style="margin-top:8px;"></div>
      </div>
    `;
    solveAlgebra();
  }
  else if (toolId === "geo-calc") {
    heading.textContent = "📐 Geometry Area & Perimeter Tool";
    container.innerHTML = `
      <div class="card">
        <div class="input-group">
          <label>Select Shape:</label>
          <select id="geo-shape" class="input-control" onchange="toggleGeoInputs()">
            <option value="rectangle">Rectangle (Length & Width)</option>
            <option value="square">Square (Side)</option>
            <option value="triangle">Triangle (Base & Height)</option>
          </select>
        </div>
        <div id="geo-inputs" class="tool-grid" style="margin-top:6px;">
          <div class="input-group">
            <label id="lbl-dim1">Length (l):</label>
            <input type="number" id="geo-dim1" class="input-control" value="8" min="0.1" step="0.1">
          </div>
          <div class="input-group" id="group-dim2">
            <label id="lbl-dim2">Width (w):</label>
            <input type="number" id="geo-dim2" class="input-control" value="5" min="0.1" step="0.1">
          </div>
        </div>
        <button class="btn" style="margin-top:6px;" onclick="calculateGeometry()">Calculate</button>
        <div id="geo-result" class="result-card" style="margin-top:8px;"></div>
      </div>
    `;
    calculateGeometry();
  }
  else if (toolId === "stats-calc") {
    heading.textContent = "📊 Statistics Calculator (Mean, Median, Mode)";
    container.innerHTML = `
      <div class="card">
        <div class="input-group">
          <label>Enter numbers separated by commas:</label>
          <input type="text" id="stats-input" class="input-control" value="4, 8, 6, 8, 12, 10">
        </div>
        <button class="btn" style="margin-top:6px;" onclick="calculateStats()">Analyze Numbers</button>
        <div id="stats-result" class="result-card" style="margin-top:8px;"></div>
      </div>
    `;
    calculateStats();
  }
}

// Tool 1: HCF & LCM Logic
window.calculateHcfLcm = function() {
  const n1 = parseInt(document.getElementById("num1").value, 10) || 1;
  const n2 = parseInt(document.getElementById("num2").value, 10) || 1;

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
  const hcf = gcd(n1, n2);
  const lcm = (n1 * n2) / hcf;

  document.getElementById("hcf-lcm-result").innerHTML = `
    <div><strong>HCF (${n1}, ${n2})</strong> = <span style="color:#15803d; font-weight:700;">${hcf}</span></div>
    <div><strong>LCM (${n1}, ${n2})</strong> = <span style="color:#1d4ed8; font-weight:700;">${lcm}</span></div>
    <div style="font-size:11.5px; color:#64748b; margin-top:4px;">
      Verification: Product of numbers (${n1} × ${n2} = ${n1 * n2}) equals HCF × LCM (${hcf} × ${lcm} = ${hcf * lcm}).
    </div>
  `;
};

// Tool 2: Algebra Logic
window.solveAlgebra = function() {
  const a = parseFloat(document.getElementById("eq-a").value);
  const b = parseFloat(document.getElementById("eq-b").value);
  const c = parseFloat(document.getElementById("eq-c").value);

  if (a === 0) {
    document.getElementById("algebra-result").innerHTML = `<span style="color:#b91c1c;">Coefficient 'a' cannot be 0 in a linear equation!</span>`;
    return;
  }

  const step1 = c - b;
  const x = step1 / a;

  document.getElementById("algebra-result").innerHTML = `
    <div><strong>Equation:</strong> ${a}x + (${b}) = ${c}</div>
    <div style="margin-top:4px;"><strong>Step 1:</strong> Subtract ${b} from both sides &rarr; ${a}x = ${c} - (${b}) = ${step1}</div>
    <div><strong>Step 2:</strong> Divide both sides by ${a} &rarr; x = ${step1} / ${a} = <strong style="color:#15803d;">${Number.isInteger(x) ? x : x.toFixed(2)}</strong></div>
  `;
};

// Tool 3: Geometry Logic
window.toggleGeoInputs = function() {
  const shape = document.getElementById("geo-shape").value;
  const group2 = document.getElementById("group-dim2");
  const lbl1 = document.getElementById("lbl-dim1");
  const lbl2 = document.getElementById("lbl-dim2");

  if (shape === "square") {
    lbl1.textContent = "Side (s):";
    group2.style.display = "none";
  } else if (shape === "rectangle") {
    lbl1.textContent = "Length (l):";
    lbl2.textContent = "Width (w):";
    group2.style.display = "block";
  } else if (shape === "triangle") {
    lbl1.textContent = "Base (b):";
    lbl2.textContent = "Height (h):";
    group2.style.display = "block";
  }
};

window.calculateGeometry = function() {
  const shape = document.getElementById("geo-shape").value;
  const d1 = parseFloat(document.getElementById("geo-dim1").value) || 0;
  const d2 = parseFloat(document.getElementById("geo-dim2").value) || 0;
  let html = "";

  if (shape === "square") {
    const area = d1 * d1;
    const perimeter = 4 * d1;
    html = `
      <div><strong>Square Properties:</strong></div>
      <div>• Perimeter = 4 × ${d1} = <strong>${perimeter.toFixed(2)} units</strong></div>
      <div>• Area = ${d1}² = <strong style="color:#15803d;">${area.toFixed(2)} sq units</strong></div>
    `;
  } else if (shape === "rectangle") {
    const area = d1 * d2;
    const perimeter = 2 * (d1 + d2);
    html = `
      <div><strong>Rectangle Properties:</strong></div>
      <div>• Perimeter = 2 × (${d1} + ${d2}) = <strong>${perimeter.toFixed(2)} units</strong></div>
      <div>• Area = ${d1} × ${d2} = <strong style="color:#15803d;">${area.toFixed(2)} sq units</strong></div>
    `;
  } else if (shape === "triangle") {
    const area = 0.5 * d1 * d2;
    html = `
      <div><strong>Triangle Area:</strong></div>
      <div>• Area = 0.5 × base × height = 0.5 × ${d1} × ${d2} = <strong style="color:#15803d;">${area.toFixed(2)} sq units</strong></div>
    `;
  }
  document.getElementById("geo-result").innerHTML = html;
};

// Tool 4: Stats Logic
window.calculateStats = function() {
  const val = document.getElementById("stats-input").value;
  const nums = val.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

  if (nums.length === 0) {
    document.getElementById("stats-result").innerHTML = `<span style="color:#b91c1c;">Please enter valid numbers separated by commas.</span>`;
    return;
  }

  // Mean
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / nums.length;

  // Median
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Mode
  const counts = {};
  let maxCount = 0;
  nums.forEach(n => {
    counts[n] = (counts[n] || 0) + 1;
    if (counts[n] > maxCount) maxCount = counts[n];
  });
  const modes = Object.keys(counts).filter(k => counts[k] === maxCount);

  document.getElementById("stats-result").innerHTML = `
    <div><strong>Sorted List:</strong> [${sorted.join(", ")}] (Total count: ${nums.length})</div>
    <div style="margin-top:4px;">• <strong>Mean (Average):</strong> ${sum} / ${nums.length} = <strong style="color:#1d4ed8;">${mean.toFixed(2)}</strong></div>
    <div>• <strong>Median (Middle):</strong> <strong style="color:#15803d;">${median}</strong></div>
    <div>• <strong>Mode (Most Common):</strong> <strong>${maxCount > 1 ? modes.join(", ") : 'No single mode (all appear equally)'}</strong> (Frequency: ${maxCount})</div>
  `;
};

// ----------------------------------------------------
// Collapsible Scratchpad Logic
// ----------------------------------------------------
let padTool = 'pen'; // 'pen' or 'eraser'
let isDrawing = false;
let canvas, ctx;

function setupScratchpad() {
  const toggleBtn = document.getElementById("scratchpad-toggle");
  const quickToggleBtn = document.getElementById("quick-scratchpad-toggle");
  const panel = document.getElementById("scratchpad-panel");
  const container = document.getElementById("global-scratchpad");
  canvas = document.getElementById("scratchpad-canvas");
  if (canvas) ctx = canvas.getContext("2d");

  function togglePad() {
    if (!panel) return;
    panel.classList.toggle("hidden");
    const isHidden = panel.classList.contains("hidden");
    if (toggleBtn) toggleBtn.textContent = isHidden ? "Show Pad ▼" : "Hide Pad ▲";
    if (!isHidden) {
      setTimeout(() => {
        const mode = document.getElementById("mode-draw-btn")?.classList.contains("active") ? "draw" : "type";
        if (mode === "draw") resizeCanvas();
      }, 50);
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", togglePad);
  }

  if (quickToggleBtn) {
    quickToggleBtn.addEventListener("click", () => {
      if (panel && panel.classList.contains("hidden")) {
        togglePad();
      }
      container?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Canvas Drawing Events (Mouse & Touch)
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  window.addEventListener("mouseup", stopDrawing);

  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, { passive: false });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, { passive: false });

  canvas.addEventListener("touchend", (e) => {
    const mouseEvent = new MouseEvent("mouseup", {});
    window.dispatchEvent(mouseEvent);
  });
}

function resizeCanvas() {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width <= 0) return;
  
  // Try to preserve drawing on resize
  let temp = null;
  if (canvas.width > 0 && canvas.height > 0) {
    try {
      temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch(e) {}
  }

  canvas.width = rect.width;
  canvas.height = window.innerWidth <= 480 ? 180 : 200;

  if (temp) {
    try {
      ctx.putImageData(temp, 0, 0);
    } catch(e) {}
  }
}

function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function startDrawing(e) {
  isDrawing = true;
  const pos = getCanvasPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!isDrawing) return;
  const pos = getCanvasPos(e);
  const size = document.getElementById("pen-size").value || 4;
  const color = document.getElementById("pen-color").value || "#1d4ed8";

  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (padTool === 'eraser') {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = size * 3; // Make eraser slightly broader
  } else {
    ctx.strokeStyle = color;
  }

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDrawing() {
  if (isDrawing) {
    ctx.closePath();
    isDrawing = false;
  }
}

window.setPadTool = function(tool) {
  padTool = tool;
  document.getElementById("tool-pen").classList.toggle("active-tool", tool === 'pen');
  document.getElementById("tool-pen").classList.toggle("btn-secondary", tool !== 'pen');
  document.getElementById("tool-eraser").classList.toggle("active-tool", tool === 'eraser');
  document.getElementById("tool-eraser").classList.toggle("btn-secondary", tool !== 'eraser');
};

window.clearScratchpad = function() {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

// Mode Switcher: Type vs Draw
window.switchPadMode = function(mode) {
  const typeView = document.getElementById("scratchpad-type-view");
  const drawView = document.getElementById("scratchpad-draw-view");
  const typeBtn = document.getElementById("mode-type-btn");
  const drawBtn = document.getElementById("mode-draw-btn");

  if (mode === 'type') {
    typeView.classList.remove("hidden");
    drawView.classList.add("hidden");
    typeBtn.classList.add("active");
    drawBtn.classList.remove("active");
  } else {
    typeView.classList.add("hidden");
    drawView.classList.remove("hidden");
    typeBtn.classList.remove("active");
    drawBtn.classList.add("active");
    resizeCanvas();
  }
};

// Insert Math Symbol at Cursor in Textarea
window.insertSymbol = function(sym) {
  const textarea = document.getElementById("scratchpad-textarea");
  if (!textarea) return;

  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || 0;
  const text = textarea.value;

  let insertText = sym;
  let cursorOffset = sym.length;

  // If inserting parenthesis "( )", put cursor in the middle
  if (sym === '( )') {
    insertText = '()';
    cursorOffset = 1;
  }

  textarea.value = text.substring(0, start) + insertText + text.substring(end);
  textarea.focus();
  textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
};

window.clearTextScratchpad = function() {
  const textarea = document.getElementById("scratchpad-textarea");
  if (textarea) {
    textarea.value = "";
    textarea.focus();
  }
};


