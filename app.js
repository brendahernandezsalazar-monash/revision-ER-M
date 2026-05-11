const STORAGE_KEY = "hybrid_er_city_under_siege_v3";
const START_LIFE = 150;
const WRONG_ANSWER_PENALTY = 15;
const TIMER_DURATION_MS = 40 * 60 * 1000;
const DEBUG_MODE = new URLSearchParams(window.location.search).get("debug") === "1";

// Provide the deployed Apps Script web app URL with ?sheetApiUrl=... or window.ESCAPE_ROOM_SHEET_API_URL.
const APPS_SCRIPT_URL_QUERY_KEY = "sheetApiUrl";
const APPS_SCRIPT_URL_STORAGE_KEY = "hybrid_er_escape_room_sheet_api_url";
const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxlRsUc7xQxDBOC2qjZ-kom-0cuiCSBHckugOvkQNIT9f8d_aO4wLwWBrqQgo8WhXZu/exec";
const LOCAL_SHEET_PROXY_PATH = "/sheet-api";
const IS_LOCAL_DEV_HOST = ["127.0.0.1", "localhost"].includes(window.location.hostname);
const APPS_SCRIPT_URL =
  window.ESCAPE_ROOM_SHEET_API_URL ||
  new URLSearchParams(window.location.search).get(APPS_SCRIPT_URL_QUERY_KEY) ||
  (IS_LOCAL_DEV_HOST ? LOCAL_SHEET_PROXY_PATH : DEFAULT_APPS_SCRIPT_URL);
const FALLBACK_AVATAR_OPTIONS = [
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_3051e6.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_59ea29.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_9874f1.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_badbed.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_d8fbda.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_d8fbf9.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_e2d8fb.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_e8ea29.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_ea5c29.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_ee4e91.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_f385b3.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_f3a285.png",
  "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_f7f2af.png",
];
const POINTS_PER_CORRECT_QUESTION = 5;
const ROOM_COMPLETION_STATUSES = {
  inProgress: "In Progress",
  completed: "Completed",
};
const SESSION_FINAL_STATUSES = {
  inProgress: "In Progress",
  completed: "Completed",
};

const ROOM_DATA = [
  {
    id: "warehouse",
    name: "Warehouse",
    district: "East Wharf",
    scene: "HER-resources/Warehouse.png",
    blocked: false,
    intro:
      "The warehouse is quiet after a long night, but one careless moment leaves a clue behind. A worker has fallen asleep with one arm hanging over the edge of a chair.",
    fragment:
      "The fragment reveals that pressure against the back of the humerus can silence a nerve and leave the hand unable to rise.",
    hintTitle: "Hint One",
    hintText: "3- Y",
    questions: [
      {
        id: "Q1",
        type: "multi-dropdown",
        question:
          "The night was long, and the chair became a trap. One arm hung over the edge, pressed hard against the bone while the sleeper noticed nothing. By morning, the hand had fallen. The wrist would not rise, the fingers would not straighten, and the thumb could no longer lift away. Complete the table by selecting the correct pin, injured nerve, and movement deficit.",
        disableTextField: true,
        fields: [
          {
            label: "Pin A region",
            options: ["A", "B", "C", "D"],
            answer: "A",
          },
          {
            label: "Pin A injured nerve",
            options: ["Radial nerve", "Median nerve", "Ulnar nerve", "Axillary nerve"],
            answer: "Radial nerve",
          },
          {
            label: "Pin A movement deficit",
            options: [
              "Wrist extension, finger extension, thumb extension",
              "Thumb opposition and lateral lumbrical function",
              "Finger abduction/adduction",
              "Shoulder abduction from 15-90°",
            ],
            answer: "Wrist extension, finger extension, thumb extension",
          },
        ],
      },
    ],
    avatarX: "42.9%",
    avatarY: "49.3%",
    avatarSize: "80px",
  },
  {
    id: "fightclub",
    name: "Fightclub",
    district: "Lower Ring",
    scene: "HER-resources/Fight_Club.png",
    blocked: false,
    intro:
      "The fight club is loud, smoky, and crowded, but one shot cuts through the noise.",
    fragment:
      "The fourth fragment reveals that a narrow bony landmark can expose a nerve and leave the foot unable to rise.",
    hintTitle: "Hint Two",
    hintText: "2- A",
    questions: [
      {
        id: "Q1",
        type: "multi-dropdown",
        question:
          "A shot rings out in the fight club, but the wound is not the only clue. The bone is struck near its narrow neck, where a nervous messenger wraps around in danger. By morning, the foot hangs low, the toes scrape the ground, and the victim can no longer lift the front of the foot or turn the sole away from the midline. Find the fractured landmark, name the trapped nerve, and match the movements that are lost.",
        disableTextField: true,
        fields: [
          {
            label: "Pin A region",
            options: ["A", "B", "C", "D"],
            answer: "A",
          },
          {
            label: "Pin A injured nerve",
            options: ["Common fibular nerve", "Tibial nerve", "Femoral nerve", "Obturator nerve"],
            answer: "Common fibular nerve",
          },
          {
            label: "Pin A movement deficit",
            options: [
              "Dorsiflexion and eversion of the foot",
              "Plantarflexion and inversion",
              "Knee extension",
              "Thigh adduction",
            ],
            answer: "Dorsiflexion and eversion of the foot",
          },
        ],
      },
    ],
    avatarX: "47.5%",
    avatarY: "45.8%",
    avatarSize: "80px",
  },
  {
    id: "pub",
    name: "Pub",
    district: "River Quarter",
    scene: "HER-resources/Pub.png",
    blocked: false,
    intro:
      "A dimly lit pub hides its clues in the upper gut. Use the pinned structures on the 3D print to follow the riddle and identify the vessel at risk.",
    fragment:
      "Fragment III: The first fragment points to a dangerous bleed hidden behind the upper gut.",
    hintTitle: "Hint Three",
    hintText: "1- R",
    questions: [
      {
        id: "Q1",
        type: "multi-dropdown",
        question:
          "In this pub, the strongest drink is not the whiskey. It is the acid that waits below. When the shield grows thin, the burn becomes a wound. Find the two favourite hiding places in the upper gut, then choose the hidden vessels that could turn each burn into a bleed.",
        disableTextField: true,
        fields: [
          {
            label: "Pin A region",
            options: [
              "Pyloric antrum",
              "First part of the duodenum",
              "Second part of the duodenum",
              "Greater curvature of the stomach",
              "Cardia",
            ],
            answer: "First part of the duodenum",
          },
          {
            label: "Pin A hidden vessel",
            options: [
              "Gastroduodenal artery",
              "Left gastric artery",
              "Right gastric artery",
              "Splenic artery",
              "Short gastric arteries",
              "Right gastro-omental artery",
              "Left gastro-omental artery",
              "Superior mesenteric artery",
              "Inferior pancreaticoduodenal artery",
            ],
            answer: "Gastroduodenal artery",
          },
          {
            label: "Pin B region",
            options: [
              "Pyloric antrum",
              "First part of the duodenum",
              "Second part of the duodenum",
              "Greater curvature of the stomach",
              "Cardia",
            ],
            answer: "Pyloric antrum",
          },
          {
            label: "Pin B hidden vessel",
            options: [
              "Right gastric artery",
              "Gastroduodenal artery",
              "Splenic artery",
              "Short gastric arteries",
              "Right gastro-omental artery",
              "Left gastro-omental artery",
              "Superior mesenteric artery",
              "Inferior pancreaticoduodenal artery",
            ],
            answer: "Right gastric artery",
          },
        ],
      },
      {
        id: "Q2",
        type: "mcq",
        question:
          "In the pub below the ribs, three messengers call the acid pumps to the wall. Which trio has summoned the acid?",
        options: [
          "Histamine, gastrin, and acetylcholine",
          "Histamine, gastrin, and somatostatin",
          "Gastrin, acetylcholine, and secretin",
          "Histamine, acetylcholine, and prostaglandins",
        ],
        answer: "Histamine, gastrin, and acetylcholine",
      },
      {
        id: "Q3",
        type: "multi-dropdown-grid",
        question:
          "At the pub, the final mechanism is hidden inside the gastric parietal cell. Different signals arrive at the cell surface and change the activity of the H+-K+ ATPase, the proton pump responsible for gastric acid secretion. Complete the table by matching each signal pathway with the correct cell or mediator, and indicate whether it increases or decreases H+ secretion.",
        image: "HER-resources/gastric_acid secretion_pathway .png",
        columns: [
          "Pathway source",
          "Mediator",
          "Receptor/pathway",
          "Effect on H+-K+ ATPase",
        ],
        rows: [
          ["Vagus", { fieldId: "Q3A" }, "M3 receptor", { fieldId: "Q3F" }],
          [{ fieldId: "Q3B" }, "Gastrin", "Cholecystokinin B receptor", { fieldId: "Q3G" }],
          [{ fieldId: "Q3C" }, { fieldId: "Q3E" }, "H2 receptor", { fieldId: "Q3H" }],
          [{ fieldId: "Q3D" }, "Somatostatin", "Somatostatin pathway", { fieldId: "Q3I" }],
          ["Prostaglandins", "Prostaglandins", "Prostaglandin pathway", { fieldId: "Q3J" }],
        ],
        fields: [
          {
            id: "Q3A",
            label: "Select the missing mediator in the vagal pathway.",
            options: ["ACh", "Gastrin", "Histamine", "Somatostatin", "Prostaglandins"],
            answer: "ACh",
          },
          {
            id: "Q3B",
            label: "Select the cell type that releases gastrin.",
            options: ["G cells", "Enterochromaffin-like cells", "D cells", "Parietal cells", "Chief cells"],
            answer: "G cells",
          },
          {
            id: "Q3C",
            label: "Select the cell type that releases histamine.",
            options: ["G cells", "Enterochromaffin-like cells", "D cells", "Parietal cells", "Chief cells"],
            answer: "Enterochromaffin-like cells",
          },
          {
            id: "Q3D",
            label: "Select the cell type that releases somatostatin.",
            options: ["G cells", "Enterochromaffin-like cells", "D cells", "Parietal cells", "Chief cells"],
            answer: "D cells",
          },
          {
            id: "Q3E",
            label: "Select the mediator released by enterochromaffin-like cells.",
            options: ["ACh", "Gastrin", "Histamine", "Somatostatin", "Prostaglandins"],
            answer: "Histamine",
          },
          {
            id: "Q3F",
            label: "Select the effect of the vagus -> ACh -> M3 receptor pathway on the H+-K+ ATPase.",
            options: ["+", "-"],
            answer: "+",
          },
          {
            id: "Q3G",
            label: "Select the effect of the G cell -> gastrin -> cholecystokinin B receptor pathway on the H+-K+ ATPase.",
            options: ["+", "-"],
            answer: "+",
          },
          {
            id: "Q3H",
            label: "Select the effect of the enterochromaffin-like cell -> histamine -> H2 receptor pathway on the H+-K+ ATPase.",
            options: ["+", "-"],
            answer: "+",
          },
          {
            id: "Q3I",
            label: "Select the effect of the D cell -> somatostatin pathway on the H+-K+ ATPase.",
            options: ["+", "-"],
            answer: "-",
          },
          {
            id: "Q3J",
            label: "Select the effect of the prostaglandin pathway on the H+-K+ ATPase.",
            options: ["+", "-"],
            answer: "-",
          },
        ],
      },
    ],
    avatarX: "44.2%",
    avatarY: "46.7%",
    avatarSize: "80px",
  },
  {
    id: "docks",
    name: "Docks",
    district: "Harbour Edge",
    scene: "HER-resources/Docks.png",
    blocked: false,
    intro:
      "The docks are quiet, but the clues point to hidden waterways under dangerous pressure. Use the pinned structures on the 3D print to identify where portal and systemic circulations can meet.",
    fragment:
      "Fragment IV: The second fragment reveals that a hidden vascular crossing can turn pressure into collapse.",
    hintTitle: "Hint Four",
    hintText: "4-HR",
    questions: [
      {
        id: "Q1",
        type: "multi-dropdown",
        question:
          "At the docks, a worker suddenly turns pale. The red tide rises from deep within the upper gut, near the place where the swallowed path meets the stomach. Complete the clue table below to find the crossing most likely to rupture.",
        textFieldLabel: "Based on the completed table, which leak is most likely causing the bleeding in this patient? Enter the correct pin.",
        textAnswer: "Pin C | C | c",
        fields: [
          {
            label: "Pin A region",
            options: ["Rectum", "Paraumbilical region", "Esophagus", "Retroperitoneum"],
            answer: "Rectum",
          },
          {
            label: "Pin A clinical condition",
            options: [
              "Rectal varices",
              "Caput medusae",
              "Esophageal varices",
              "Retroperitoneal portosystemic anastomoses",
            ],
            answer: "Rectal varices",
          },
          {
            label: "Pin A portal circulation",
            options: [
              "Superior rectal vein",
              "Paraumbilical veins",
              "Esophageal branch of the left gastric vein",
              "Splenic vein and colic veins",
            ],
            answer: "Superior rectal vein",
          },
          {
            label: "Pin A systemic circulation",
            options: [
              "Middle and inferior rectal veins",
              "Superficial epigastric veins",
              "Esophageal branches of the azygos vein",
              "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
            ],
            answer: "Middle and inferior rectal veins",
          },
          {
            label: "Pin B region",
            options: ["Rectum", "Paraumbilical region", "Esophagus", "Retroperitoneum"],
            answer: "Paraumbilical region",
          },
          {
            label: "Pin B clinical condition",
            options: [
              "Rectal varices",
              "Caput medusae",
              "Esophageal varices",
              "Retroperitoneal portosystemic anastomoses",
            ],
            answer: "Caput medusae",
          },
          {
            label: "Pin B portal circulation",
            options: [
              "Superior rectal vein",
              "Paraumbilical veins",
              "Esophageal branch of the left gastric vein",
              "Splenic vein and colic veins",
            ],
            answer: "Paraumbilical veins",
          },
          {
            label: "Pin B systemic circulation",
            options: [
              "Middle and inferior rectal veins",
              "Superficial epigastric veins",
              "Esophageal branches of the azygos vein",
              "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
            ],
            answer: "Superficial epigastric veins",
          },
          {
            label: "Pin C region",
            options: ["Rectum", "Paraumbilical region", "Esophagus", "Retroperitoneum"],
            answer: "Esophagus",
          },
          {
            label: "Pin C clinical condition",
            options: [
              "Rectal varices",
              "Caput medusae",
              "Esophageal varices",
              "Retroperitoneal portosystemic anastomoses",
            ],
            answer: "Esophageal varices",
          },
          {
            label: "Pin C portal circulation",
            options: [
              "Superior rectal vein",
              "Paraumbilical veins",
              "Esophageal branch of the left gastric vein",
              "Splenic vein and colic veins",
            ],
            answer: "Esophageal branch of the left gastric vein",
          },
          {
            label: "Pin C systemic circulation",
            options: [
              "Middle and inferior rectal veins",
              "Superficial epigastric veins",
              "Esophageal branches of the azygos vein",
              "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
            ],
            answer: "Esophageal branches of the azygos vein",
          },
          {
            label: "Pin D region",
            options: ["Rectum", "Paraumbilical region", "Esophagus", "Retroperitoneum"],
            answer: "Retroperitoneum",
          },
          {
            label: "Pin D clinical condition",
            options: [
              "Rectal varices",
              "Caput medusae",
              "Esophageal varices",
              "Retroperitoneal portosystemic anastomoses",
            ],
            answer: "Retroperitoneal portosystemic anastomoses",
          },
          {
            label: "Pin D portal circulation",
            options: [
              "Superior rectal vein",
              "Paraumbilical veins",
              "Esophageal branch of the left gastric vein",
              "Splenic vein and colic veins",
            ],
            answer: "Splenic vein and colic veins",
          },
          {
            label: "Pin D systemic circulation",
            options: [
              "Middle and inferior rectal veins",
              "Superficial epigastric veins",
              "Esophageal branches of the azygos vein",
              "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
            ],
            answer: "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
          },
        ],
      },
      {
        id: "Q2",
        type: "mcq",
        question:
          "The hidden leak has been found. Which response is helping keep the dock worker's pressure from collapsing?",
        options: [
          "Decreased venous return lowers cardiac output and arterial pressure, reducing baroreceptor firing; this increases parasympathetic activity, slowing the heart to preserve energy.",
          "Decreased venous return lowers cardiac output and arterial pressure, increasing baroreceptor firing; this increases sympathetic activity, raising heart rate, contractility, arteriolar tone, and venous tone.",
          "Decreased venous return lowers cardiac output and arterial pressure, reducing baroreceptor firing; this increases sympathetic activity, raising heart rate, contractility, arteriolar tone, and venous tone.",
          "Increased venous return raises stroke volume, allowing cardiac output to increase despite blood loss.",
        ],
        answer:
          "Decreased venous return lowers cardiac output and arterial pressure, reducing baroreceptor firing; this increases sympathetic activity, raising heart rate, contractility, arteriolar tone, and venous tone.",
      },
    ],
    avatarX: "31.4%",
    avatarY: "60.4%",
    avatarSize: "80px",
  },
  {
    id: "cave",
    name: "Cave",
    district: "Outer Ridge",
    scene: "HER-resources/Cave.png",
    blocked: true,
    unlockAfterAll: true,
    intro:
      "The cave can only be entered after all previous rooms are complete. Teams receive a code to open a locked box containing a 12-lead ECG, which provides the final clue.",
    fragment:
      "Fragment V: The final fragment reveals that the hidden enemy has struck through the heart's blood supply.",
    hintTitle: "Hint Five",
    hintText: "ECG",
    questions: [
      {
        id: "Q1",
        type: "matching",
        question:
          "Deep in the cave, a hidden enemy has struck. No wound is seen from the outside, yet the sweating will not stop. A crushing pain grips the chest and creeps down the left arm, even though nothing touched it there. The final blow was not dealt by fist or blade, but by a vessel of the heart that has fallen. Use the ECG clues to uncover which vessel has been taken down. Match the ECG lead groups with the heart territory they mainly represent.",
        pairs: [
          { left: "II, III, aVF with ST elevation", right: "Inferior wall" },
          { left: "V1-V3, with ST depression", right: "Posterior wall" },
          { left: "I, aVL, V5-V6 with ST elevation", right: "Lateral wall" },
          { left: "V1-V4 with ST elevation", right: "Anterior/septal wall" },
        ],
      },
      {
        id: "Q2",
        type: "mcq",
        question: "Looking at the ECG, which heart territories appear to be involved?",
        options: [
          "Inferior wall only",
          "Inferior and anterior/septal walls",
          "Inferior and posterior walls",
          "Posterior and anterior/septal walls",
          "Anterior wall only",
          "Anterior and lateral walls",
        ],
        answer: "Inferior and posterior walls",
      },
      {
        id: "Q3",
        type: "text",
        question:
          "These territories give the final clue. On the 3D heart model, find the coronary vessel where the hidden enemy was lying in wait. Enter the correct letter.",
        answer: "C | c",
      },
      {
        id: "Q4",
        type: "mcq",
        question: "What is the nature of the assassin?",
        options: [
          "It lurks on the vascular endothelial cells.",
          "Its lipid core is camouflaged as it silently accumulates beneath the outer adventitia.",
          "Its macrophages gorge on cholesterol under the cover of the endothelium.",
          "It camouflages its lipid core by stimulating smooth muscle cells to divide around it, thickening the adventitia.",
        ],
        answer: "Its macrophages gorge on cholesterol under the cover of the endothelium.",
      },
      {
        id: "Q5",
        type: "mcq",
        question:
          "The heart does not fall silent. A slower echo keeps it moving, beating at 41 beats per minute. Which hidden pacemaker has taken over, and which ion gives its upward spark?",
        options: [
          "AV node / junctional pacemaker - Ca2+ influx",
          "AV node / junctional pacemaker - fast Na+ influx",
          "His-Purkinje system - fast Na+ influx",
          "SA node - K+ efflux",
        ],
        answer: "AV node / junctional pacemaker - Ca2+ influx",
      },
    ],
    avatarX: "38.8%",
    avatarY: "68.3%",
    avatarSize: "80px",
  },
];

const screens = {
  intro: document.getElementById("screen-intro"),
  instructions: document.getElementById("screen-instructions"),
  map: document.getElementById("screen-map"),
  room: document.getElementById("screen-room"),
  finale: document.getElementById("screen-finale"),
};

const els = {
  teamNameInput: document.getElementById("teamNameInput"),
  avatarGrid: document.getElementById("avatarGrid"),
  setupError: document.getElementById("setupError"),
  teamSummary: document.getElementById("teamSummary"),
  avatarPreview: document.getElementById("avatarPreview"),
  startGameBtn: document.getElementById("startGameBtn"),
  continueToMapBtn: document.getElementById("continueToMapBtn"),
  hudTeamName: document.getElementById("hudTeamName"),
  hudProgress: document.getElementById("hudProgress"),
  hudLife: document.getElementById("hudLife"),
  hudLifeFill: document.getElementById("hudLifeFill"),
  hudTimer: document.getElementById("hudTimer"),
  hudStatus: document.getElementById("hudStatus"),
  hintList: document.getElementById("hintList"),
  roomHintList: document.getElementById("roomHintList"),
  roomTeamName: document.getElementById("roomTeamName"),
  roomProgress: document.getElementById("roomProgress"),
  roomLife: document.getElementById("roomLife"),
  roomLifeFill: document.getElementById("roomLifeFill"),
  roomTimer: document.getElementById("roomTimer"),
  finalHintList: document.getElementById("finalHintList"),
  mapAvatar: document.getElementById("mapAvatar"),
  mapAvatarImg: document.getElementById("mapAvatarImg"),
  cityMap: document.getElementById("cityMap"),
  mapImage: document.querySelector(".map-image"),
  mapDebugPanel: document.getElementById("mapDebugPanel"),
  mapDebugTarget: document.getElementById("mapDebugTarget"),
  mapDebugCoords: document.getElementById("mapDebugCoords"),
  mapDebugPercents: document.getElementById("mapDebugPercents"),
  roomAvatar: document.getElementById("roomAvatar"),
  roomAvatarImg: document.getElementById("roomAvatarImg"),
  roomSceneImage: document.getElementById("roomSceneImage"),
  roomStage: document.querySelector(".room-stage"),
  roomDistrictTag: document.getElementById("roomDistrictTag"),
  roomTitle: document.getElementById("room-title"),
  roomIntro: document.getElementById("roomIntro"),
  roomQuestion: document.getElementById("roomQuestion"),
  questionStepLabel: document.getElementById("questionStepLabel"),
  answerForm: document.getElementById("answerForm"),
  answerLabel: document.getElementById("answerLabel"),
  answerFields: document.getElementById("answerFields"),
  answerFeedback: document.getElementById("answerFeedback"),
  backToMapBtn: document.getElementById("backToMapBtn"),
  finalFragments: document.getElementById("finalFragments"),
  finaleConfetti: document.getElementById("finaleConfetti"),
  restartBtn: document.getElementById("restartBtn"),
  debugPanel: document.getElementById("debugPanel"),
  debugRoomName: document.getElementById("debugRoomName"),
  debugCoords: document.getElementById("debugCoords"),
  debugPercents: document.getElementById("debugPercents"),
};

const mapButtons = Array.from(document.querySelectorAll(".map-hotspot"));

let avatarOptions = [];
let state = loadState();
let timerInterval = null;
let finaleConfettiCleanup = null;
let isStartingTeam = false;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  persistAppsScriptUrl();
  bindEvents();
  hydrateState();
  const resumed = await resumeExistingSessionIfPossible();
  if (!resumed) {
    await loadAvatarOptions();
  }
  renderAll();
  startTimer();
  if (state.solvedRoomIds.length === getPlayableRooms().length && state.session.sessionId) {
    finalizeSessionIfNeeded().catch((error) => {
      console.warn("Unable to finalize completed session during init.", error);
    });
  }
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }

  return {
    screen: "intro",
    selectedTeam: "",
    selectedAvatarUrl: "",
    activeRoomId: "",
    solvedRoomIds: [],
    fragments: [],
    hints: [],
    roomQuestionIndex: {},
    life: START_LIFE,
    endTimeMs: Date.now() + TIMER_DURATION_MS,
    session: createEmptySessionState(),
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function hydrateState() {
  state.selectedTeam = String(state.selectedTeam || "").trim();
  state.selectedAvatarUrl = String(state.selectedAvatarUrl || "").trim();
  state.roomQuestionIndex = state.roomQuestionIndex || {};
  state.solvedRoomIds = state.solvedRoomIds.filter((id) => ROOM_DATA.some((room) => room.id === id));
  state.fragments = state.fragments.filter((item) => ROOM_DATA.some((room) => room.id === item.roomId));
  state.hints = state.hints.filter((item) => ROOM_DATA.some((room) => room.id === item.roomId));
  state.life = typeof state.life === "number" ? state.life : START_LIFE;
  state.endTimeMs = typeof state.endTimeMs === "number" ? state.endTimeMs : Date.now() + TIMER_DURATION_MS;
  state.session = hydrateSessionState(state.session);

  if (state.session.teamName && !state.selectedTeam) {
    state.selectedTeam = state.session.teamName;
  }
  if (state.session.avatarUrl && !state.selectedAvatarUrl) {
    state.selectedAvatarUrl = state.session.avatarUrl;
  }

  saveState();
}

function persistAppsScriptUrl() {
  if (APPS_SCRIPT_URL) {
    localStorage.setItem(APPS_SCRIPT_URL_STORAGE_KEY, APPS_SCRIPT_URL);
  }
}

async function loadAvatarOptions() {
  if (!APPS_SCRIPT_URL) {
    avatarOptions = [...FALLBACK_AVATAR_OPTIONS];
    showSetupError("Avatar list fallback is active. Team creation should still work.");
    return;
  }

  try {
    const result = await postSheetAction("getAvatarOptions", {});
    avatarOptions = Array.isArray(result?.avatars) ? result.avatars.filter(Boolean) : [];
    if (!avatarOptions.length) {
      avatarOptions = [...FALLBACK_AVATAR_OPTIONS];
      showSetupError("Avatar list fallback is active. Team creation should still work.");
      return;
    }
    clearSetupError();
  } catch (error) {
    console.warn("Unable to load avatars from Google Sheets.", error);
    avatarOptions = [...FALLBACK_AVATAR_OPTIONS];
    showSetupError("Avatar list fallback is active. Team creation should still work.");
  }
}

async function resumeExistingSessionIfPossible() {
  if (!APPS_SCRIPT_URL || !state.session.teamCode || !state.session.sessionId) {
    clearStoredSetup();
    return false;
  }

  try {
    const result = await postSheetAction("validateExistingSession", {
      teamCode: state.session.teamCode,
      sessionId: state.session.sessionId,
    });

    if (!result?.valid) {
      clearStoredSetup();
      return false;
    }

    applyValidatedSession(result);
    return true;
  } catch (error) {
    console.warn("Unable to validate the stored session.", error);
    clearStoredSetup();
    showSetupError("We couldn't restore the saved session. Please create your team again.");
    return false;
  }
}

function createEmptySessionState() {
  return {
    sessionId: "",
    teamCode: "",
    teamName: "",
    avatarUrl: "",
    startedAt: "",
    completedAt: "",
    finalStatus: "",
    totalAttempts: 0,
    hintsUsed: 0,
    roomsCompleted: 0,
    pointsAwarded: 0,
    pointsAddedToThisWeek: false,
    weekKey: "",
    correctQuestions: 0,
    questionPoints: 0,
    timeBonus: 0,
    awardedAt: "",
    roomStats: {},
    questionAttemptCounts: {},
    questionStartTimes: {},
    correctQuestionKeys: [],
  };
}

function hydrateSessionState(session) {
  const base = createEmptySessionState();
  const hydrated = {
    ...base,
    ...(session || {}),
  };

  hydrated.roomStats = hydrated.roomStats || {};
  hydrated.questionAttemptCounts = hydrated.questionAttemptCounts || {};
  hydrated.questionStartTimes = hydrated.questionStartTimes || {};
  hydrated.correctQuestionKeys = Array.isArray(hydrated.correctQuestionKeys) ? hydrated.correctQuestionKeys : [];

  return hydrated;
}

function getTimestampIso(date = new Date()) {
  return date.toISOString();
}

function getWeekKey(dateInput) {
  const date = new Date(dateInput || Date.now());
  const monday = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = monday.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setUTCDate(monday.getUTCDate() + diff);
  return monday.toISOString().slice(0, 10);
}

function applyValidatedSession(session) {
  state.selectedTeam = String(session.teamName || "").trim();
  state.selectedAvatarUrl = String(session.avatarUrl || "").trim();
  state.session = hydrateSessionState({
    ...state.session,
    sessionId: session.sessionId || state.session.sessionId,
    teamCode: session.teamCode || state.session.teamCode,
    teamName: session.teamName || state.session.teamName,
    avatarUrl: session.avatarUrl || state.session.avatarUrl,
    startedAt: session.startedAt || state.session.startedAt,
    completedAt: session.completedAt || state.session.completedAt,
    finalStatus: session.finalStatus || state.session.finalStatus || SESSION_FINAL_STATUSES.inProgress,
    totalAttempts: Number.isFinite(Number(session.totalAttempts)) ? Number(session.totalAttempts) : state.session.totalAttempts,
    hintsUsed: Number.isFinite(Number(session.hintsUsed)) ? Number(session.hintsUsed) : state.session.hintsUsed,
    roomsCompleted: Number.isFinite(Number(session.roomsCompleted)) ? Number(session.roomsCompleted) : state.session.roomsCompleted,
    pointsAwarded: Number.isFinite(Number(session.pointsAwarded)) ? Number(session.pointsAwarded) : state.session.pointsAwarded,
    pointsAddedToThisWeek: Boolean(session.pointsAddedToThisWeek),
    weekKey: session.weekKey || state.session.weekKey || getWeekKey(session.startedAt),
  });
  if (!state.screen || state.screen === "intro") {
    state.screen = "instructions";
  }
  saveState();
}

function clearStoredSetup(save = true) {
  state.activeRoomId = "";
  state.solvedRoomIds = [];
  state.fragments = [];
  state.hints = [];
  state.roomQuestionIndex = {};
  state.life = START_LIFE;
  state.endTimeMs = Date.now() + TIMER_DURATION_MS;
  state.selectedTeam = "";
  state.selectedAvatarUrl = "";
  state.screen = "intro";
  state.session = createEmptySessionState();
  if (save) {
    saveState();
  }
}

function showSetupError(message) {
  if (!els.setupError) {
    return;
  }
  els.setupError.textContent = message;
  els.setupError.hidden = !message;
}

function clearSetupError() {
  showSetupError("");
}

function normalizeTeamName(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateDurationSeconds(startedAt, completedAt) {
  if (!startedAt || !completedAt) {
    return 0;
  }
  return Math.max(0, Math.round((new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000));
}

function secondsToMinutes(seconds) {
  return Number((Math.max(0, Number(seconds) || 0) / 60).toFixed(2));
}

function calculateTimeBonus(totalDurationMinutes) {
  if (totalDurationMinutes < 20) {
    return 20;
  }
  if (totalDurationMinutes < 25) {
    return 15;
  }
  if (totalDurationMinutes < 30) {
    return 10;
  }
  if (totalDurationMinutes < 35) {
    return 5;
  }
  return 0;
}

function getQuestionKey(roomId, questionId) {
  return `${roomId}::${questionId}`;
}

function getQuestionLogId(roomId, questionId) {
  return getQuestionKey(roomId, questionId);
}

function ensureQuestionStartedAt(roomId, questionId) {
  const questionKey = getQuestionKey(roomId, questionId);
  if (!state.session.questionStartTimes[questionKey]) {
    state.session.questionStartTimes[questionKey] = getTimestampIso();
    saveState();
  }

  return state.session.questionStartTimes[questionKey];
}

function getSessionTeamName() {
  return String(state.session?.teamName || "").trim();
}

function ensureRoomSessionState(room) {
  const existing = state.session.roomStats[room.id];
  if (existing) {
    return existing;
  }

  const roomState = {
    roomId: room.id,
    roomName: room.name,
    roomStartedAt: "",
    roomCompletedAt: "",
    roomDurationSeconds: 0,
    roomDurationMinutes: 0,
    attemptsInRoom: 0,
    hintsUsedInRoom: 0,
    roomCompleted: false,
    fragmentUnlocked: "",
  };

  state.session.roomStats[room.id] = roomState;
  return roomState;
}

async function ensureSessionStarted() {
  if (!state.session.sessionId || !state.session.teamCode || !state.session.teamName) {
    return null;
  }

  if (!state.session.startedAt) {
    state.session.startedAt = getTimestampIso();
  }
  if (!state.session.finalStatus) {
    state.session.finalStatus = SESSION_FINAL_STATUSES.inProgress;
  }
  if (!state.session.weekKey) {
    state.session.weekKey = getWeekKey(state.session.startedAt);
  }

  saveState();
  return state.session;
}

async function postSheetAction(action, payload) {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({ action, payload }),
  });

  if (!response.ok) {
    throw new Error(`Sheet sync failed with HTTP ${response.status}`);
  }

  const result = await response.json();
  if (!result.ok) {
    throw new Error(result.error || "Sheet sync failed.");
  }

  return result.result;
}

async function syncRoomLog(roomState) {
  if (!APPS_SCRIPT_URL || !state.session.sessionId) {
    return;
  }

  await postSheetAction("upsertRoomLog", {
    SessionID: state.session.sessionId,
    TeamCode: state.session.teamCode,
    TeamName: state.session.teamName,
    RoomID: roomState.roomId,
    RoomName: roomState.roomName,
    RoomStartedAt: roomState.roomStartedAt,
    RoomCompletedAt: roomState.roomCompletedAt,
    RoomDurationSeconds: roomState.roomDurationSeconds,
    RoomDurationMinutes: roomState.roomDurationMinutes,
    AttemptsInRoom: roomState.attemptsInRoom,
    HintsUsedInRoom: roomState.hintsUsedInRoom,
    RoomCompleted: roomState.roomCompleted ? "Yes" : "No",
    FragmentUnlocked: roomState.fragmentUnlocked,
  });
}

async function syncAnswerLog(payload) {
  if (!APPS_SCRIPT_URL || !state.session.sessionId) {
    return;
  }

  await postSheetAction("appendAnswerLog", payload);
}

async function finalizeSessionIfNeeded() {
  if (!state.session.sessionId || !state.session.startedAt) {
    return;
  }

  if (!state.session.completedAt) {
    state.session.completedAt = getTimestampIso();
  }
  state.session.finalStatus = SESSION_FINAL_STATUSES.completed;
  state.session.roomsCompleted = state.solvedRoomIds.length;

  const totalDurationSeconds = calculateDurationSeconds(state.session.startedAt, state.session.completedAt);
  const totalDurationMinutes = secondsToMinutes(totalDurationSeconds);
  const questionPoints = state.session.correctQuestions * POINTS_PER_CORRECT_QUESTION;
  const timeBonus = calculateTimeBonus(totalDurationMinutes);
  const pointsAwarded = questionPoints + timeBonus;

  state.session.questionPoints = questionPoints;
  state.session.timeBonus = timeBonus;
  state.session.pointsAwarded = pointsAwarded;
  saveState();

  if (!APPS_SCRIPT_URL) {
    return;
  }

  let result = null;
  try {
    result = await postSheetAction("completeSession", {
      SessionID: state.session.sessionId,
      TeamCode: state.session.teamCode,
      TeamName: state.session.teamName,
      StartedAt: state.session.startedAt,
      CompletedAt: state.session.completedAt,
      TotalDurationSeconds: totalDurationSeconds,
      TotalDurationMinutes: totalDurationMinutes,
      FinalStatus: state.session.finalStatus,
      TotalAttempts: state.session.totalAttempts,
      HintsUsed: state.session.hintsUsed,
      RoomsCompleted: state.session.roomsCompleted,
      CorrectQuestions: state.session.correctQuestions,
      QuestionPoints: questionPoints,
      TimeBonus: timeBonus,
      PointsAwarded: pointsAwarded,
      Reason: "Escape room completion",
      WeekKey: state.session.weekKey || getWeekKey(state.session.startedAt),
    });
  } catch (error) {
    console.warn("Unable to finalize session in Google Sheets.", error);
    return;
  }

  if (result?.awarded || result?.duplicatePrevented) {
    state.session.pointsAddedToThisWeek = true;
    state.session.awardedAt = state.session.completedAt;
    saveState();
  }
}

function getQuestionSubmissionValue(question) {
  if (question.type === "matching") {
    return question.pairs
      .map((pair, index) => {
        const value = document.querySelector(`[name="matching-${index}"]`)?.value || "";
        return `${pair.left}: ${value}`;
      })
      .join(" | ");
  }

  if (question.type === "multi-dropdown") {
    const dropdownValues = question.fields.map((field, index) => {
      const value = document.querySelector(`[name="multi-${index}"]`)?.value || "";
      return `${field.label}: ${value}`;
    });

    if (!question.disableTextField) {
      const textValue = document.querySelector('[name="multi-text-answer"]')?.value || "";
      dropdownValues.push(`${question.textFieldLabel || "Final clue"}: ${textValue}`);
    }

    return dropdownValues.join(" | ");
  }

  if (question.type === "multi-dropdown-grid") {
    return question.fields
      .map((field) => {
        const value = document.querySelector(`[name="grid-${field.id}"]`)?.value || "";
        return `${field.id}: ${value}`;
      })
      .join(" | ");
  }

  return (
    document.querySelector('[name="dynamic-answer"]:checked')?.value ||
    document.querySelector('[name="dynamic-answer"]')?.value ||
    ""
  );
}

function getQuestionCorrectAnswerValue(question) {
  if (question.type === "matching") {
    return question.pairs.map((pair) => `${pair.left}: ${pair.right}`).join(" | ");
  }

  if (question.type === "multi-dropdown") {
    const answers = question.fields.map((field) => `${field.label}: ${field.answer}`);
    if (!question.disableTextField) {
      answers.push(`${question.textFieldLabel || "Final clue"}: ${question.textAnswer || ""}`);
    }
    return answers.join(" | ");
  }

  if (question.type === "multi-dropdown-grid") {
    return question.fields.map((field) => `${field.id}: ${field.answer}`).join(" | ");
  }

  return question.answer || "";
}

function bindEvents() {
  els.teamNameInput.addEventListener("input", handleTeamNameInput);
  els.startGameBtn.addEventListener("click", handleStartGame);
  els.continueToMapBtn.addEventListener("click", () => goToScreen("map"));
  els.backToMapBtn.addEventListener("click", () => goToScreen("map"));
  els.answerForm.addEventListener("submit", handleAnswerSubmit);
  els.restartBtn.addEventListener("click", resetProgress);
  document.querySelectorAll("[data-restart-game]").forEach((button) => {
    button.addEventListener("click", resetProgress);
  });
  if (DEBUG_MODE && els.cityMap) {
    els.cityMap.addEventListener("click", handleMapDebugClick);
  }
  if (DEBUG_MODE && els.mapDebugTarget) {
    els.mapDebugTarget.addEventListener("change", renderMapDebugPanel);
  }
  if (DEBUG_MODE && els.roomStage) {
    els.roomStage.addEventListener("click", handleDebugStageClick);
  }

  mapButtons.forEach((button) => {
    button.addEventListener("click", () => handleMapSelection(button.dataset.roomId));
  });
}

function renderAll() {
  renderAvatarOptions();
  renderTeamSelection();
  renderSidebar();
  renderMap();
  renderFinale();
  syncScreen();
}

function renderAvatarOptions() {
  if (!els.avatarGrid) {
    return;
  }

  els.avatarGrid.innerHTML = avatarOptions.length
    ? avatarOptions
        .map((avatarUrl, index) => {
          const selectedClass = avatarUrl === state.selectedAvatarUrl ? " selected" : "";
          const checked = avatarUrl === state.selectedAvatarUrl ? "true" : "false";
          return `
            <button
              class="avatar-option${selectedClass}"
              type="button"
              data-avatar-url="${escapeHtml(avatarUrl)}"
              role="radio"
              aria-checked="${checked}"
              aria-label="Select avatar ${index + 1}"
            >
              <img src="${escapeHtml(avatarUrl)}" alt="" />
            </button>
          `;
        })
        .join("")
    : '<p class="team-summary">No avatars are available yet.</p>';

  els.avatarGrid.querySelectorAll("[data-avatar-url]").forEach((button) => {
    button.addEventListener("click", () => handleAvatarSelection(button.dataset.avatarUrl));
  });
}

function renderTeamSelection() {
  const team = getSelectedTeam();
  const hasDraftTeamName = normalizeTeamName(state.selectedTeam);
  const hasDraftAvatar = Boolean(state.selectedAvatarUrl);
  els.startGameBtn.disabled = isStartingTeam || !hasDraftTeamName || !hasDraftAvatar;

  if (els.teamNameInput && els.teamNameInput.value !== state.selectedTeam) {
    els.teamNameInput.value = state.selectedTeam;
  }

  if (!team || !team.TeamName) {
    els.teamSummary.textContent = "Create a team to begin the briefing.";
    els.avatarPreview.classList.remove("ready");
    els.avatarPreview.removeAttribute("src");
    return;
  }

  els.teamSummary.textContent = `${team.TeamName} will carry this investigation.`;
  if (team.AvatarUrl) {
    els.avatarPreview.src = team.AvatarUrl;
    els.avatarPreview.classList.add("ready");
  } else {
    els.avatarPreview.classList.remove("ready");
    els.avatarPreview.removeAttribute("src");
  }
}

function renderSidebar() {
  const team = getSelectedTeam();
  const solvedCount = state.solvedRoomIds.length;
  const totalPlayable = getPlayableRooms().length;

  els.hudTeamName.textContent = team ? team.TeamName : "-";
  els.roomTeamName.textContent = team ? team.TeamName : "-";
  els.hudProgress.textContent = `${solvedCount} / ${totalPlayable}`;
  els.roomProgress.textContent = `${solvedCount} / ${totalPlayable}`;
  els.hudLife.textContent = String(state.life);
  els.roomLife.textContent = String(state.life);
  updateLifeMeters();
  updateTimerDisplays();
  els.hudStatus.textContent = isRoomBlocked(getRoomById("cave"))
    ? "Four fragments remain hidden. The cave is still blocked."
    : "The cave route has opened.";

  const hintMarkup = state.hints.length
    ? state.hints
        .map((hint) => `<li><strong>${escapeHtml(hint.title)}:</strong> ${escapeHtml(hint.text)}</li>`)
        .join("")
    : "<li>No hints recovered yet.</li>";

  els.hintList.innerHTML = hintMarkup;
  els.roomHintList.innerHTML = hintMarkup;
  els.finalHintList.innerHTML = hintMarkup;
}

function renderMap() {
  const team = getSelectedTeam();
  if (team?.AvatarUrl) {
    els.mapAvatarImg.src = team.AvatarUrl;
    els.mapAvatar.classList.add("ready");
  } else {
    els.mapAvatar.classList.remove("ready");
    els.mapAvatarImg.removeAttribute("src");
  }

  mapButtons.forEach((button) => {
    const room = getRoomById(button.dataset.roomId);
    const solved = state.solvedRoomIds.includes(room.id);
    const blocked = isRoomBlocked(room);

    button.classList.toggle("solved", solved);
    button.classList.toggle("blocked", blocked);
    button.classList.toggle("locked", blocked);
  });

  renderMapDebugPanel();
}

function renderRoom(roomId) {
  const room = getRoomById(roomId);
  const team = getSelectedTeam();
  if (!room || isRoomBlocked(room)) {
    goToScreen("map");
    return;
  }

  const questionIndex = state.roomQuestionIndex[room.id] || 0;
  const question = room.questions[questionIndex];
  ensureQuestionStartedAt(room.id, question.id);

  els.roomDistrictTag.textContent = room.district;
  els.roomTitle.textContent = room.name;
  els.roomIntro.textContent = room.intro;
  els.questionStepLabel.textContent = `Question ${questionIndex + 1} of ${room.questions.length}`;
  els.roomQuestion.textContent = question.question;
  els.roomSceneImage.src = room.scene;
  els.roomSceneImage.alt = `${room.name} scene`;
  els.answerFeedback.textContent = "";
  els.answerFeedback.className = "answer-feedback";

  els.roomAvatar.style.setProperty("--avatar-x", room.avatarX);
  els.roomAvatar.style.setProperty("--avatar-y", room.avatarY);
  els.roomAvatar.style.setProperty("--avatar-size", room.avatarSize);
  renderDebugPanel(room);

  if (team?.AvatarUrl) {
    els.roomAvatarImg.src = team.AvatarUrl;
    els.roomAvatar.classList.add("ready");
  } else {
    els.roomAvatar.classList.remove("ready");
    els.roomAvatarImg.removeAttribute("src");
  }

  renderAnswerField(question);
}

function renderFinale() {
  const markup = state.fragments
    .map(
      (fragment) => `
        <article class="fragment-card">
          <strong>${escapeHtml(fragment.roomName)}</strong>
          <span>${escapeHtml(fragment.text)}</span>
        </article>
      `
    )
    .join("");

  els.finalFragments.innerHTML = markup || "<p>No fragments recovered yet.</p>";
}

function launchFinaleConfetti() {
  if (!els.finaleConfetti || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (typeof finaleConfettiCleanup === "function") {
    finaleConfettiCleanup();
  }

  els.finaleConfetti.innerHTML = "";

  const colors = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#f8edeb"];
  const shapes = ["", "", "", " is-circle"];
  const pieceCount = 90;

  for (let i = 0; i < pieceCount; i += 1) {
    const piece = document.createElement("span");
    const size = 6 + Math.random() * 10;
    const left = Math.random() * 100;
    const drift = -120 + Math.random() * 240;
    const duration = 2600 + Math.random() * 1800;
    const delay = Math.random() * 450;
    const rotate = -540 + Math.random() * 1080;

    piece.className = `confetti-piece${shapes[Math.floor(Math.random() * shapes.length)]}`;
    piece.style.setProperty("--confetti-size", `${size}px`);
    piece.style.setProperty("--confetti-left", `${left}%`);
    piece.style.setProperty("--confetti-drift", `${drift}px`);
    piece.style.setProperty("--confetti-duration", `${duration}ms`);
    piece.style.setProperty("--confetti-delay", `${delay}ms`);
    piece.style.setProperty("--confetti-rotate", `${rotate}deg`);
    piece.style.setProperty("--confetti-color", colors[Math.floor(Math.random() * colors.length)]);
    els.finaleConfetti.appendChild(piece);
  }

  const cleanupHandle = window.setTimeout(() => {
    els.finaleConfetti.innerHTML = "";
    finaleConfettiCleanup = null;
  }, 5200);

  finaleConfettiCleanup = () => {
    window.clearTimeout(cleanupHandle);
    els.finaleConfetti.innerHTML = "";
    finaleConfettiCleanup = null;
  };
}

function syncScreen() {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));

  if (!state.selectedTeam && state.screen !== "intro") {
    state.screen = "intro";
  }

  if (!screens[state.screen]) {
    state.screen = "intro";
  }

  screens[state.screen].classList.add("active");

  if (state.screen === "room" && state.activeRoomId) {
    renderRoom(state.activeRoomId);
  }
}

function handleTeamNameInput(event) {
  state.selectedTeam = normalizeTeamName(event.target.value);
  clearSetupError();
  saveState();
  renderTeamSelection();
}

function handleAvatarSelection(avatarUrl) {
  state.selectedAvatarUrl = String(avatarUrl || "").trim();
  clearSetupError();
  saveState();
  renderAll();
}

async function handleStartGame() {
  const teamName = normalizeTeamName(state.selectedTeam);
  const avatarUrl = String(state.selectedAvatarUrl || "").trim();

  if (!teamName) {
    showSetupError("Please enter a team name before starting.");
    renderTeamSelection();
    return;
  }
  if (!avatarUrl) {
    showSetupError("Please select an avatar before starting.");
    renderTeamSelection();
    return;
  }
  if (!APPS_SCRIPT_URL) {
    showSetupError("The team setup service is not configured yet.");
    return;
  }

  isStartingTeam = true;
  clearSetupError();
  renderTeamSelection();

  try {
    const result = await postSheetAction("createTeamAndSession", { teamName, avatarUrl });
    applyValidatedSession(result);
    state.endTimeMs = Date.now() + TIMER_DURATION_MS;
    saveState();
    goToScreen("instructions");
  } catch (error) {
    showSetupError(error.message || "We couldn't create your team. Please try again.");
  } finally {
    isStartingTeam = false;
    renderTeamSelection();
  }
}

async function handleMapSelection(roomId) {
  const room = getRoomById(roomId);
  if (!room || isRoomBlocked(room)) {
    els.hudStatus.textContent = `${room?.name || "That location"} is blocked.`;
    return;
  }

  await ensureSessionStarted();
  const roomState = ensureRoomSessionState(room);
  if (!roomState.roomStartedAt) {
    roomState.roomStartedAt = getTimestampIso();
    saveState();
  }

  syncRoomLog(roomState).catch((error) => {
    console.warn("Unable to sync room start.", error);
  });

  moveAvatarTo(roomId);
  state.activeRoomId = roomId;
  state.roomQuestionIndex[roomId] = state.solvedRoomIds.includes(roomId) ? room.questions.length - 1 : 0;
  saveState();

  window.setTimeout(() => {
    state.screen = "room";
    saveState();
    renderAll();
  }, 900);
}

function moveAvatarTo(roomId) {
  const button = mapButtons.find((entry) => entry.dataset.roomId === roomId);
  if (!button) {
    return;
  }
  els.mapAvatar.style.left = button.style.getPropertyValue("--x");
  els.mapAvatar.style.top = button.style.getPropertyValue("--y");
}

async function handleAnswerSubmit(event) {
  event.preventDefault();
  const room = getRoomById(state.activeRoomId);
  if (!room) {
    return;
  }

  await ensureSessionStarted();

  const questionIndex = state.roomQuestionIndex[room.id] || 0;
  const question = room.questions[questionIndex];
  const roomState = ensureRoomSessionState(room);
  const questionKey = getQuestionKey(room.id, question.id);
  const questionLogId = getQuestionLogId(room.id, question.id);
  const questionStartedAt = ensureQuestionStartedAt(room.id, question.id);
  const submittedAt = getTimestampIso();
  const submittedAnswer = getQuestionSubmissionValue(question);
  const correctAnswer = getQuestionCorrectAnswerValue(question);

  roomState.attemptsInRoom += 1;
  state.session.totalAttempts += 1;
  state.session.questionAttemptCounts[questionKey] = (state.session.questionAttemptCounts[questionKey] || 0) + 1;
  const attemptNumber = state.session.questionAttemptCounts[questionKey];
  const isCorrect = validateQuestionAnswer(question);
  const questionDurationSeconds = calculateDurationSeconds(questionStartedAt, submittedAt);
  const questionDurationMinutes = secondsToMinutes(questionDurationSeconds);
  const timeSinceRoomStartSeconds = roomState.roomStartedAt
    ? calculateDurationSeconds(roomState.roomStartedAt, submittedAt)
    : 0;

  saveState();
  syncAnswerLog({
    SessionID: state.session.sessionId,
    TeamName: state.session.teamName,
    RoomID: room.id,
    RoomName: room.name,
    QuestionID: questionLogId,
    QuestionType: question.type,
    AttemptNumber: attemptNumber,
    QuestionStartedAt: questionStartedAt,
    SubmittedAt: submittedAt,
    QuestionDurationSeconds: questionDurationSeconds,
    QuestionDurationMinutes: questionDurationMinutes,
    SubmittedAnswer: submittedAnswer,
    CorrectAnswer: correctAnswer,
    IsCorrect: isCorrect ? "Yes" : "No",
    TimeSinceRoomStartSeconds: timeSinceRoomStartSeconds,
  }).catch((error) => {
    console.warn("Unable to sync answer attempt.", error);
  });

  syncRoomLog(roomState).catch((error) => {
    console.warn("Unable to sync room attempt count.", error);
  });

  if (!isCorrect) {
    state.life = Math.max(0, state.life - WRONG_ANSWER_PENALTY);
    saveState();
    renderSidebar();
    els.answerFeedback.textContent = "That answer does not fit the evidence yet.";
    els.answerFeedback.className = "answer-feedback error";
    return;
  }

  const nextIndex = questionIndex + 1;
  if (!state.session.correctQuestionKeys.includes(questionKey)) {
    state.session.correctQuestionKeys.push(questionKey);
    state.session.correctQuestions += 1;
  }

  if (nextIndex < room.questions.length) {
    state.roomQuestionIndex[room.id] = nextIndex;
    saveState();
    renderRoom(room.id);
    els.answerFeedback.textContent = "Correct. Move to the next clue.";
    els.answerFeedback.className = "answer-feedback success";
    return;
  }

  if (!state.solvedRoomIds.includes(room.id)) {
    state.solvedRoomIds.push(room.id);
    state.fragments.push({
      roomId: room.id,
      roomName: room.name,
      text: room.fragment,
    });
    state.hints.push({
      roomId: room.id,
      title: room.hintTitle,
      text: room.hintText,
    });
  }

  roomState.roomCompletedAt = submittedAt;
  roomState.roomDurationSeconds = calculateDurationSeconds(roomState.roomStartedAt, roomState.roomCompletedAt);
  roomState.roomDurationMinutes = secondsToMinutes(roomState.roomDurationSeconds);
  roomState.roomCompleted = true;
  roomState.fragmentUnlocked = room.fragment;

  state.roomQuestionIndex[room.id] = room.questions.length - 1;
  els.answerFeedback.textContent = "Correct. Your fragment and lock clue have been added.";
  els.answerFeedback.className = "answer-feedback success";
  state.session.roomsCompleted = state.solvedRoomIds.length;

  saveState();
  syncRoomLog(roomState).catch((error) => {
    console.warn("Unable to sync completed room log.", error);
  });
  renderSidebar();
  renderMap();
  renderFinale();

  if (state.solvedRoomIds.length === getPlayableRooms().length) {
    await finalizeSessionIfNeeded();
    window.setTimeout(() => {
      goToScreen("finale");
    }, 850);
    return;
  }

  window.setTimeout(() => {
    goToScreen("map");
  }, 850);
}

function renderAnswerField(question) {
  els.answerFields.innerHTML = "";

  if (question.type === "info") {
    els.answerLabel.textContent = "Continue when ready";
    const note = document.createElement("div");
    note.className = "answer-note";
    note.textContent = "This clue sets up the following questions. Click Next to continue.";
    els.answerFields.appendChild(note);
    return;
  }

  if (question.type === "multi-dropdown") {
    els.answerLabel.textContent = "Complete the full table";
    const groups = buildMultiDropdownGroups(question.fields);
    const columnKeys = getMultiDropdownColumnKeys(groups);
    const wrap = document.createElement("div");
    wrap.className = "table-answer-wrap";

    const table = document.createElement("table");
    table.className = "answer-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Pin</th>";
    columnKeys.forEach((key) => {
      const th = document.createElement("th");
      th.textContent = formatColumnLabel(key);
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    groups.forEach((group) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${escapeHtml(group.pin)}</td>`;

      columnKeys.forEach((key) => {
        const td = document.createElement("td");
        const field = group.columns[key];
        if (!field) {
          tr.appendChild(td);
          return;
        }
        const select = document.createElement("select");
        select.name = `multi-${field.index}`;
        select.className = "dropdown-field";
        select.innerHTML = `<option value="">Select</option>${shuffleArray(field.options)
          .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
          .join("")}`;
        td.appendChild(select);
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    els.answerFields.appendChild(wrap);

    if (!question.disableTextField) {
      const textWrap = document.createElement("div");
      textWrap.className = "matching-row";
      const title = document.createElement("strong");
      title.textContent = question.textFieldLabel || "Enter the final clue";
      const input = document.createElement("input");
      input.className = "text-field";
      input.id = "dynamicAnswerInput";
      input.name = "multi-text-answer";
      input.type = "text";
      input.autocomplete = "off";
      textWrap.appendChild(title);
      textWrap.appendChild(input);
      els.answerFields.appendChild(textWrap);
    }
    return;
  }

  if (question.type === "multi-dropdown-grid") {
    els.answerLabel.textContent = "Complete the full table";
    appendQuestionImage(question);

    const fieldMap = new Map(question.fields.map((field) => [field.id, field]));
    const wrap = document.createElement("div");
    wrap.className = "table-answer-wrap";

    const table = document.createElement("table");
    table.className = "answer-table answer-table-wide";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    question.columns.forEach((column) => {
      const th = document.createElement("th");
      th.textContent = column;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    question.rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((cell) => {
        const td = document.createElement("td");
        if (cell && typeof cell === "object" && cell.fieldId) {
          const field = fieldMap.get(cell.fieldId);
          const select = document.createElement("select");
          select.name = `grid-${field.id}`;
          select.className = "dropdown-field";
          select.setAttribute("aria-label", field.label);
          select.innerHTML = `<option value="">Select</option>${shuffleArray(field.options)
            .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
            .join("")}`;
          td.appendChild(select);
        } else {
          td.textContent = String(cell || "");
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    els.answerFields.appendChild(wrap);
    return;
  }

  if (question.type === "mcq") {
    els.answerLabel.textContent = "Select one answer";
    const wrapper = document.createElement("div");
    wrapper.className = "choice-list";
    shuffleArray(question.options).forEach((option) => {
      const label = document.createElement("label");
      label.className = "choice-item";
      label.innerHTML = `
        <input type="radio" name="dynamic-answer" value="${escapeHtml(option)}" />
        <span>${escapeHtml(option)}</span>
      `;
      wrapper.appendChild(label);
    });
    els.answerFields.appendChild(wrapper);
    return;
  }

  if (question.type === "dropdown") {
    els.answerLabel.textContent = "Choose the correct option";
    const select = document.createElement("select");
    select.className = "dropdown-field";
    select.name = "dynamic-answer";
    select.id = "dynamicAnswerInput";
    select.innerHTML = `<option value="">Select an option</option>${shuffleArray(question.options)
      .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
      .join("")}`;
    els.answerFields.appendChild(select);
    return;
  }

  if (question.type === "matching") {
    els.answerLabel.textContent = "Complete each match";
    const wrapper = document.createElement("div");
    wrapper.className = "matching-list";
    const options = shuffleArray(question.pairs.map((pair) => pair.right));
    question.pairs.forEach((pair, index) => {
      const row = document.createElement("div");
      row.className = "matching-row";
      const title = document.createElement("strong");
      title.textContent = pair.left;
      const select = document.createElement("select");
      select.name = `matching-${index}`;
      select.innerHTML = `<option value="">Select a match</option>${options
        .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
        .join("")}`;
      row.appendChild(title);
      row.appendChild(select);
      wrapper.appendChild(row);
    });
    els.answerFields.appendChild(wrapper);
    return;
  }

  els.answerLabel.textContent = "Enter your answer";
  const input = document.createElement("input");
  input.className = "text-field";
  input.id = "dynamicAnswerInput";
  input.name = "dynamic-answer";
  input.type = "text";
  input.autocomplete = "off";
  els.answerFields.appendChild(input);
}

function validateQuestionAnswer(question) {
  if (question.type === "info") {
    return true;
  }

  if (question.type === "matching") {
    return question.pairs.every((pair, index) => {
      const value = document.querySelector(`[name="matching-${index}"]`)?.value || "";
      return normalizeAnswer(value) === normalizeAnswer(pair.right);
    });
  }

  if (question.type === "multi-dropdown") {
    const dropdownsCorrect = question.fields.every((field, index) => {
      const value = document.querySelector(`[name="multi-${index}"]`)?.value || "";
      return normalizeAnswer(value) === normalizeAnswer(field.answer);
    });
    if (question.disableTextField) {
      return dropdownsCorrect;
    }
    const textValue = document.querySelector('[name="multi-text-answer"]')?.value || "";
    const acceptedText = String(question.textAnswer || "")
      .split("|")
      .map((entry) => normalizeAnswer(entry));
    return dropdownsCorrect && acceptedText.includes(normalizeAnswer(textValue));
  }

  if (question.type === "multi-dropdown-grid") {
    return question.fields.every((field) => {
      const value = document.querySelector(`[name="grid-${field.id}"]`)?.value || "";
      return normalizeAnswer(value) === normalizeAnswer(field.answer);
    });
  }

  const rawValue =
    document.querySelector('[name="dynamic-answer"]:checked')?.value ||
    document.querySelector('[name="dynamic-answer"]')?.value ||
    "";

  if (question.type === "text") {
    const accepted = String(question.answer)
      .split("|")
      .map((entry) => normalizeAnswer(entry));
    return accepted.includes(normalizeAnswer(rawValue));
  }

  return normalizeAnswer(rawValue) === normalizeAnswer(question.answer);
}

function appendQuestionImage(question) {
  if (!question.image) {
    return;
  }

  const image = document.createElement("img");
  image.className = "question-inline-image";
  image.src = question.image;
  image.alt = "Question reference diagram";
  els.answerFields.appendChild(image);
}

function buildMultiDropdownGroups(fields) {
  const groups = {};

  fields.forEach((field, index) => {
    const match = field.label.match(/^Pin\s+([A-Z])\s+(.+)$/i);
    if (!match) {
      return;
    }

    const pin = match[1].toUpperCase();
    const column = match[2].toLowerCase();

    if (!groups[pin]) {
      groups[pin] = { pin, columns: {} };
    }

    groups[pin].columns[column] = {
      index,
      options: field.options,
    };
  });

  return Object.values(groups).sort((a, b) => a.pin.localeCompare(b.pin));
}

function getMultiDropdownColumnKeys(groups) {
  const keys = [];
  groups.forEach((group) => {
    Object.keys(group.columns).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
  });
  return keys;
}

function formatColumnLabel(key) {
  return key
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startTimer() {
  if (timerInterval) {
    window.clearInterval(timerInterval);
  }
  updateTimerDisplays();
  timerInterval = window.setInterval(() => {
    updateTimerDisplays();
  }, 1000);
}

function updateTimerDisplays() {
  const remainingMs = Math.max(0, state.endTimeMs - Date.now());
  const totalSeconds = Math.floor(remainingMs / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const display = `${minutes}:${seconds}`;

  if (els.hudTimer) {
    els.hudTimer.textContent = display;
  }
  if (els.roomTimer) {
    els.roomTimer.textContent = display;
  }

  if (remainingMs <= 0 && timerInterval) {
    window.clearInterval(timerInterval);
    timerInterval = null;
    els.hudStatus.textContent = "Time is up.";
  }
}

function updateLifeMeters() {
  const pct = Math.max(0, Math.min(100, (state.life / START_LIFE) * 100));
  const color =
    pct <= 25 ? "linear-gradient(90deg, #a63a3a, #ea8b8b)" :
    pct <= 50 ? "linear-gradient(90deg, #b87c29, #e1b45f)" :
    "linear-gradient(90deg, #3aa55d, #7ee08b)";

  if (els.hudLifeFill) {
    els.hudLifeFill.style.width = `${pct}%`;
    els.hudLifeFill.style.background = color;
  }
  if (els.roomLifeFill) {
    els.roomLifeFill.style.width = `${pct}%`;
    els.roomLifeFill.style.background = color;
  }
}

function renderDebugPanel(room) {
  if (!els.debugPanel || !els.roomStage) {
    return;
  }

  if (!DEBUG_MODE || !room) {
    els.debugPanel.hidden = true;
    els.roomStage.classList.remove("debug-enabled");
    return;
  }

  els.debugPanel.hidden = false;
  els.roomStage.classList.add("debug-enabled");
  els.debugRoomName.textContent = room.name;
  updateDebugReadout(room);
}

function renderMapDebugPanel() {
  if (!els.mapDebugPanel || !els.cityMap) {
    return;
  }

  if (!DEBUG_MODE) {
    els.mapDebugPanel.hidden = true;
    els.cityMap.classList.remove("debug-enabled");
    return;
  }

  els.mapDebugPanel.hidden = false;
  els.cityMap.classList.add("debug-enabled");
  updateMapDebugReadout();
}

function handleMapDebugClick(event) {
  if (!DEBUG_MODE || !els.cityMap || !els.mapImage) {
    return;
  }

  if (event.target.closest(".map-hotspot")) {
    return;
  }

  const targetId = els.mapDebugTarget?.value || "warehouse";
  const hotspot = mapButtons.find((button) => button.dataset.roomId === targetId);
  if (!hotspot) {
    return;
  }

  const rect = els.mapImage.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
  const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
  const xPercent = `${((x / rect.width) * 100).toFixed(1)}%`;
  const yPercent = `${((y / rect.height) * 100).toFixed(1)}%`;

  hotspot.style.setProperty("--x", xPercent);
  hotspot.style.setProperty("--y", yPercent);
  updateMapDebugReadout(rect.width, rect.height);
}

function updateMapDebugReadout(widthOverride, heightOverride) {
  if (!els.mapDebugCoords || !els.mapDebugPercents || !els.mapDebugTarget || !els.mapImage) {
    return;
  }

  const hotspot = mapButtons.find((button) => button.dataset.roomId === els.mapDebugTarget.value);
  if (!hotspot) {
    return;
  }

  const xPercent = hotspot.style.getPropertyValue("--x") || "0%";
  const yPercent = hotspot.style.getPropertyValue("--y") || "0%";
  const imageWidth = widthOverride || els.mapImage.clientWidth || 1280;
  const imageHeight = heightOverride || els.mapImage.clientHeight || 1280;
  const xPx = Math.round((parseFloat(xPercent) / 100) * imageWidth);
  const yPx = Math.round((parseFloat(yPercent) / 100) * imageHeight);

  els.mapDebugCoords.textContent = `x: ${xPx}, y: ${yPx}`;
  els.mapDebugPercents.textContent = `x: ${xPercent}, y: ${yPercent}`;
}

function handleDebugStageClick(event) {
  if (!DEBUG_MODE || !els.roomSceneImage) {
    return;
  }

  const room = getRoomById(state.activeRoomId);
  if (!room) {
    return;
  }

  const rect = els.roomSceneImage.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
  const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

  room.avatarX = `${((x / rect.width) * 100).toFixed(1)}%`;
  room.avatarY = `${((y / rect.height) * 100).toFixed(1)}%`;
  els.roomAvatar.style.setProperty("--avatar-x", room.avatarX);
  els.roomAvatar.style.setProperty("--avatar-y", room.avatarY);
  updateDebugReadout(room, rect.width, rect.height);
}

function updateDebugReadout(room, widthOverride, heightOverride) {
  const imageWidth = widthOverride || els.roomSceneImage?.clientWidth || 1920;
  const imageHeight = heightOverride || els.roomSceneImage?.clientHeight || 1080;
  const xPercent = parseFloat(room.avatarX);
  const yPercent = parseFloat(room.avatarY);
  const xPx = Math.round((xPercent / 100) * imageWidth);
  const yPx = Math.round((yPercent / 100) * imageHeight);

  if (els.debugCoords) {
    els.debugCoords.textContent = `x: ${xPx}, y: ${yPx}`;
  }
  if (els.debugPercents) {
    els.debugPercents.textContent = `x: ${room.avatarX}, y: ${room.avatarY}`;
  }
}

function goToScreen(screenName) {
  state.screen = screenName;
  if (screenName !== "room") {
    state.activeRoomId = "";
  }
  saveState();
  renderAll();
  if (screenName === "finale") {
    launchFinaleConfetti();
  } else if (typeof finaleConfettiCleanup === "function") {
    finaleConfettiCleanup();
  }
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  hydrateState();
  clearSetupError();
  renderAll();
  startTimer();
  loadAvatarOptions().then(renderAll).catch((error) => {
    console.warn("Unable to reload avatars after reset.", error);
  });
}

function getPlayableRooms() {
  return ROOM_DATA;
}

function getRoomById(roomId) {
  return ROOM_DATA.find((room) => room.id === roomId);
}

function isRoomBlocked(room) {
  if (!room) {
    return true;
  }
  if (!room.unlockAfterAll) {
    return !!room.blocked;
  }
  const needed = ROOM_DATA.filter((entry) => !entry.unlockAfterAll).length;
  return state.solvedRoomIds.filter((id) => id !== room.id).length < needed;
}

function getSelectedTeam() {
  const teamName = String(state.session.teamName || state.selectedTeam || "").trim();
  const avatarUrl = String(state.session.avatarUrl || state.selectedAvatarUrl || "").trim();
  if (!teamName) {
    return null;
  }
  return {
    TeamName: teamName,
    AvatarUrl: avatarUrl,
    TeamCode: String(state.session.teamCode || "").trim(),
  };
}

function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s+]/g, "")
    .replace(/\s+/g, " ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
