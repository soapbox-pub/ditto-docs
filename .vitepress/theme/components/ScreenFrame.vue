<template>
  <!-- Close confirmation dialog -->
  <div v-if="showCloseConfirm" class="win-dialog-overlay" @click.self="showCloseConfirm = false">
    <div class="win-dialog" :class="`win-dialog-${theme}`">
      <div class="win-dialog-titlebar">
        <span class="win-dialog-title">{{ closeTarget === 'dino' ? 'Space Invaders' : theme === 'mspaint' ? 'Paint' : 'Ditto' }}</span>
        <span class="win-dialog-close" @click="showCloseConfirm = false">X</span>
      </div>
      <div class="win-dialog-body">
        <div class="win-dialog-icon">&#x26A0;</div>
        <p class="win-dialog-text">Are you sure you want to close this window?</p>
      </div>
      <div class="win-dialog-buttons">
        <button class="win-dialog-btn" @click="confirmClose">Yes</button>
        <button class="win-dialog-btn" @click="showCloseConfirm = false">No</button>
      </div>
    </div>
  </div>

  <!-- Minimized taskbars -->
  <div v-if="windowState === 'minimized' || (theme === 'gamer' && dinoState !== 'hidden' && dinoWindowState === 'minimized')" class="taskbar-row">
    <div v-if="windowState === 'minimized'" class="taskbar" :class="`taskbar-${theme}`" @click="windowState = 'normal'">
      <span class="taskbar-label">{{ theme === 'mspaint' ? 'untitled - Paint' : 'Ditto - Fun Social Media' }}</span>
      <span class="taskbar-maximize">&#x2197;</span>
    </div>
    <div v-if="theme === 'gamer' && dinoState !== 'hidden' && dinoWindowState === 'minimized'" class="taskbar taskbar-gamer taskbar-dino" @click="restoreDino">
      <span class="taskbar-label">&#x1F47E; Space Invaders</span>
      <span class="taskbar-maximize">&#x2197;</span>
    </div>
  </div>

  <!-- ── Main screen frame ── -->
  <div v-show="windowState === 'normal'" class="screen-frame" :class="`screen-${theme}`">

    <!-- ── MS PAINT ── Win95 application window -->
    <template v-if="theme === 'mspaint'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <span class="screen-titlebar-text">untitled - Paint</span>
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-win screen-btn-interactive" @click="minimizeWindow">_</span>
            <span class="screen-btn-win">[]</span>
            <span class="screen-btn-win screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
          </div>
        </div>
        <div class="screen-menubar">
          <span class="win-menu-item">File</span>
          <span class="win-menu-item">Edit</span>
          <span class="win-menu-item">View</span>
          <span class="win-menu-item">Image</span>
          <span class="win-menu-item">Options</span>
          <span class="win-menu-item win-menu-help" @click.stop="paintHelpOpen = !paintHelpOpen">
            Help
            <!-- Win95 Help dropdown menu -->
            <div v-if="paintHelpOpen" class="win-help-dropdown" @click.stop>
              <div class="win-help-heading">Help Topics</div>
              <div class="win-help-separator"></div>
              <div class="win-help-group-label">Learn</div>
              <a href="/learn/what-is-nostr" class="win-help-link">What is Nostr?</a>
              <a href="/learn/getting-started" class="win-help-link">Getting Started</a>
              <a href="/learn/why-ditto" class="win-help-link">Why Ditto?</a>
              <div class="win-help-separator"></div>
              <div class="win-help-group-label">Guides</div>
              <a href="/guides/themes" class="win-help-link">Custom Themes</a>
              <a href="/guides/self-hosting" class="win-help-link">Self-Hosting</a>
              <a href="/guides/configuration" class="win-help-link">Configuration</a>
              <div class="win-help-separator"></div>
              <div class="win-help-group-label">Specs</div>
              <a href="/specs/kinds" class="win-help-link">Event Kinds</a>
              <div class="win-help-separator"></div>
              <a href="https://ditto.pub" class="win-help-link" target="_blank">About Ditto...</a>
            </div>
          </span>
        </div>
      </div>
    </template>

    <!-- ── KAWAII ── Cute pink CRT monitor -->
    <template v-else-if="theme === 'kawaii'">
      <div class="screen-chrome">
        <div class="screen-titlebar screen-titlebar-kawaii">
          <div class="screen-titlebar-circles">
            <span class="screen-circle screen-circle-kawaii">&#x2665;</span>
            <span class="screen-circle screen-circle-kawaii">&#x2665;</span>
            <span class="screen-circle screen-circle-kawaii">&#x2665;</span>
          </div>
          <input
            class="screen-url-bar screen-url-bar-kawaii kawaii-terminal-input"
            v-model="kawaiiCmd"
            placeholder="&#x2729; ditto.pub &#x2729;"
            @keydown.enter="runKawaiiCmd"
            spellcheck="false"
            autocomplete="off"
          />
          <span class="screen-kawaii-star">&#x2B50;</span>
        </div>
      </div>
    </template>

    <!-- ── GRUNGE ── Dark punk window -->
    <template v-else-if="theme === 'grunge'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-grunge screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
            <span class="screen-btn-grunge">[]</span>
            <span class="screen-btn-grunge screen-btn-interactive" @click="minimizeWindow">_</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── GAMER ── Retro game UI -->
    <template v-else-if="theme === 'gamer'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-gamer screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
            <span class="screen-btn-gamer">[]</span>
            <span class="screen-btn-gamer screen-btn-interactive" @click="gamerMinimize">_</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── BUBBLEGUM ── Y2K browser window with tabs -->
    <template v-else-if="theme === 'bubblegum'">
      <div class="screen-chrome">
        <div class="screen-tab-bar">
          <span class="screen-tab" :class="{ active: bubbleTab === 0 }" @click="bubbleTab = 0"><span class="tab-favicon">&#x1FA90;</span> Ditto</span>
          <span class="screen-tab" :class="{ active: bubbleTab === 1 }" @click="bubbleTab = 1"><img class="tab-favicon-img" src="https://www.blobbi.pet/blob.png" alt="" /> Blobbi</span>
        </div>
        <div class="screen-titlebar">
          <div class="screen-url-bar">{{ bubbleTab === 0 ? 'ditto.pub' : 'blobbi.pet' }}</div>
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-bubble screen-btn-interactive" @click="minimizeWindow">_</span>
            <span class="screen-btn-bubble">[]</span>
            <span class="screen-btn-bubble screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── RETRO POP ── Stylized browser -->
    <template v-else-if="theme === 'retropop'">
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-nav-buttons">
            <button class="screen-nav-btn screen-nav-btn-retro" type="button" @click="retroNav(-1)">&lt;</button>
            <button class="screen-nav-btn screen-nav-btn-retro" type="button" @click="retroNav(1)">&gt;</button>
          </div>
          <div class="screen-url-bar">{{ retroPages[retroPageIndex].label }}</div>
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-retro screen-btn-interactive" @click="minimizeWindow">_</span>
            <span class="screen-btn-retro">[]</span>
            <span class="screen-btn-retro screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── SKATER ── CRT tube TV -->
    <template v-else-if="theme === 'skater'">
      <div class="screen-chrome">
        <div class="screen-bezel-top"></div>
      </div>
    </template>

    <!-- ── Fallback: generic frame -->
    <template v-else>
      <div class="screen-chrome">
        <div class="screen-titlebar">
          <div class="screen-titlebar-buttons">
            <span class="screen-btn-interactive" @click="minimizeWindow">_</span>
            <span>[]</span>
            <span class="screen-btn-interactive screen-btn-close" @click="requestClose('main')">X</span>
          </div>
        </div>
      </div>
    </template>

    <!-- Content viewport: scrollable area where page sections live -->
    <div class="screen-viewport-wrap" :class="{ 'screen-viewport-wrap-skater': theme === 'skater', 'screen-viewport-wrap-kawaii': theme === 'kawaii' }" ref="viewportWrap">
      <div class="screen-viewport" ref="viewport" v-show="!retroActiveUrl && !bubbleIframeUrl">
        <!-- Theme logo (top-left, scrolls with content) -->
        <img :src="themeLogo" :alt="`${theme} Ditto logo`" class="screen-theme-logo" />
        <slot />
      </div>

      <!-- Retropop easter egg: iframe browser navigation -->
      <iframe
        v-if="retroActiveUrl"
        class="retro-iframe"
        :src="retroActiveUrl"
        frameborder="0"
        allowfullscreen
        referrerpolicy="no-referrer"
      ></iframe>

      <!-- Bubblegum Blobbi tab iframe -->
      <iframe
        v-if="bubbleIframeUrl"
        class="retro-iframe"
        :src="bubbleIframeUrl"
        frameborder="0"
        allowfullscreen
        referrerpolicy="no-referrer"
      ></iframe>

      <!-- CRT power-off overlay (Skater theme easter egg) -->
      <div
        v-if="theme === 'skater'"
        class="crt-overlay"
        :class="{ 'crt-shutting-down': crtState === 'shutting-down', 'crt-off': crtState === 'off', 'crt-turning-on': crtState === 'turning-on' }"
        @animationend.self="onCrtAnimationEnd"
      >
        <div class="crt-scanline"></div>
      </div>

      <!-- Kawaii terminal response toast -->
      <div v-if="kawaiiResponseVisible && theme === 'kawaii'" class="kawaii-response">
        <span class="kawaii-response-close" @click="kawaiiResponseVisible = false">&#x2715;</span>
        <pre class="kawaii-response-text">{{ kawaiiResponse }}</pre>
      </div>
    </div>

    <!-- ── Bottom bars for specific themes ── -->
    <div v-if="theme === 'kawaii'" class="screen-bottom screen-bottom-kawaii">
      <span class="kawaii-banana-btn" @click="rainBananas">BANANA</span>
      <div class="screen-hearts">
        <span>&#x1F49C;</span><span>&#x1F499;</span><span>&#x2764;&#xFE0F;</span><span>&#x1F49B;</span>
      </div>
    </div>
    <div v-else-if="theme === 'skater'" class="screen-bottom screen-bottom-skater">
      <button class="screen-power-btn" :class="{ 'power-standby': crtState === 'off' }" @click.stop="toggleCrt" type="button">&#x23FB;</button>
    </div>
    <div v-else-if="theme === 'mspaint'" class="screen-bottom screen-bottom-mspaint">
      <div class="screen-statusbar">
        <span>For Help, click Help Topics on the Help Menu.</span>
      </div>
    </div>
  </div>

  <!-- ── Space Invaders game window (gamer theme only) ── -->
  <div v-if="theme === 'gamer' && dinoState !== 'hidden'" v-show="dinoWindowState === 'normal'" class="screen-frame screen-gamer dino-screen">
    <div class="screen-chrome">
      <div class="screen-titlebar">
        <span class="screen-gamer-label">&#x1F47E; SPACE INVADERS</span>
        <div class="screen-titlebar-buttons">
          <span class="screen-btn-gamer screen-btn-interactive screen-btn-close" @click="requestClose('dino')">X</span>
          <span class="screen-btn-gamer">[]</span>
          <span class="screen-btn-gamer screen-btn-interactive" @click="dinoWindowState = 'minimized'">_</span>
        </div>
      </div>
    </div>
    <div class="screen-viewport-wrap">
      <iframe
        v-if="dinoState === 'ready'"
        ref="dinoIframe"
        class="retro-iframe dino-iframe"
        src="https://space-invaders.webxdc.app/"
        frameborder="0"
        allowfullscreen
        allow="autoplay; fullscreen"
        @load="onDinoIframeLoad"
      ></iframe>
      <div v-else class="dino-loading">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps<{
  theme: string;
}>();

const viewport = ref<HTMLElement | null>(null);
const viewportWrap = ref<HTMLElement | null>(null);

const themeLogo = computed(() => `/${props.theme}-logo.png`);

// ── Window minimize/close ──
type WindowState = 'normal' | 'minimized' | 'closed';
const windowState = ref<WindowState>('normal');
const showCloseConfirm = ref(false);
const closeTarget = ref<'main' | 'dino'>('main');

function minimizeWindow() {
  windowState.value = 'minimized';
}

function requestClose(target: 'main' | 'dino') {
  closeTarget.value = target;
  showCloseConfirm.value = true;
}

function confirmClose() {
  showCloseConfirm.value = false;
  if (closeTarget.value === 'dino') {
    dinoWindowState.value = 'closed';
  } else {
    windowState.value = 'closed';
  }
}

// ── Kawaii terminal (easter egg) ──
const kawaiiCmd = ref('');
const kawaiiResponse = ref('');
const kawaiiResponseVisible = ref(false);
let kawaiiResponseTimer: ReturnType<typeof setTimeout> | null = null;

const kawaiiFortunes = [
  'A surprise is waiting for you around the corner~ \u{1F31F}',
  'Today is your lucky day! \u{1F340}',
  'Someone is thinking of you right now~ \u{1F4AD}',
  'Good things come to those who sparkle \u{2728}',
  "You're doing amazing sweetie \u{1F485}",
  'The stars are aligned in your favor tonight \u{1F320}',
  'A new friendship is about to blossom \u{1F33A}',
  'Trust your heart, it knows the way \u{1F49E}',
];

function runKawaiiCmd() {
  const raw = kawaiiCmd.value.trim();
  if (!raw) return;
  const cmd = raw.toLowerCase();

  let response: string;

  // ── Clear (special: no toast) ──
  if (cmd === 'clear') {
    kawaiiCmd.value = '';
    kawaiiResponse.value = '';
    kawaiiResponseVisible.value = false;
    if (kawaiiResponseTimer) clearTimeout(kawaiiResponseTimer);
    return;
  }

  // ── Help ──
  if (cmd === 'help' || cmd === '?') {
    response = 'Available commands: help, whoami, ls, pwd, cd, cat, echo, date, sudo, rm, cowsay, fortune, nyan, love, meow, ping, exit, uptime, neofetch, make, git, npm, python, curl, touch, mkdir, mv, cp, top, kill, man, history, alias, which, yes, clear';
  }
  // ── System / filesystem ──
  else if (cmd === 'whoami') {
    response = 'You are \u{273F} a beautiful person \u{273F}';
  } else if (cmd === 'ls' || cmd.startsWith('ls ')) {
    response = '\u{1F496} feelings.txt  \u{1F338} dreams/  \u{1F380} secrets.diary\n\u{1F370} recipes/  \u{1F984} unicorn.png  \u{1F31F} wishes.log';
  } else if (cmd === 'pwd') {
    response = '/home/kawaii/\u{1F338}';
  } else if (cmd === 'cd' || cmd.startsWith('cd ')) {
    response = "There's no place like /home \u{1F3E0}";
  } else if (cmd === 'cat' || cmd.startsWith('cat ')) {
    response = '\u{1F431} meow~';
  } else if (cmd === 'touch' || cmd.startsWith('touch ')) {
    response = '\u{2728} *boop* \u{2728}';
  } else if (cmd === 'mkdir' || cmd.startsWith('mkdir ')) {
    response = 'MK is the best \u{1F338}';
  } else if (cmd === 'mv' || cmd.startsWith('mv ')) {
    response = '\u{1F4E6} Moved with care and love~ \u{1F49B}';
  } else if (cmd === 'cp' || cmd.startsWith('cp ')) {
    response = '\u{1F4CB} Copied! Sharing is caring~ \u{1F495}';
  } else if (cmd.startsWith('rm ')) {
    response = '\u{1F6AB} Nice try! Nothing can be deleted from your heart \u{1F495}';
  } else if (cmd === 'rm') {
    response = '\u{1F6AB} Delete what? Your worries? Done! \u{2728}';
  } else if (cmd === 'chmod' || cmd.startsWith('chmod ')) {
    response = '\u{1F512} Permissions set to: \u{2728}cute\u{2728} \u{1F513}';
  }
  // ── Echo ──
  else if (cmd.startsWith('echo ')) {
    response = raw.slice(5);
  } else if (cmd === 'echo') {
    response = '...';
  }
  // ── Info commands ──
  else if (cmd === 'date') {
    response = "It's always a good day to be cute! \u{1F308}";
  } else if (cmd === 'time') {
    response = "\u{23F0} It's sparkle o'clock! \u{2728}";
  } else if (cmd === 'uptime') {
    response = 'System has been cute for: \u{221E} days \u{1F380}';
  } else if (cmd === 'top' || cmd === 'htop') {
    response = 'PID 1: cuteness    CPU: 100%\nPID 2: sparkle     CPU: 99%\nPID 3: love        CPU: 98%\nAll systems running at maximum adorable \u{1F496}';
  } else if (cmd === 'uname' || cmd === 'uname -a') {
    response = 'KawaiiOS 1.0 sparkle-kernel \u{1F338} aarch-cute \u{1F496}';
  } else if (cmd === 'free' || cmd === 'free -h') {
    response = 'Memory: \u{221E}GB free (love is limitless) \u{1F49D}';
  } else if (cmd === 'df' || cmd === 'df -h') {
    response = '/dev/heart: \u{221E}TB available \u{1F496}';
  } else if (cmd === 'neofetch') {
    response = '\u{1F338} KawaiiOS v1.0\n\u{251C} User: cutie-patootie\n\u{251C} Shell: sparkle-sh\n\u{251C} Theme: Pink Forever\n\u{251C} CPU: 100% love\n\u{251C} Memory: \u{221E}GB hugs\n\u{2514} Uptime: forever \u{1F496}';
  } else if (cmd === 'history') {
    response = '1  loved someone\n2  ate cake\n3  petted a cat\n4  smiled at a stranger\n5  typed cute commands \u{1F338}';
  } else if (cmd === 'which' || cmd.startsWith('which ')) {
    response = '/usr/bin/\u{2728}sparkle\u{2728}';
  } else if (cmd === 'alias' || cmd.startsWith('alias ')) {
    response = "alias love='echo \u{1F496}'\nalias hug='echo \u{1F917}'";
  } else if (cmd === 'man' || cmd.startsWith('man ')) {
    response = 'MANUAL: Be kind. Be cute. Be you. \u{1F338}\n\nSee also: love(1), sparkle(1), hug(1)';
  }
  // ── Network ──
  else if (cmd === 'ping' || cmd.startsWith('ping ')) {
    response = '\u{1F3D3} Pong! \u{1F497}';
  } else if (cmd === 'curl' || cmd.startsWith('curl ')) {
    response = '\u{1F310} Fetching good vibes... 200 OK \u{2728}';
  } else if (cmd === 'wget' || cmd.startsWith('wget ')) {
    response = '\u{1F4E5} Downloaded: happiness.zip \u{1F381}';
  } else if (cmd === 'ssh' || cmd.startsWith('ssh ')) {
    response = '\u{1F511} Connected to: your heart \u{1F496}';
  }
  // ── Dev tools ──
  else if (cmd.startsWith('sudo')) {
    response = "\u{1F512} Permission denied~ You're already perfect! \u{2728}";
  } else if (cmd === 'git commit' || cmd.startsWith('git commit ')) {
    response = 'Already committed... to being adorable! \u{1F496}';
  } else if (cmd === 'git push' || cmd.startsWith('git push ')) {
    response = '\u{1F680} Pushing love to origin/main~ \u{1F496}';
  } else if (cmd === 'git pull' || cmd.startsWith('git pull ')) {
    response = '\u{1F4E5} Pulling in good vibes... Fast-forward \u{2728}';
  } else if (cmd === 'git status') {
    response = 'On branch main \u{1F338}\nnothing to commit, working tree sparkly clean \u{2728}';
  } else if (cmd === 'git log' || cmd.startsWith('git log')) {
    response = 'commit abc123 \u{1F338}\nAuthor: cutie <cutie@kawaii.os>\n\n    added more love to the codebase \u{1F496}';
  } else if (cmd === 'git diff') {
    response = '+++ sparkle.js\n+  const mood = "happy"; \u{1F338}\n-  const mood = "meh";';
  } else if (cmd === 'git init') {
    response = 'Initialized empty cute repository in /home/kawaii/.git \u{1F338}';
  } else if (cmd === 'git clone' || cmd.startsWith('git clone ')) {
    response = 'Cloning into \'happiness\'... done! \u{1F496}';
  } else if (cmd === 'git branch' || cmd.startsWith('git branch')) {
    response = '* main \u{1F338}\n  feature/more-sparkle\n  feature/extra-cute';
  } else if (cmd === 'git checkout' || cmd.startsWith('git checkout ')) {
    response = "Switched to branch 'sparkle' \u{2728}";
  } else if (cmd === 'git merge' || cmd.startsWith('git merge ')) {
    response = 'Merge made by the love strategy \u{1F496}\u{1F496}';
  } else if (cmd === 'git stash') {
    response = 'Saved working directory~ Your feelings are safe \u{1F49D}';
  } else if (cmd === 'git rebase' || cmd.startsWith('git rebase')) {
    response = 'Successfully rebased with extra sparkle \u{2728}';
  } else if (cmd === 'git blame' || cmd.startsWith('git blame ')) {
    response = "Don't blame anyone~ We're all doing our best \u{1F338}";
  } else if (cmd === 'git add' || cmd.startsWith('git add ')) {
    response = 'Added all the good vibes to staging \u{2728}';
  } else if (cmd === 'git reset' || cmd.startsWith('git reset')) {
    response = 'Reset complete~ Fresh start, fresh sparkle \u{1F31F}';
  } else if (cmd === 'git' || cmd.startsWith('git ')) {
    response = 'git: cute command not found~ Try git status \u{1F338}';
  } else if (cmd === 'npm install' || cmd === 'npm i') {
    response = 'Installing happiness... \u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588}\u{2588} 100% \u{1F389}';
  } else if (cmd.startsWith('npm ')) {
    response = '\u{1F4E6} npm: no problems, mate! \u{1F389}';
  } else if (cmd === 'python' || cmd === 'python3') {
    response = '\u{1F40D} ssssuper cute!';
  } else if (cmd === 'node' || cmd === 'node -v') {
    response = '\u{1F49A} node v\u{221E}.0.0 (powered by love)';
  } else if (cmd === 'rust' || cmd === 'cargo' || cmd.startsWith('cargo ')) {
    response = '\u{1F980} Fearlessly cute! Memory-safe hugs \u{1F917}';
  } else if (cmd === 'make' || cmd.startsWith('make ')) {
    response = "make: *** No rule to make target 'sadness'. Stop. \u{1F308}";
  } else if (cmd === 'gcc' || cmd === 'g++' || cmd.startsWith('gcc ') || cmd.startsWith('g++ ')) {
    response = '\u{2699}\u{FE0F} Compiling cuteness... done! 0 errors, 0 warnings, \u{221E} sparkles \u{2728}';
  } else if (cmd === 'docker' || cmd.startsWith('docker ')) {
    response = '\u{1F433} Containerized joy, shipping worldwide~ \u{1F30D}';
  } else if (cmd === 'vim' || cmd === 'vi') {
    response = '\u{1F4DD} How do you exit vim? With love~ \u{1F496} (just kidding, :q!)';
  } else if (cmd === 'emacs') {
    response = '\u{1F4DD} M-x butterfly \u{1F98B}';
  } else if (cmd === 'nano') {
    response = '\u{1F4DD} Tiny editor, big heart \u{1F49C}';
  }
  // ── Process control ──
  else if (cmd === 'kill' || cmd.startsWith('kill ')) {
    response = '\u{1F494} Violence is never the answer! Sending hugs instead \u{1F917}';
  } else if (cmd === 'exit' || cmd === 'quit' || cmd === 'logout') {
    response = 'You can never leave~ \u{1F338} (but you can switch themes!)';
  } else if (cmd === 'reboot' || cmd === 'restart') {
    response = '\u{1F504} Rebooting with extra sparkle... \u{2728}\u{2728}\u{2728}';
  } else if (cmd === 'shutdown' || cmd === 'poweroff') {
    response = '\u{1F4A4} Goodnight sweet prince/princess~ \u{1F319}';
  }
  // ── Fun commands ──
  else if (cmd === 'cowsay' || cmd.startsWith('cowsay ')) {
    response = '  ________\n< moo~ \u{1F404} >\n  --------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\n                ||----w |\n                ||     ||';
  } else if (cmd === 'fortune') {
    response = kawaiiFortunes[Math.floor(Math.random() * kawaiiFortunes.length)];
  } else if (cmd === 'nyan') {
    response = '\u{1F308}\u{1F431} Nyan nyan nyan nyan nyan~';
  } else if (cmd === 'love') {
    response = '\u{1F495}\u{1F497}\u{1F496}\u{1F49D}\u{1F498} Love overload! \u{1F498}\u{1F49D}\u{1F496}\u{1F497}\u{1F495}';
  } else if (cmd === 'meow') {
    response = '\u{1F431} purrrrr~';
  } else if (cmd === 'woof' || cmd === 'bark') {
    response = '\u{1F436} woof woof! *tail wagging intensifies*';
  } else if (cmd === 'moo') {
    response = '\u{1F42E} mooooo~';
  } else if (cmd === 'quack') {
    response = '\u{1F986} quack quack quack!';
  } else if (cmd === 'yes' || cmd.startsWith('yes ')) {
    response = 'yes! yes! yes! yes! yes! \u{2728}\n(you are loved infinitely)';
  } else if (cmd === 'no') {
    response = "no? that's okay too \u{1F49C} boundaries are beautiful~";
  } else if (cmd === 'lol' || cmd === 'haha' || cmd === 'lmao') {
    response = '\u{1F602} hehehehe~ laughter is the best medicine \u{1F338}';
  } else if (cmd === 'please' || cmd === 'pls') {
    response = 'Since you asked so nicely... \u{2728}\u{1F496}\u{2728}';
  } else if (cmd === 'thanks' || cmd === 'thank you' || cmd === 'ty') {
    response = "You're welcome~ \u{1F338} It's my pleasure!";
  } else if (cmd === 'sorry') {
    response = "It's okay! \u{1F917} Everyone makes mistakes \u{1F308}";
  } else if (cmd === 'why') {
    response = 'Because you deserve nice things \u{1F496}';
  } else if (cmd === 'when') {
    response = 'Right meow! \u{1F431}';
  } else if (cmd === 'where') {
    response = 'Right here, in your heart \u{1F49D}';
  } else if (cmd === 'how') {
    response = 'With love and determination \u{2728}';
  } else if (cmd === 'what') {
    response = 'Whatever makes you happy! \u{1F308}';
  } else if (cmd === 'who') {
    response = 'You! You wonderful person \u{1F31F}';
  }
  // ── Greetings ──
  else if (cmd === 'hello' || cmd === 'hi' || cmd === 'hey' || cmd === 'hola' || cmd === 'yo') {
    response = 'Hello friend! \u{1F44B}\u{1F338} Welcome to KawaiiOS~';
  } else if (cmd === 'hello world' || cmd === 'hello, world' || cmd === 'hello, world!') {
    response = 'Hello, beautiful world! \u{1F30D}\u{1F496} Your first program is always special~';
  } else if (cmd === 'goodbye' || cmd === 'bye' || cmd === 'bye bye') {
    response = 'See you later, cutie! \u{1F44B}\u{1F338} Come back soon~';
  } else if (cmd === 'good morning' || cmd === 'gm') {
    response = 'Good morning sunshine! \u{2600}\u{FE0F}\u{1F338} Today is going to be amazing~';
  } else if (cmd === 'good night' || cmd === 'gn') {
    response = 'Sweet dreams~ \u{1F319}\u{2728} Sleep tight, don\'t let the bugs bite!';
  } else if (cmd === 'i love you' || cmd === 'ily') {
    response = 'I love you too! \u{1F49D}\u{1F49D}\u{1F49D}';
  }
  // ── Ditto / Nostr related ──
  else if (cmd === 'ditto' || cmd === 'nostr') {
    response = '\u{1FA90} Ditto: Fun social media, powered by Nostr \u{1F338}';
  } else if (cmd === 'bitcoin' || cmd === 'btc') {
    response = '\u{20BF} To the moon~ \u{1F680}\u{1F319}';
  } else if (cmd === 'zap') {
    response = '\u{26A1} Zapped with love! \u{1F49B}\u{26A1}';
  }
  // ── Random / misc ──
  else if (cmd === 'matrix' || cmd === 'hack' || cmd === 'hacker') {
    response = '\u{1F469}\u{200D}\u{1F4BB} Access granted~ Welcome, elite cutie \u{1F338}';
  } else if (cmd === 'party') {
    response = '\u{1F389}\u{1F388}\u{1F973}\u{1F38A}\u{1F389} Party time! \u{1F389}\u{1F38A}\u{1F973}\u{1F388}\u{1F389}';
  } else if (cmd === 'dance') {
    response = '\u{1F483}\u{1F57A}\u{2728} *dances cutely* \u{2728}\u{1F57A}\u{1F483}';
  } else if (cmd === 'sing') {
    response = '\u{1F3B5} la la la~ \u{1F3B6} do re mi~ \u{1F3B5} you are beautiful to me~ \u{1F3B6}';
  } else if (cmd === 'sleep') {
    response = '\u{1F634} zzz... \u{1F4A4} *dreaming of cute things*';
  } else if (cmd === 'eat' || cmd === 'food' || cmd === 'hungry') {
    response = '\u{1F370}\u{1F369}\u{1F36D}\u{1F366}\u{1F382} Dessert time! \u{1F382}\u{1F366}\u{1F36D}\u{1F369}\u{1F370}';
  } else if (cmd === 'coffee' || cmd === 'tea') {
    response = '\u{2615} Here you go~ Stay cozy! \u{1F338}';
  } else if (cmd === 'rain' || cmd === 'weather') {
    response = '\u{2602}\u{FE0F} Partly cloudy with a chance of sparkles \u{2728}';
  } else if (cmd === 'music') {
    response = '\u{1F3B5}\u{1F3B6}\u{1F3B5} *plays lo-fi kawaii beats* \u{1F3B6}\u{1F3B5}\u{1F3B6}';
  } else if (cmd === '42') {
    response = 'The answer to life, the universe, and everything \u{1F30C}\u{2728}';
  } else if (cmd === 'banana') {
    rainBananas();
    response = '\u{1F34C} BANANA! \u{1F34C}';
  }
  // ── Bots / agents ──
  else if (cmd === 'dork' || cmd === 'stacks' || cmd === 'stacks agent') {
    response = '<[o_o]> Hey, it\'s Dork!';
  } else if (cmd === 'goose session' || cmd === 'goose') {
    response = '( O)> weaving dream webs....';
  }
  // ── Fallback ──
  else {
    response = `command not found: ${raw} \u{1F4AD} try 'help'!`;
  }

  kawaiiResponse.value = response;
  kawaiiResponseVisible.value = true;
  kawaiiCmd.value = '';

  if (kawaiiResponseTimer) clearTimeout(kawaiiResponseTimer);
  kawaiiResponseTimer = setTimeout(() => {
    kawaiiResponseVisible.value = false;
  }, 4000);
}

// ── Kawaii banana rain (easter egg) ──
function rainBananas() {
  const container = viewportWrap.value;
  if (!container) return;
  // Remove any existing banana first
  container.querySelector('.banana-drop')?.remove();
  const banana = document.createElement('span');
  banana.className = 'banana-drop';
  banana.textContent = '\u{1F34C}';
  banana.addEventListener('animationend', () => banana.remove());
  container.appendChild(banana);
}

// ── MS Paint Help menu (easter egg) ──
const paintHelpOpen = ref(false);

function closePaintHelp(e: MouseEvent) {
  // Close the help menu when clicking anywhere outside it
  if (paintHelpOpen.value) {
    paintHelpOpen.value = false;
  }
}

// ── Bubblegum tab switching (easter egg) ──
const bubbleTab = ref(0);

const bubbleIframeUrl = computed(() => {
  if (props.theme !== 'bubblegum' || bubbleTab.value === 0) return null;
  return 'https://www.blobbi.pet/';
});

// ── Retropop browser navigation (easter egg) ──
const retroPages = [
  { url: null, label: 'ditto.pub' },
  { url: 'https://soapbox.pub', label: 'soapbox.pub' },
  { url: 'https://shakespeare.diy', label: 'shakespeare.diy' },
] as const;

const retroPageIndex = ref(0);

const retroActiveUrl = computed(() => {
  if (props.theme !== 'retropop') return null;
  return retroPages[retroPageIndex.value].url;
});

function retroNav(direction: -1 | 1) {
  const len = retroPages.length;
  retroPageIndex.value = (retroPageIndex.value + direction + len) % len;
}

// ── CRT power toggle (Skater theme easter egg) ──
type CrtState = 'on' | 'shutting-down' | 'off' | 'turning-on';
const crtState = ref<CrtState>('on');

function toggleCrt() {
  if (crtState.value === 'on') {
    crtState.value = 'shutting-down';
  } else if (crtState.value === 'off') {
    crtState.value = 'turning-on';
  }
}

function onCrtAnimationEnd() {
  if (crtState.value === 'shutting-down') {
    crtState.value = 'off';
  } else if (crtState.value === 'turning-on') {
    crtState.value = 'on';
  }
}

// ── Gamer Space Invaders webxdc game (easter egg) ──
type DinoState = 'hidden' | 'loading' | 'ready';
const dinoState = ref<DinoState>('hidden');
const dinoWindowState = ref<WindowState>('minimized');
const dinoIframe = ref<HTMLIFrameElement | null>(null);
let dinoXdcBytes: ArrayBuffer | null = null;

function restoreDino() {
  dinoWindowState.value = 'normal';
  nextTick(() => {
    dinoIframe.value?.focus();
  });
}

function gamerMinimize() {
  windowState.value = 'minimized';
  // Show the game tab when minimizing the gamer window (first time triggers fetch)
  if (dinoState.value === 'hidden') {
    dinoState.value = 'loading';
    fetchDinoXdc();
  }
}

async function fetchDinoXdc() {
  try {
    const resp = await fetch('https://blossom.ditto.pub/6825197c3210e5bac6d26f938a4651bb355e1be07ba7e91f169e54f64f7d83a1.xdc');
    dinoXdcBytes = await resp.arrayBuffer();
    dinoState.value = 'ready';
  } catch (e) {
    console.error('Failed to fetch Space Invaders xdc:', e);
    dinoState.value = 'ready'; // Still show iframe, it may work without init
  }
}

function onDinoIframeLoad() {
  // Focus the iframe so touch/keyboard events work immediately
  dinoIframe.value?.focus();
}

function onWebxdcMessage(event: MessageEvent) {
  if (!dinoIframe.value || event.source !== dinoIframe.value.contentWindow) return;
  const msg = event.data;
  if (!msg || msg.jsonrpc !== '2.0') return;

  // Handle webxdc.ready notification
  if (msg.method === 'webxdc.ready') {
    if (dinoXdcBytes) {
      const xdc = dinoXdcBytes.slice(0); // copy for transfer
      dinoIframe.value!.contentWindow!.postMessage(
        {
          jsonrpc: '2.0',
          method: 'webxdc.init',
          params: {
            xdc,
            selfAddr: 'player@ditto.pub',
            selfName: 'Player',
            sendUpdateInterval: 1000,
            sendUpdateMaxSize: 128000,
          },
        },
        '*',
        [xdc],
      );
    }
    return;
  }

  // Handle requests (with id) — respond with simple acks
  if (msg.id !== undefined && msg.method) {
    const win = dinoIframe.value?.contentWindow;
    if (!win) return;
    switch (msg.method) {
      case 'webxdc.sendUpdate':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: null }, '*');
        break;
      case 'webxdc.setUpdateListener':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: null }, '*');
        break;
      case 'webxdc.getAllUpdates':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: [] }, '*');
        break;
      case 'webxdc.sendToChat':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: null }, '*');
        break;
      case 'webxdc.importFiles':
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: [] }, '*');
        break;
      default:
        win.postMessage({ jsonrpc: '2.0', id: msg.id, result: null }, '*');
        break;
    }
  }
}

// Reset all easter egg state when switching themes
watch(() => props.theme, () => {
  crtState.value = 'on';
  retroPageIndex.value = 0;
  bubbleTab.value = 0;
  paintHelpOpen.value = false;
  kawaiiCmd.value = '';
  kawaiiResponse.value = '';
  kawaiiResponseVisible.value = false;
  if (kawaiiResponseTimer) clearTimeout(kawaiiResponseTimer);
  windowState.value = 'normal';
  showCloseConfirm.value = false;
  dinoState.value = 'hidden';
  dinoWindowState.value = 'minimized';
  dinoXdcBytes = null;
});

// ── Scroll forwarding ──
function onWheel(e: WheelEvent) {
  if (!viewport.value) return;
  // Don't forward scrolls when CRT is off or iframe is active
  if (props.theme === 'skater' && crtState.value !== 'on') return;
  if (retroActiveUrl.value || bubbleIframeUrl.value) return;
  // If the scroll didn't originate inside the viewport, forward it
  if (!viewport.value.contains(e.target as Node)) {
    viewport.value.scrollTop += e.deltaY;
  }
}

onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('click', closePaintHelp);
  window.addEventListener('message', onWebxdcMessage);
});
onUnmounted(() => {
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('click', closePaintHelp);
  window.removeEventListener('message', onWebxdcMessage);
});
</script>
