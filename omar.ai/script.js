console.log("Omar AI Medical PRO+ Loaded 🚀");

/* =========================
   🔊 VOICE SYSTEM (Arabic)
========================= */

function speak(text) {
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance();
    msg.lang = "ar-EG";
    msg.text = text;
    msg.rate = 0.9;
    msg.pitch = 1;

    window.speechSynthesis.speak(msg);
}

/* =========================
   🧠 SMART MEDICAL ENGINE
========================= */

const DB = [

    /* 🔥 BURNS (ALL TYPES) */
    {
        keywords: [
            "حرق", "اتحرق", "نار", "مياه سخنة", "كهرباء", "حرق كيميائي", "اتلسعت", "لسعة نار"
        ],
        title: "🔥 الحروق",
        steps: [
            "1️⃣ ابعد فورًا عن مصدر الحرق",
            "2️⃣ ضع ماء جاري بارد 15–20 دقيقة",
            "3️⃣ لا تستخدم ثلج نهائيًا",
            "4️⃣ لا تضع زيوت أو معجون",
            "5️⃣ غطِ المكان بشاش نظيف"
        ],
        warning: "⚠️ إذا الحرق كبير أو في الوجه أو اليد → طوارئ"
    },

    /* 🩸 BLEEDING */
    {
        keywords: [
            "نزيف", "دم", "بينزف", "جرح", "اتقطع", "مش بيقف دم", "جرح عميق"
        ],
        title: "🩸 النزيف والجروح",
        steps: [
            "1️⃣ اضغط بقوة مباشرة على الجرح",
            "2️⃣ استخدم قطعة قماش نظيفة",
            "3️⃣ لا ترفع الضغط فجأة",
            "4️⃣ ارفع الجزء المصاب",
            "5️⃣ اغسل بعد توقف النزيف"
        ],
        warning: "⚠️ إذا الدم مستمر → اذهب للطوارئ"
    },

    /* 🦵 FALL / INJURY */
    {
        keywords: [
            "وقعت", "كدمة", "رجل", "وجع رجل", "التواء", "تورم", "مش قادر امشي", "وقعت على ايدي"
        ],
        title: "🦵 إصابة بعد سقوط",
        steps: [
            "1️⃣ وقف الحركة فورًا",
            "2️⃣ ارفع العضو المصاب",
            "3️⃣ ضع ثلج 15 دقيقة",
            "4️⃣ اربط رباط خفيف",
            "5️⃣ راحة تامة"
        ],
        warning: "⚠️ إذا ألم شديد أو عدم حركة → طبيب"
    },

    /* 🤧 FLU */
    {
        keywords: [
            "برد", "زكام", "كحة", "انفلونزا", "رشح", "سخونية"
        ],
        title: "🤧 البرد والإنفلونزا",
        steps: [
            "1️⃣ راحة تامة",
            "2️⃣ شرب سوائل دافئة",
            "3️⃣ فيتامين C",
            "4️⃣ بخار ماء",
            "5️⃣ تجنب المجهود"
        ],
        warning: "⚠️ إذا حرارة عالية أو صعوبة تنفس → طبيب"
    },

    /* 🤕 HEADACHE */
    {
        keywords: [
            "صداع", "وجع راس", "رأسي بيوجعني", "مخنوق"
        ],
        title: "🤕 الصداع",
        steps: [
            "1️⃣ اشرب ماء كثير",
            "2️⃣ ابتعد عن الشاشة",
            "3️⃣ اجلس في مكان هادئ",
            "4️⃣ راحة"
        ],
        warning: "⚠️ إذا مستمر → طبيب"
    },

    /* 😵 DIZZINESS */
    {
        keywords: [
            "دوخة", "دوار", "هبوط", "مش شايف", "تعبان قوي"
        ],
        title: "😵 الدوخة",
        steps: [
            "1️⃣ اجلس فورًا",
            "2️⃣ اشرب ماء",
            "3️⃣ تنفس ببطء",
            "4️⃣ لا تقف بسرعة"
        ],
        warning: "⚠️ إذا متكررة → طبيب"
    },

    /* ⚡ ELECTRIC SHOCK */
    {
        keywords: [
            "كهرباء", "اتكهرب", "صعق", "لمس كهربا"
        ],
        title: "⚡ الصعق الكهربائي",
        steps: [
            "1️⃣ لا تلمس المصاب إذا الكهرباء شغالة",
            "2️⃣ افصل المصدر فورًا",
            "3️⃣ تحقق من التنفس",
            "4️⃣ اطلب إسعاف"
        ],
        warning: "⚠️ حالة خطيرة جدًا"
    }

];

/* =========================
   🔍 SMART FIND ENGINE
========================= */

function findCase(text) {
    text = text.toLowerCase();

    for (let item of DB) {
        for (let key of item.keywords) {
            if (text.includes(key)) {
                return item;
            }
        }
    }

    return null;
}

/* =========================
   🚀 SEND FUNCTION
========================= */

function send() {

    let input = document.getElementById("input");
    let val = input.value.trim();

    if (!val) return;

    let result = findCase(val);

    /* fallback */
    if (!result) {
        result = {
            title: "🧠 Omar AI",
            steps: [
                "لم أتمكن من فهم الحالة بشكل دقيق",
                "حاول استخدام كلمات أوضح مثل: حرق - نزيف - صداع"
            ],
            warning: "⚠️ أعد المحاولة"
        };
    }

    let fullText =
        result.title + ". " +
        result.steps.join(". ") + ". " +
        result.warning;

    show(result);
    speak(fullText);

    input.value = "";
}

/* =========================
   📦 POPUP UI
========================= */

function show(data) {

    let overlay = document.createElement("div");
    overlay.style = `
position:fixed;inset:0;
background:rgba(0,0,0,0.6);
display:flex;
justify-content:center;
align-items:center;
z-index:9999;
`;

    let box = document.createElement("div");
    box.style = `
background:white;
padding:20px;
border-radius:20px;
width:90%;
max-width:420px;
text-align:right;
font-family:Arial;
`;

    box.innerHTML = `
<h2>${data.title}</h2>
<hr>
<p style="line-height:1.7">${data.steps.join("<br>")}</p>
<br>
<b style="color:red">${data.warning}</b>
<br><br>
<button onclick="this.parentElement.parentElement.remove()"
style="background:black;color:white;padding:10px;border:none;border-radius:10px">
إغلاق
</button>
`;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    /* auto close */
    setTimeout(() => overlay.remove(), 30000);
}

/* =========================
   ⌨️ ENTER SUPPORT
========================= */

document.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});