/* ═══════════════════════════════════════════════════════════════
 * TweetPilot Help Widget
 * - Floating "?" button (bottom-right)
 * - Slide-out drawer with accordion sections
 * - Advanced tips modal
 * ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ─── i18n Dictionary ─────────────────────────────────────────── */
  var helpT = {
    en: {
      'help.btn_title': 'Help & Documentation',
      'help.search_placeholder': 'Search help topics...',
      'help.quick_start': '🚀 Quick Start (5 Steps)',
      'help.ai_config': '⚙️ AI Model Configuration',
      'help.tweetclaw': '🔌 TweetClaw Extension',
      'help.accounts': '👥 Account Management',
      'help.scheduler': '⏰ Scheduled Tasks',
      'help.reports': '📊 Custom Reports',
      'help.xapi': '🔑 X API Configuration',
      'help.feishu': '💬 Feishu Integration',
      'help.advanced': '⭐ Advanced Tips',
      'help.upgrade': '💳 Upgrade to Pro',
      'help.full_docs': '📖 View Full Documentation →',

      // Quick Start
      'qs.step1': 'Download TweetPilot.dmg from the homepage',
      'qs.step2': 'Install and launch the app',
      'qs.step3': 'Download TweetClaw browser extension',
      'qs.step4': 'Connect your first Twitter/X account',
      'qs.step5': 'Run your first script or create a workspace',

      // AI Config
      'ai.step1': 'Open Settings → AI Providers',
      'ai.step2': 'Choose provider (OpenAI, Anthropic, DeepSeek, etc.)',
      'ai.step3': 'Enter your API Key',
      'ai.step4': 'Select model and test connection',
      'ai.tip': 'Get API keys: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">OpenAI</a> · <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">Anthropic</a> · <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">DeepSeek</a>',

      // TweetClaw
      'tc.step1': 'Install TweetClaw from <a href="https://chromewebstore.google.com/detail/tweetclaw/nolgcgfoebklpejfgebinnakamjamkna" target="_blank" rel="noopener">Chrome Web Store</a>',
      'tc.step2': 'Open Twitter/X in your browser',
      'tc.step3': 'TweetClaw connects via WebSocket (default port: 20086)',
      'tc.step4': 'Check TweetPilot → Settings → TweetClaw to verify connection',
      'tc.tip': 'Port conflict? Change port in TweetPilot settings and restart TweetClaw.',

      // Accounts
      'acc.step1': 'Click "Accounts" in sidebar',
      'acc.step2': 'Click "Add Account"',
      'acc.step3': 'Choose connection method: TweetClaw (browser) or X API (direct)',
      'acc.step4': 'Follow prompts to authenticate',
      'acc.tip': 'Switch accounts anytime from the account dropdown.',

      // Scheduler
      'sched.step1': 'Create or select a Python script',
      'sched.step2': 'Click "Schedule" button',
      'sched.step3': 'Set interval (e.g., every 15min) or cron expression',
      'sched.step4': 'Enable the task',
      'sched.pro': '⚠️ Scheduled tasks require a Pro license.',
      'sched.upgrade': 'Upgrade to Pro →',

      // Reports
      'rep.step1': 'Write a Python script that generates data',
      'rep.step2': 'Configure output: Feishu webhook or email',
      'rep.step3': 'Bind to a cron schedule (e.g., daily at 9am)',
      'rep.step4': 'View reports in Feishu or inbox',
      'rep.tip': 'Download sample report templates from our GitHub.',

      // X API
      'xapi.step1': 'Go to <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank" rel="noopener">Twitter Developer Portal</a>',
      'xapi.step2': 'Create a new App (or use existing)',
      'xapi.step3': 'Copy 4 keys: API Key, API Secret, Access Token, Access Secret',
      'xapi.step4': 'Paste into TweetPilot → Settings → X API',
      'xapi.tip': 'Choose API version: v1.1 (more features) or v2 (newer).',

      // Feishu
      'fs.step1': 'Create a Feishu bot in your group chat',
      'fs.step2': 'Copy the Webhook URL',
      'fs.step3': 'Paste into TweetPilot → Settings → Feishu',
      'fs.step4': 'Click "Test" to send a test message',
      'fs.tip': 'Need help? Scan QR code on homepage to contact us via Feishu.',

      // Advanced Modal
      'adv.title': '⭐ Advanced Tips',
      'adv.card1_title': 'Data Blocks Mastery',
      'adv.card1_desc': 'Chain multiple data sources, transform with Python, and visualize in real-time dashboards.',
      'adv.card2_title': 'AI Multi-Turn Conversations',
      'adv.card2_desc': 'Build context-aware agents that remember past interactions and make decisions autonomously.',
      'adv.card3_title': 'Script Chaining',
      'adv.card3_desc': 'Trigger scripts from other scripts, pass data between them, and build complex workflows.',
      'adv.card4_title': 'Custom Prompt Templates',
      'adv.card4_desc': 'Create reusable AI prompt templates with variables for consistent, high-quality outputs.',
      'adv.full_docs': 'View Full Documentation →',

      // Upgrade
      'upg.title': 'Unlock Full Power with Pro',
      'upg.free_limit': 'Free plan limits:',
      'upg.limit1': '✓ Manual script execution',
      'upg.limit2': '✓ Multiple accounts',
      'upg.limit3': '✓ Data blocks & workspaces',
      'upg.limit4': '✗ Scheduled tasks',
      'upg.limit5': '✗ AI remote agents',
      'upg.pro_features': 'Pro unlocks:',
      'upg.feat1': '✓ Unlimited scheduled tasks',
      'upg.feat2': '✓ AI remote conversation agents',
      'upg.feat3': '✓ Priority support',
      'upg.feat4': '✓ 2 devices per license',
      'upg.price': '$300/year',
      'upg.btn': 'Buy Pro License',
    },
    zh: {
      'help.btn_title': '帮助与文档',
      'help.search_placeholder': '搜索帮助主题...',
      'help.quick_start': '🚀 快速入门（5步上手）',
      'help.ai_config': '⚙️ AI 模型配置',
      'help.tweetclaw': '🔌 TweetClaw 插件',
      'help.accounts': '👥 账号管理',
      'help.scheduler': '⏰ 定时任务',
      'help.reports': '📊 自定义报表',
      'help.xapi': '🔑 X API 配置',
      'help.feishu': '💬 飞书集成',
      'help.advanced': '⭐ 高阶技巧',
      'help.upgrade': '💳 升级到 Pro',
      'help.full_docs': '📖 查看完整文档 →',

      // Quick Start
      'qs.step1': '从首页下载 TweetPilot.dmg',
      'qs.step2': '安装并启动应用',
      'qs.step3': '下载 TweetClaw 浏览器扩展',
      'qs.step4': '连接你的第一个 Twitter/X 账号',
      'qs.step5': '运行第一个脚本或创建工作空间',

      // AI Config
      'ai.step1': '打开 设置 → AI 提供商',
      'ai.step2': '选择提供商（OpenAI、Anthropic、DeepSeek 等）',
      'ai.step3': '输入你的 API Key',
      'ai.step4': '选择模型并测试连接',
      'ai.tip': '获取 API 密钥：<a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">OpenAI</a> · <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">Anthropic</a> · <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">DeepSeek</a>',

      // TweetClaw
      'tc.step1': '从 <a href="https://chromewebstore.google.com/detail/tweetclaw/nolgcgfoebklpejfgebinnakamjamkna" target="_blank" rel="noopener">Chrome 应用商店</a> 安装 TweetClaw',
      'tc.step2': '在浏览器中打开 Twitter/X',
      'tc.step3': 'TweetClaw 通过 WebSocket 连接（默认端口：20086）',
      'tc.step4': '检查 TweetPilot → 设置 → TweetClaw 以验证连接',
      'tc.tip': '端口冲突？在 TweetPilot 设置中更改端口并重启 TweetClaw。',

      // Accounts
      'acc.step1': '点击侧边栏的"账号"',
      'acc.step2': '点击"添加账号"',
      'acc.step3': '选择连接方式：TweetClaw（浏览器）或 X API（直连）',
      'acc.step4': '按提示完成认证',
      'acc.tip': '随时从账号下拉菜单切换账号。',

      // Scheduler
      'sched.step1': '创建或选择一个 Python 脚本',
      'sched.step2': '点击"定时"按钮',
      'sched.step3': '设置间隔（如每 15 分钟）或 cron 表达式',
      'sched.step4': '启用任务',
      'sched.pro': '⚠️ 定时任务需要 Pro 许可证。',
      'sched.upgrade': '升级到 Pro →',

      // Reports
      'rep.step1': '编写生成数据的 Python 脚本',
      'rep.step2': '配置输出：飞书 webhook 或邮件',
      'rep.step3': '绑定到 cron 计划（如每天上午 9 点）',
      'rep.step4': '在飞书或收件箱中查看报表',
      'rep.tip': '从我们的 GitHub 下载示例报表模板。',

      // X API
      'xapi.step1': '前往 <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank" rel="noopener">Twitter 开发者门户</a>',
      'xapi.step2': '创建新应用（或使用现有应用）',
      'xapi.step3': '复制 4 个密钥：API Key、API Secret、Access Token、Access Secret',
      'xapi.step4': '粘贴到 TweetPilot → 设置 → X API',
      'xapi.tip': '选择 API 版本：v1.1（功能更多）或 v2（更新）。',

      // Feishu
      'fs.step1': '在群聊中创建飞书机器人',
      'fs.step2': '复制 Webhook URL',
      'fs.step3': '粘贴到 TweetPilot → 设置 → 飞书',
      'fs.step4': '点击"测试"发送测试消息',
      'fs.tip': '需要帮助？扫描首页二维码通过飞书联系我们。',

      // Advanced Modal
      'adv.title': '⭐ 高阶技巧',
      'adv.card1_title': 'Data Blocks 进阶',
      'adv.card1_desc': '链接多个数据源，用 Python 转换，并在实时仪表板中可视化。',
      'adv.card2_title': 'AI 多轮对话',
      'adv.card2_desc': '构建上下文感知的代理，记住过去的交互并自主决策。',
      'adv.card3_title': '脚本链式调用',
      'adv.card3_desc': '从其他脚本触发脚本，在它们之间传递数据，构建复杂工作流。',
      'adv.card4_title': '自定义提示词模板',
      'adv.card4_desc': '创建带变量的可复用 AI 提示词模板，获得一致的高质量输出。',
      'adv.full_docs': '查看完整文档 →',

      // Upgrade
      'upg.title': '用 Pro 解锁全部功能',
      'upg.free_limit': '免费版限制：',
      'upg.limit1': '✓ 手动执行脚本',
      'upg.limit2': '✓ 多账号管理',
      'upg.limit3': '✓ 数据块和工作空间',
      'upg.limit4': '✗ 定时任务',
      'upg.limit5': '✗ AI 远程代理',
      'upg.pro_features': 'Pro 解锁：',
      'upg.feat1': '✓ 无限定时任务',
      'upg.feat2': '✓ AI 远程对话代理',
      'upg.feat3': '✓ 优先支持',
      'upg.feat4': '✓ 每个许可证 2 台设备',
      'upg.price': '$300/年',
      'upg.btn': '购买 Pro 许可证',
    }
  };

  function ht(key) {
    var lang = localStorage.getItem('tp_lang') || 'en';
    return (helpT[lang] && helpT[lang][key]) || (helpT['en'] && helpT['en'][key]) || key;
  }

  /* ─── Section Content ─────────────────────────────────────────── */
  var sections = [
    {
      id: 'quick-start',
      titleKey: 'help.quick_start',
      steps: ['qs.step1', 'qs.step2', 'qs.step3', 'qs.step4', 'qs.step5']
    },
    {
      id: 'ai-config',
      titleKey: 'help.ai_config',
      steps: ['ai.step1', 'ai.step2', 'ai.step3', 'ai.step4'],
      tip: 'ai.tip'
    },
    {
      id: 'tweetclaw',
      titleKey: 'help.tweetclaw',
      steps: ['tc.step1', 'tc.step2', 'tc.step3', 'tc.step4'],
      tip: 'tc.tip'
    },
    {
      id: 'accounts',
      titleKey: 'help.accounts',
      steps: ['acc.step1', 'acc.step2', 'acc.step3', 'acc.step4'],
      tip: 'acc.tip'
    },
    {
      id: 'scheduler',
      titleKey: 'help.scheduler',
      steps: ['sched.step1', 'sched.step2', 'sched.step3', 'sched.step4'],
      pro: 'sched.pro',
      upgradeKey: 'sched.upgrade'
    },
    {
      id: 'reports',
      titleKey: 'help.reports',
      steps: ['rep.step1', 'rep.step2', 'rep.step3', 'rep.step4'],
      tip: 'rep.tip'
    },
    {
      id: 'xapi',
      titleKey: 'help.xapi',
      steps: ['xapi.step1', 'xapi.step2', 'xapi.step3', 'xapi.step4'],
      tip: 'xapi.tip'
    },
    {
      id: 'feishu',
      titleKey: 'help.feishu',
      steps: ['fs.step1', 'fs.step2', 'fs.step3', 'fs.step4'],
      tip: 'fs.tip'
    }
  ];

  /* ─── Build HTML ──────────────────────────────────────────────── */
  function buildDrawerHTML() {
    var html = '<div class="help-drawer-header">';
    html += '<input type="text" class="help-search" placeholder="' + ht('help.search_placeholder') + '" />';
    html += '</div>';
    html += '<div class="help-drawer-body">';

    sections.forEach(function(sec) {
      html += '<div class="help-section" data-section="' + sec.id + '">';
      html += '<div class="help-section-title">' + ht(sec.titleKey) + '</div>';
      html += '<div class="help-section-content">';

      if (sec.pro) {
        html += '<div class="help-pro-notice">' + ht(sec.pro) + ' <a href="/pricing.html" class="help-upgrade-link">' + ht(sec.upgradeKey) + '</a></div>';
      }

      html += '<ol class="help-steps">';
      sec.steps.forEach(function(stepKey) {
        html += '<li>' + ht(stepKey) + '</li>';
      });
      html += '</ol>';

      if (sec.tip) {
        html += '<div class="help-tip">💡 ' + ht(sec.tip) + '</div>';
      }

      html += '</div></div>';
    });

    // Advanced & Upgrade buttons
    html += '<div class="help-section help-section-btn" data-section="advanced">';
    html += '<div class="help-section-title">' + ht('help.advanced') + '</div>';
    html += '</div>';

    html += '<div class="help-section help-section-btn" data-section="upgrade">';
    html += '<div class="help-section-title help-upgrade-title">' + ht('help.upgrade') + '</div>';
    html += '</div>';

    html += '</div>'; // .help-drawer-body

    html += '<div class="help-drawer-footer">';
    html += '<a href="/help.html" class="help-full-docs">' + ht('help.full_docs') + '</a>';
    html += '</div>';

    return html;
  }

  function buildAdvancedModalHTML() {
    var html = '<div class="help-modal-overlay" id="help-advanced-modal">';
    html += '<div class="help-modal">';
    html += '<div class="help-modal-header">';
    html += '<h2>' + ht('adv.title') + '</h2>';
    html += '<button class="help-modal-close" onclick="window.closeHelpAdvancedModal()">&times;</button>';
    html += '</div>';
    html += '<div class="help-modal-body">';
    html += '<div class="help-adv-grid">';

    for (var i = 1; i <= 4; i++) {
      html += '<div class="help-adv-card">';
      html += '<h3>' + ht('adv.card' + i + '_title') + '</h3>';
      html += '<p>' + ht('adv.card' + i + '_desc') + '</p>';
      html += '</div>';
    }

    html += '</div>';
    html += '<a href="/help.html" class="help-modal-cta">' + ht('adv.full_docs') + '</a>';
    html += '</div></div></div>';

    return html;
  }

  function buildUpgradeModalHTML() {
    var html = '<div class="help-modal-overlay" id="help-upgrade-modal">';
    html += '<div class="help-modal help-modal-upgrade">';
    html += '<div class="help-modal-header">';
    html += '<h2>' + ht('upg.title') + '</h2>';
    html += '<button class="help-modal-close" onclick="window.closeHelpUpgradeModal()">&times;</button>';
    html += '</div>';
    html += '<div class="help-modal-body">';

    html += '<div class="help-upg-cols">';
    html += '<div class="help-upg-col">';
    html += '<h3>' + ht('upg.free_limit') + '</h3>';
    html += '<ul>';
    for (var i = 1; i <= 5; i++) {
      html += '<li>' + ht('upg.limit' + i) + '</li>';
    }
    html += '</ul></div>';

    html += '<div class="help-upg-col help-upg-col-pro">';
    html += '<h3>' + ht('upg.pro_features') + '</h3>';
    html += '<ul>';
    for (var j = 1; j <= 4; j++) {
      html += '<li>' + ht('upg.feat' + j) + '</li>';
    }
    html += '</ul>';
    html += '<div class="help-upg-price">' + ht('upg.price') + '</div>';
    html += '</div></div>';

    html += '<a href="/pricing.html" class="help-modal-cta help-modal-cta-pro">' + ht('upg.btn') + '</a>';
    html += '</div></div></div>';

    return html;
  }

  /* ─── Init ────────────────────────────────────────────────────── */
  function init() {
    // Inject CSS
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/help-widget.css';
    document.head.appendChild(style);

    // Inject floating button
    var btn = document.createElement('button');
    btn.id = 'help-widget-btn';
    btn.className = 'help-widget-btn';
    btn.title = ht('help.btn_title');
    btn.innerHTML = '?';
    btn.onclick = toggleDrawer;
    document.body.appendChild(btn);

    // Inject drawer
    var drawer = document.createElement('div');
    drawer.id = 'help-drawer';
    drawer.className = 'help-drawer';
    drawer.innerHTML = buildDrawerHTML();
    document.body.appendChild(drawer);

    // Inject modals
    var advModal = document.createElement('div');
    advModal.innerHTML = buildAdvancedModalHTML();
    document.body.appendChild(advModal.firstChild);

    var upgModal = document.createElement('div');
    upgModal.innerHTML = buildUpgradeModalHTML();
    document.body.appendChild(upgModal.firstChild);

    // Bind events
    bindEvents();
  }

  function toggleDrawer() {
    var drawer = document.getElementById('help-drawer');
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function bindEvents() {
    // Accordion toggle
    document.querySelectorAll('.help-section').forEach(function(sec) {
      sec.addEventListener('click', function(e) {
        if (e.target.closest('.help-section-content')) return;

        var id = sec.getAttribute('data-section');
        if (id === 'advanced') {
          openAdvancedModal();
        } else if (id === 'upgrade') {
          openUpgradeModal();
        } else {
          sec.classList.toggle('open');
        }
      });
    });

    // Search
    var searchInput = document.querySelector('.help-search');
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        var query = e.target.value.toLowerCase();
        document.querySelectorAll('.help-section').forEach(function(sec) {
          var text = sec.textContent.toLowerCase();
          sec.style.display = text.includes(query) ? 'block' : 'none';
        });
      });
    }

    // Close drawer when clicking outside
    document.getElementById('help-drawer').addEventListener('click', function(e) {
      if (e.target.id === 'help-drawer') {
        toggleDrawer();
      }
    });
  }

  function openAdvancedModal() {
    document.getElementById('help-advanced-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function openUpgradeModal() {
    document.getElementById('help-upgrade-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  window.closeHelpAdvancedModal = function() {
    document.getElementById('help-advanced-modal').classList.remove('open');
    document.body.style.overflow = '';
  };

  window.closeHelpUpgradeModal = function() {
    document.getElementById('help-upgrade-modal').classList.remove('open');
    document.body.style.overflow = '';
  };

  // Public API — used by help.html cards
  window.TweetPilotHelp = {
    openDrawer: function(sectionId) {
      // Map card IDs to drawer section data-section values
      var map = {
        'ai-config': 'ai-config',
        'tweetclaw': 'tweetclaw',
        'accounts': 'accounts',
        'scheduler': 'scheduler',
        'reports': 'reports',
        'x-api': 'x-api',
        'feishu': 'feishu',
        'upgrade': 'upgrade',
        'advanced': 'advanced'
      };
      var target = map[sectionId] || sectionId;

      // Special sections open modals instead
      if (target === 'advanced') { openAdvancedModal(); return; }
      if (target === 'upgrade')  { openUpgradeModal();  return; }

      // Open the drawer
      var drawer = document.getElementById('help-drawer');
      if (!drawer) return;
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Expand the matching section, collapse others
      setTimeout(function() {
        document.querySelectorAll('.help-section').forEach(function(sec) {
          if (sec.getAttribute('data-section') === target) {
            sec.classList.add('open');
            sec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            sec.classList.remove('open');
          }
        });
      }, 50);
    }
  };

  // Auto-init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
