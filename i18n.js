/**
 * TweetPilot i18n — English / 中文
 * Usage: data-i18n="key"      → sets textContent
 *        data-i18n-html="key" → sets innerHTML (use for <strong>, <br/> etc.)
 */
(function () {
  'use strict';

  /* ─── Translation dictionary ─────────────────────────────────── */
  var T = {
    en: {
      // Page titles
      'index.title': 'TweetPilot — AI-Powered Twitter Automation',
      'pricing.title': 'Pricing — TweetPilot',

      // Nav
      'nav.features': 'Features',
      'nav.how_it_works': 'How It Works',
      'nav.ai_engine': 'AI Engine',
      'nav.pricing': 'Pricing',
      'nav.help': 'Help',
      'nav.download': 'Download',
      'nav.download_free': 'Download Free',

      // Hero
      'hero.badge': 'AI-Powered Twitter Automation · macOS',
      'hero.h1_line1': 'Your Twitter Workflow,',
      'hero.h1_gradient': 'Fully Automated',
      'hero.sub': 'TweetPilot is a macOS desktop app that lets AI agents manage your Twitter/X presence — scheduling posts, analyzing accounts, running Python scripts, all from one intelligent workspace.',
      'hero.btn_download': 'Download for macOS',
      'hero.btn_extension': 'Get TweetClaw Extension',
      'hero.meta_local': 'Runs locally on macOS',
      'hero.meta_scheduled': 'Scheduled automation',
      'hero.meta_multi': 'Multi-account support',

      // App mockup (decorative UI)
      'mockup.workspaces': 'Workspaces',
      'mockup.main_workspace': 'Main Workspace',
      'mockup.growth_campaign': 'Growth Campaign',
      'mockup.content_schedule': 'Content Schedule',
      'mockup.accounts': 'Accounts',
      'mockup.active_tasks': 'Active Tasks',
      'mockup.task1_name': 'Auto Reply to Mentions',
      'mockup.task1_meta': 'mention_reply.py · runs every 15min',
      'mockup.task2_name': 'Daily Growth Report',
      'mockup.task2_meta': 'growth_report.py · cron 09:00 daily',
      'mockup.task3_name': 'Trend Search & Post',
      'mockup.task3_meta': 'trend_post.py · runs every 2hr',
      'mockup.badge_sched': 'Scheduled',
      'mockup.ai_agent': 'TweetPilot Agent',
      'mockup.ai_msg': "Found 3 trending topics. Drafting reply thread for @user's mention...",

      // Stats
      'stats.ai_providers': 'AI Providers',
      'stats.x_modes': 'X Access Modes',
      'stats.scheduled': 'Scheduled Tasks',
      'stats.local': 'Local & Private',

      // Features
      'features.label': 'Capabilities',
      'features.title': 'Everything you need to<br />dominate Twitter/X',
      'features.desc': 'A full-featured desktop workspace with AI at the core — built for power users who want total control.',
      'feat1.title': 'AI-Powered Chat Interface',
      'feat1.desc': 'Talk to your AI agent directly. Ask it to search tweets, analyze accounts, draft content, or execute any Twitter action — all through natural conversation.',
      'feat2.title': 'Task Scheduling',
      'feat2.desc': 'Set up recurring tasks with flexible interval or cron schedules. Run Python scripts automatically — post at peak times, monitor keywords, send reports.',
      'feat3.title': 'Multi-Account Management',
      'feat3.desc': 'Manage multiple Twitter/X accounts in one place. Switch contexts instantly. Each account runs in its own isolated workspace with dedicated credentials.',
      'feat4.title': 'Python Script Execution',
      'feat4.desc': 'Write and run Python scripts that interact with Twitter. Full access to the TweetPilot SDK — search, post, retweet, follow, and analyze data programmatically.',
      'feat5.title': 'Data Blocks',
      'feat5.desc': 'Build structured knowledge bases that feed directly into your AI sessions. Store personas, templates, target audiences, and brand guidelines for consistent outputs.',
      'feat6.title': 'Feishu / Lark Integration',
      'feat6.desc': 'Connect TweetPilot to Feishu (Lark) bots. Receive automated reports, alerts, and summaries directly in your enterprise messaging channels.',

      // How It Works
      'hiw.label': 'Architecture',
      'hiw.title': 'Two ways to reach X',
      'hiw.desc': 'TweetPilot supports both browser-based automation via TweetClaw and direct API access — pick the mode that fits your setup.',
      'hiw.ext_badge': 'Chrome Extension Mode',
      'hiw.ext_title': 'TweetClaw Bridge',
      'hiw.ext_desc': 'Use the TweetClaw Chrome extension as a local WebSocket bridge. TweetPilot connects directly to your logged-in browser session — no API keys needed, no rate limit headaches.',
      'hiw.ext_step1': 'Install the <strong>TweetClaw</strong> Chrome extension from the Web Store',
      'hiw.ext_step2': 'Open Twitter/X in Chrome — the extension starts a local <strong>WebSocket server</strong> on port 20086',
      'hiw.ext_step3': 'TweetPilot connects via LocalBridge and can <strong>read, post, search, and interact</strong> using your browser session',
      'hiw.ext_link': 'Install TweetClaw from Chrome Web Store',
      'hiw.api_badge': 'Official X API Mode',
      'hiw.api_title': 'X API Direct',
      'hiw.api_desc': 'Connect with official X API credentials (OAuth 2.0 or API keys) for enterprise-grade reliability. Full access to all X API endpoints with your own developer app credentials.',
      'hiw.api_step1': 'Create an app at <strong>developer.twitter.com</strong> and obtain your API keys',
      'hiw.api_step2': 'Enter your <strong>Consumer Key, Secret, and OAuth tokens</strong> in TweetPilot Settings',
      'hiw.api_step3': 'TweetPilot calls X API directly — supports <strong>v1.1 and v2 endpoints</strong> with automatic credential management',

      // AI Engine
      'ai.label': 'AI Engine',
      'ai.title': 'Bring your own AI model',
      'ai.desc': 'TweetPilot is model-agnostic. Connect to Claude, GPT-4, a local Ollama model, or any OpenAI-compatible API. Switch providers without changing your workflows.',
      'ai.provider1_name': 'Anthropic Claude',
      'ai.provider1_desc': 'Claude 3 Opus / Sonnet',
      'ai.provider2_name': 'OpenAI',
      'ai.provider2_desc': 'GPT-4o / GPT-4 Turbo',
      'ai.provider3_name': 'Ollama',
      'ai.provider3_desc': 'Local models, 100% private',
      'ai.provider4_name': 'Custom API',
      'ai.provider4_desc': 'Any OpenAI-compatible endpoint',
      'ai.chat_header': 'AI Session · Main Workspace',
      'ai.chat_user_msg': 'Search for tweets about “AI automation” from the past 24h and like the top 5 most engaging ones',
      'ai.chat_agent_name': 'TweetPilot Agent',
      'ai.chat_searching': 'Searching Twitter for “AI automation” tweets from the last 24 hours...',
      'ai.chat_result_label': 'Result',
      'ai.chat_found': 'Found 47 tweets. Identified top 5 by engagement score. Liking them now...',
      'ai.chat_done': '✓ All 5 tweets liked successfully',

      // Integrations
      'int.label': 'Integrations',
      'int.title': 'Connects to your stack',
      'int.twitter_desc': 'Full read/write access via TweetClaw or official X API',
      'int.tweetclaw_desc': 'Chrome extension WebSocket bridge for browserless access',
      'int.feishu_desc': 'Push reports and alerts to enterprise Feishu bots',
      'int.python_desc': "Execute custom automation scripts with TweetPilot's local SDK",

      // Pricing section (index)
      'pricing.label': 'Pricing',
      'pricing.title': 'Simple, transparent pricing',
      'pricing.desc': 'Start for free. Upgrade when you need scheduled automation and AI-powered remote conversations.',
      'pricing.view_full': 'View full pricing & FAQ',

      // Plan — Free
      'plan.free_badge': 'Free',
      'plan.free_name': 'Starter',
      'plan.free_sub': 'Forever free, no credit card required',
      'plan.feat_multi_account': 'Multi-account management',
      'plan.feat_manual_task': 'Manual task execution',
      'plan.feat_python': 'Python script runner',
      'plan.feat_x_api': 'X API & TweetClaw support',
      'plan.feat_workspace': 'Workspace & Data Blocks',
      'plan.feat_scheduled_no': 'Scheduled tasks (interval & cron)',
      'plan.feat_ai_agent_no': 'AI remote conversation agent',
      'plan.feat_feishu_no': 'Feishu / Lark integration',
      'plan.free_btn': 'Download Free',

      // Plan — Pro
      'plan.pro_badge': 'Most Popular',
      'plan.pro_name': 'Professional',
      'plan.pro_period': '/ year',
      'plan.pro_sub': '1 license · up to 2 devices · 1 year',
      'plan.feat_everything_starter': 'Everything in Starter',
      'plan.feat_scheduled': '<strong style="color:var(--color-text);">Scheduled tasks</strong> — interval &amp; cron',
      'plan.feat_ai_agent': '<strong style="color:var(--color-text);">AI remote conversation</strong> agent',
      'plan.feat_feishu_bot': 'Feishu / Lark bot integration',
      'plan.feat_2devices': '2 devices per license',
      'plan.feat_email_support': 'Email support',
      'plan.feat_12months': 'License valid for 12 months',
      'plan.pro_btn': 'Buy License — $300/yr',

      // Plan — Enterprise
      'plan.ent_badge': 'Enterprise',
      'plan.ent_name': 'Lifetime & Custom',
      'plan.ent_price': 'Custom',
      'plan.ent_sub_index': 'Offline payment · signed contract',
      'plan.ent_sub_pricing': 'Offline payment · contract required',
      'plan.feat_everything_pro': 'Everything in Professional',
      'plan.feat_lifetime': '<strong style="color:var(--color-text);">Lifetime license</strong> — no renewal',
      'plan.feat_training': 'AI workflow training &amp; onboarding',
      'plan.feat_custom_scripts': 'Custom AI scripts &amp; reports',
      'plan.feat_priority_support': 'Priority support via Feishu',
      'plan.feat_contract': 'Signed service contract',
      'plan.ent_btn': 'Contact Us',

      // Download
      'download.label': 'Download',
      'download.title': 'Ready to automate?',
      'download.desc': 'TweetPilot is a native macOS app. Download, install, and connect your accounts in minutes.',
      'download.btn': 'Download .dmg for macOS',
      'download.ext_link': 'Also install TweetClaw Chrome Extension',
      'download.req': 'macOS 12 Monterey or later · Apple Silicon &amp; Intel',

      // Footer
      'footer.copyright': '© 2026 TweetPilot. All rights reserved.',
      'footer.terms': 'Terms of Service',
      'footer.privacy': 'Privacy Policy',
      'footer.refund': 'Refund Policy',
      'footer.help': 'Help Center',
      'footer.contact': 'Contact',

      // Contact modal
      'modal.title': 'Get in Touch',
      'modal.sub': 'Reach us via email or scan the Feishu QR code below',
      'modal.email_label': 'Email',
      'modal.feishu_label': 'Feishu / Lark',
      'modal.send': 'Send',
      'modal.copy': 'Copy',
      'modal.copied': 'Copied',
      'modal.qr_hint': 'Scan with Feishu app to start a conversation',

      // Pricing page header
      'pp.label': 'Pricing',
      'pp.title_before': 'Simple, ',
      'pp.title_gradient': 'transparent',
      'pp.title_after': ' pricing',
      'pp.sub': 'Start for free. Upgrade when you need scheduled automation and AI-powered remote conversations.',

      // FAQ
      'faq.title': 'Frequently asked questions',
      'faq.q1': 'What does the free plan include?',
      'faq.a1': 'The free plan lets you manage multiple Twitter/X accounts, run Python scripts manually, use the TweetClaw browser extension or X API, and build workspaces with Data Blocks. The only limitations are scheduled (automatic) tasks and the AI remote conversation agent — those require a paid license.',
      'faq.q2': 'How many devices can I use per license?',
      'faq.a2': 'Each Professional license supports up to 2 devices simultaneously. If you need more devices, you can purchase additional licenses.',
      'faq.q3': 'What happens when my annual license expires?',
      'faq.a3': 'When your license expires, your account reverts to the free plan. All your data, workspaces, and scripts remain intact — you just lose access to scheduled tasks and the AI conversation agent until you renew.',
      'faq.q4': 'What is the Enterprise Lifetime plan?',
      'faq.a4': 'The Lifetime plan is an offline, contract-based arrangement designed for businesses or power users who want a permanent license plus hands-on services: AI workflow training, custom report development, and dedicated script writing. Payment is handled offline with a signed service contract. Contact us at ribencong@dessage.xyz or via Feishu to discuss.',
      'faq.q5': 'Do you offer refunds?',
      'faq.a5': 'Yes. We offer a 7-day refund for annual licenses if you are not satisfied. See our <a href="/refund.html" style="color:var(--color-secondary);">Refund Policy</a> for details.',
      'faq.q6': 'Is my data stored on your servers?',
      'faq.a6': 'No. TweetPilot runs entirely locally on your macOS device. Your credentials, scripts, and workspaces never leave your machine. License validation is the only network call made to our servers.',

      // Help page — sidebar
      'help.sidebar_label': 'Documentation',
      'help.nav_quickstart': 'Quick Start',
      'help.nav_ai': 'AI Model Config',
      'help.nav_tweetclaw': 'TweetClaw',
      'help.nav_accounts': 'Accounts',
      'help.nav_scheduler': 'Scheduler',
      'help.nav_reports': 'Custom Reports',
      'help.nav_xapi': 'X API',
      'help.nav_feishu': 'Feishu',
      'help.nav_upgrade': 'Upgrade & Plans',
      'help.contact_label': 'Contact Support',
      'help.feishu_contact': 'Feishu / Lark QR',
      'help.feishu_hint': 'Click to view QR code',
      'help.qr_sub': 'Scan with Feishu for real-time support',
      'help.qr_close': 'Close',

      // Quick Start
      'help.qs_badge': 'Getting Started',
      'help.qs_title': 'Quick Start Guide',
      'help.qs_intro': 'Get TweetPilot up and running in under 5 minutes. Follow these steps in order.',
      'help.qs_s1_title': 'Download & Install',
      'help.qs_s1_desc': 'Visit the <a href="/#download">homepage</a> and download the latest <code>TweetPilot.dmg</code>. Open the DMG, drag TweetPilot to your Applications folder, then launch it. macOS 12 Monterey or later required.',
      'help.qs_s2_title': 'Install TweetClaw Extension',
      'help.qs_s2_sub1': 'Open the <a href="https://chromewebstore.google.com/detail/tweetclaw/nolgcgfoebklpejfgebinnakamjamkna" target="_blank" rel="noopener">Chrome Web Store listing</a> and click <strong>Add to Chrome</strong>. Confirm the permissions popup — TweetClaw only needs access to x.com.',
      'help.qs_s2_sub2_main': 'Pin TweetClaw to your toolbar so you can always check its status at a glance. Click the <strong>puzzle piece icon</strong> in Chrome\'s toolbar, find TweetClaw in the list, and click the <strong>pin icon</strong> next to it.',
      'help.qs_s2_sub2_alt': '<strong>Can\'t see the puzzle piece icon?</strong> Some browsers hide it when no extensions are installed. Click the <strong>three-dot menu (⋮)</strong> in the top-right corner of Chrome → <strong>Extensions</strong> → <strong>Manage Extensions</strong>. Find TweetClaw in the list and toggle it on, then return to the toolbar — the puzzle piece icon should now appear.',
      'help.qs_s2_sub3': 'Navigate to <a href="https://x.com" target="_blank" rel="noopener">x.com</a> in the same Chrome window and make sure you\'re logged in. TweetClaw will activate automatically and start a local WebSocket bridge in the background.',
      'help.qs_s2_sub4': 'Click the TweetClaw icon in your toolbar. The popup shows your connected <strong>Twitter username</strong> and the active <strong>port number</strong> (default: <code>20086</code>). Confirm both are displayed correctly.',
      'help.qs_s2_sub5': 'In TweetPilot, open <strong>Settings → LocalBridge</strong>. LocalBridge manages multiple ports for different services — locate the <strong>Browser Extension port</strong> and make sure it matches the port shown in the TweetClaw popup. <strong>These two must be identical</strong> — if you change one, update the other accordingly. A mismatch will prevent TweetClaw from connecting.',
      'help.qs_s3_title': 'Configure an AI Model',
      'help.qs_s3_sub1': 'In TweetPilot, click <strong>Settings</strong> in the top menu bar, then select <strong>AI Providers</strong>.',
      'help.qs_s3_sub2': 'Choose a provider from the list. If you\'re unsure which to pick: <strong>DeepSeek</strong> is the most affordable for getting started; <strong>Claude Sonnet</strong> or <strong>GPT-4o</strong> give the best results for complex automation tasks.',
      'help.qs_s3_sub3': 'Paste your API key into the field. Your key is encrypted and stored in macOS Keychain — it never leaves your Mac. Don\'t have a key yet? Get one from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">OpenAI</a>, <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">Anthropic</a>, or <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">DeepSeek</a>.',
      'help.qs_s3_sub4': 'Select a model from the dropdown, then click <strong>Test Connection</strong>. A green checkmark confirms the key is valid and the model is reachable. You\'re ready to go.',
      'help.qs_s3_ollama': '<strong>Prefer a local model?</strong> TweetPilot also supports <a href="https://ollama.ai" target="_blank" rel="noopener">Ollama</a> — start the Ollama server on your Mac, select "Ollama" as the provider, and no API key is needed. See the <a href="javascript:void(0)" onclick="showSection(\'ai-config\')">AI Model Configuration</a> section for full details.',
      'help.qs_s4_title': 'Add Your Twitter Account',
      'help.qs_s4_sub1': 'Click <strong>Accounts</strong> in the left sidebar, then click <strong>Add Account</strong>.',
      'help.qs_s4_sub2': 'Choose a connection method. <strong>TweetClaw (Browser)</strong> is recommended for most users — it reads your existing logged-in session from Chrome, so no passwords or tokens are required. <strong>X API (Direct)</strong> uses your own developer credentials and works without the browser extension, but requires setting up an app on the Twitter Developer Portal first.',
      'help.qs_s4_sub3': 'If you chose TweetClaw: make sure Chrome is open with x.com and TweetClaw is active. TweetPilot will detect your session automatically and display your Twitter username. Click <strong>Confirm</strong> to complete.',
      'help.qs_s4_sub4': 'Once added, your account appears in the Accounts list with a <strong>green status indicator</strong>. You can add multiple accounts and switch between them at any time from the account dropdown at the top of the sidebar.',
      'help.qs_s5_title': 'Run Your First Script',
      'help.qs_s5_sub1': 'Click <strong>New Workspace</strong> in the sidebar to create your first workspace. A workspace is where you manage scripts, data blocks, and AI conversations for a specific goal.',
      'help.qs_s5_sub2': 'Open the <strong>AI Chat</strong> panel. This is your main interface for giving instructions — you talk to the agent in plain language, and it handles the code and Twitter API calls for you.',
      'help.qs_s5_sub3': 'Try this example to verify everything is working:<br /><br /><em>"Search for the 5 most recent tweets mentioning \'AI automation\' and show me the usernames and like counts."</em><br /><br />The agent will write and run the script automatically, then display the results in the chat.',
      'help.qs_s5_sub4': 'If you see results returned — you\'re all set. From here you can ask follow-up questions, save the script for reuse, or bind it to a scheduled task to run automatically.',
      'help.qs_tip': 'All your data — credentials, scripts, workspaces — stays <strong>100% local</strong> on your Mac. Nothing is uploaded to our servers except license validation.',

      // AI Config
      'help.ai_badge': 'Configuration',
      'help.ai_title': 'AI Model Configuration',
      'help.ai_intro': 'TweetPilot works with any AI provider. You bring your own API key — choose from cloud providers or run a local model with Ollama.',
      'help.ai_setup_title': 'Setup Steps',
      'help.ai_s1_title': 'Open AI Provider Settings',
      'help.ai_s1_desc': 'In TweetPilot, click <strong>Settings</strong> in the top menu bar, then select <strong>AI Providers</strong>.',
      'help.ai_s2_title': 'Choose a Provider',
      'help.ai_s2_desc': 'Select from the list: OpenAI, Anthropic, DeepSeek, Ollama, or Custom (any OpenAI-compatible endpoint). For Ollama, make sure the local server is running first.',
      'help.ai_s3_title': 'Enter Your API Key',
      'help.ai_s3_desc': 'Paste your API key into the field. Keys are stored encrypted in your macOS Keychain — never sent to TweetPilot servers.',
      'help.ai_s4_title': 'Select Model & Test',
      'help.ai_s4_desc': 'Pick a model from the dropdown, then click "Test Connection". A green checkmark confirms everything is working.',
      'help.ai_tip': 'For best results, use <strong>Claude Sonnet</strong> or <strong>GPT-4o</strong> — they have the largest context windows and best tool-calling accuracy for Twitter automation tasks.',
      'help.ai_ollama_title': 'Using Ollama (Local Models)',
      'help.ai_ollama_desc': 'Ollama runs AI models entirely on your Mac. Install from <a href="https://ollama.ai" target="_blank">ollama.ai</a>, pull a model with <code>ollama pull llama3</code>, then select "Ollama" in TweetPilot settings. The default endpoint is <code>http://localhost:11434</code>.',

      // TweetClaw
      'help.tc_badge': 'Browser Extension',
      'help.tc_title': 'TweetClaw Extension',
      'help.tc_intro': 'TweetClaw is a Chrome extension that acts as a bridge between TweetPilot and your Twitter/X browser session. No API keys needed — it uses your logged-in browser session directly.',
      'help.tc_benefit': 'Using TweetClaw means <strong>no API rate limits</strong>, no developer account required, and access to all Twitter features that the official API doesn\'t expose.',
      'help.tc_s1_title': 'Install from Chrome Web Store',
      'help.tc_s1_desc': 'Visit the <a href="https://chromewebstore.google.com/detail/tweetclaw/nolgcgfoebklpejfgebinnakamjamkna" target="_blank">TweetClaw Chrome Web Store page</a> and click "Add to Chrome". Confirm the permissions prompt.',
      'help.tc_s2_title': 'Open Twitter in Chrome',
      'help.tc_s2_desc': 'Navigate to x.com or twitter.com and make sure you are logged in. TweetClaw automatically starts a local WebSocket server on port 20086 when it detects a Twitter page.',
      'help.tc_s3_title': 'Verify Connection in TweetPilot',
      'help.tc_s3_desc': 'In TweetPilot, go to <strong>Settings → TweetClaw</strong>. You should see a green "Connected" status. If not, try clicking "Reconnect".',
      'help.tc_s4_title': 'Add Account via TweetClaw',
      'help.tc_s4_desc': 'Go to Accounts in TweetPilot, click Add Account, and select "TweetClaw (Browser Mode)". TweetPilot will detect which Twitter account is logged in and import it automatically.',
      'help.tc_trouble_title': 'Troubleshooting',
      'help.tc_trouble_port': '<strong>Port conflict:</strong> If port 20086 is in use by another app, change the port in TweetPilot settings under Settings → TweetClaw → Port, then restart Chrome.',
      'help.tc_trouble_reload': '<strong>Not connecting:</strong> Try refreshing the Twitter tab in Chrome and clicking Reconnect in TweetPilot. Make sure Chrome is not blocking localhost connections.',

      // Accounts
      'help.acc_badge': 'Account Management',
      'help.acc_title': 'Managing Accounts',
      'help.acc_intro': 'TweetPilot supports multiple Twitter/X accounts simultaneously. Each account runs in its own isolated workspace with dedicated credentials.',
      'help.acc_s1_title': 'Open the Accounts Panel',
      'help.acc_s1_desc': 'Click "Accounts" in the left sidebar of TweetPilot. You\'ll see all connected accounts and their status.',
      'help.acc_s2_title': 'Add a New Account',
      'help.acc_s2_desc': 'Click "Add Account" and choose a connection method: TweetClaw (browser session) for no API keys, or X API (direct) if you have developer credentials.',
      'help.acc_s3_title': 'Switch Between Accounts',
      'help.acc_s3_desc': 'Use the account dropdown at the top of any workspace to switch context. Scripts and tasks in each workspace run under their assigned account.',
      'help.acc_s4_title': 'Assign Accounts to Workspaces',
      'help.acc_s4_desc': 'Open a workspace\'s settings and set a "Default Account". All scripts and scheduled tasks in that workspace will use this account unless overridden.',
      'help.acc_tip': 'Use separate workspaces for different accounts to keep automation rules, Data Blocks, and schedules organized and isolated per account.',

      // Scheduler
      'help.sched_badge': 'Automation',
      'help.sched_title': 'Task Scheduler',
      'help.sched_intro': 'Run Python scripts automatically on a schedule. TweetPilot supports both interval-based timing and full cron expressions.',
      'help.sched_pro_title': 'Pro Feature',
      'help.sched_pro_desc': 'Scheduled tasks require a Professional or Enterprise license. The free plan supports manual script execution only.',
      'help.sched_pro_btn': 'View Plans →',
      'help.sched_s1_title': 'Write or Select a Script',
      'help.sched_s1_desc': 'Create a Python script in TweetPilot\'s script editor. The script should be self-contained — it runs without any user interaction.',
      'help.sched_s2_title': 'Click "Schedule This Script"',
      'help.sched_s2_desc': 'In the script editor, click the clock icon or "Schedule" button in the toolbar. This opens the scheduling dialog.',
      'help.sched_s3_title': 'Set Timing',
      'help.sched_s3_desc': 'Choose <strong>Interval</strong> (e.g., every 15 minutes) or <strong>Cron</strong> (e.g., <code>0 9 * * *</code> for 9am daily). Cron uses standard 5-field syntax.',
      'help.sched_s4_title': 'Enable & Monitor',
      'help.sched_s4_desc': 'Toggle the task on. Check the "Scheduled Tasks" panel to see upcoming runs, execution history, and output logs for each run.',
      'help.sched_cron_title': 'Cron Expression Reference',

      // Reports
      'help.rep_badge': 'Analytics',
      'help.rep_title': 'Custom Reports',
      'help.rep_intro': 'Build automated analytics reports with Python and send them to Feishu, email, or any webhook. Reports run on a schedule and deliver insights directly to your team.',
      'help.rep_s1_title': 'Write a Report Script',
      'help.rep_s1_desc': 'Write a Python script that collects data (follower counts, engagement rates, tweet metrics) using the TweetPilot SDK, then formats it as text or markdown.',
      'help.rep_s2_title': 'Configure Output Destination',
      'help.rep_s2_desc': 'Use the SDK\'s built-in output functions to send to Feishu (via webhook URL), print to the task log, or write to a local file for archiving.',
      'help.rep_s3_title': 'Schedule It',
      'help.rep_s3_desc': 'Set a cron schedule (e.g., daily at 9am) so the report runs automatically. No manual triggering needed.',
      'help.rep_example_title': 'Example Report Script',
      'help.rep_tip': 'Reports run as scheduled tasks — they require a Pro license. You can run them manually anytime from the script editor for testing.',

      // X API
      'help.xapi_badge': 'API Integration',
      'help.xapi_title': 'X API Configuration',
      'help.xapi_intro': 'Use the official Twitter/X API for enterprise-grade reliability. Required if you need v2 API endpoints or want to avoid browser-based automation entirely.',
      'help.xapi_v1_label': 'API v1.1',
      'help.xapi_v1_value': 'Full read/write access. Requires Basic developer plan or above.',
      'help.xapi_v2_label': 'API v2',
      'help.xapi_v2_value': 'Newer endpoints, timeline access. OAuth 2.0 with PKCE support.',
      'help.xapi_s1_title': 'Create a Developer Account',
      'help.xapi_s1_desc': 'Go to <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank">developer.twitter.com</a> and sign in with your Twitter account. Apply for developer access if you haven\'t already.',
      'help.xapi_s2_title': 'Create an App',
      'help.xapi_s2_desc': 'In the Developer Portal, create a new App under a Project. Set the app permissions to "Read and Write" to enable posting and interactions.',
      'help.xapi_s3_title': 'Copy Your Keys',
      'help.xapi_s3_desc': 'From the App\'s "Keys and Tokens" page, copy all 4 values: <code>API Key</code>, <code>API Key Secret</code>, <code>Access Token</code>, and <code>Access Token Secret</code>.',
      'help.xapi_s4_title': 'Paste into TweetPilot',
      'help.xapi_s4_desc': 'In TweetPilot, go to <strong>Settings → X API</strong>. Paste all 4 keys and click Save. Then go to Accounts, add a new account, and choose "X API (Direct)".',
      'help.xapi_warn': 'The free X API tier has strict rate limits. For automation-heavy workflows, we recommend upgrading to the Basic tier ($100/month) or using TweetClaw mode instead.',

      // Feishu
      'help.fs_badge': 'Notifications',
      'help.fs_title': 'Feishu / Lark Integration',
      'help.fs_intro': 'Send automated reports, alerts, and summaries directly to your Feishu (Lark) group chats. Set it up in minutes with a webhook URL.',
      'help.fs_s1_title': 'Create a Bot in Your Group Chat',
      'help.fs_s1_desc': 'In Feishu/Lark, open the group chat where you want to receive reports. Click the "..." menu → "Bots" → "Add Bot" → "Custom Bot".',
      'help.fs_s2_title': 'Copy the Webhook URL',
      'help.fs_s2_desc': 'After creating the bot, copy the webhook URL provided. It looks like: https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx',
      'help.fs_s3_title': 'Add to TweetPilot',
      'help.fs_s3_desc': 'In TweetPilot, go to <strong>Settings → Feishu</strong>. Paste the webhook URL and click "Test" to send a test message. You should see it appear in your group chat immediately.',
      'help.fs_s4_title': 'Use in Scripts',
      'help.fs_s4_desc': 'In your Python scripts, call <code>feishu.send_message("your text")</code> to push messages to the configured group. Supports plain text and markdown.',
      'help.fs_contact_title': 'Contact Us on Feishu',
      'help.fs_contact_desc': 'Scan the QR code below to reach our support team directly on Feishu for real-time help.',

      // Upgrade
      'help.upg_badge': 'Plans & Billing',
      'help.upg_title': 'Upgrade & Plans',
      'help.upg_intro': 'TweetPilot is free to start. Upgrade to Pro when you need scheduled automation and AI-powered remote agents.',
      'help.upg_feature': 'Feature',
      'help.upg_free': 'Free',
      'help.upg_pro': 'Pro ($300/yr)',
      'help.upg_row_accounts': 'Multiple Twitter accounts',
      'help.upg_row_scripts': 'Manual Python scripts',
      'help.upg_row_tweetclaw': 'TweetClaw integration',
      'help.upg_row_xapi': 'X API integration',
      'help.upg_row_datablocks': 'Data Blocks & workspaces',
      'help.upg_row_scheduled': 'Scheduled tasks (cron)',
      'help.upg_row_agent': 'AI remote conversation agent',
      'help.upg_row_feishu': 'Feishu bot integration',
      'help.upg_row_devices': 'Devices per license',
      'help.upg_row_support': 'Email support',
      'help.upg_s1_title': 'Purchase a License',
      'help.upg_s1_desc': 'Visit the <a href="/pricing.html">Pricing page</a> and click "Buy License". You\'ll be redirected to Stripe for secure payment. A license key is emailed instantly after purchase.',
      'help.upg_s2_title': 'Activate in TweetPilot',
      'help.upg_s2_desc': 'In TweetPilot, go to <strong>Settings → License</strong>. Paste your license key and click "Activate". The app will verify the key and unlock all Pro features immediately.',
      'help.upg_s3_title': 'Renew or Manage',
      'help.upg_s3_desc': 'Licenses auto-renew annually. To cancel or request a refund within 7 days, email <a href="mailto:ribencong@dessage.xyz">ribencong@dessage.xyz</a>. See our <a href="/refund.html">Refund Policy</a> for details.',
      'help.upg_enterprise': 'Need a permanent license or custom integrations? Our <a href="/pricing.html#enterprise">Enterprise Lifetime plan</a> includes a signed service contract, custom scripts, and dedicated Feishu support. Contact us at <a href="mailto:ribencong@dessage.xyz">ribencong@dessage.xyz</a>.',
    },

    zh: {
      // Page titles
      'index.title': 'TweetPilot — AI 驱动的 Twitter 自动化',
      'pricing.title': '价格 — TweetPilot',

      // Nav
      'nav.features': '功能特点',
      'nav.how_it_works': '工作原理',
      'nav.ai_engine': 'AI 引擎',
      'nav.pricing': '价格',
      'nav.help': '帮助',
      'nav.download': '下载',
      'nav.download_free': '免费下载',

      // Hero
      'hero.badge': 'AI 驱动的 Twitter 自动化 · macOS',
      'hero.h1_line1': '你的 Twitter 工作流，',
      'hero.h1_gradient': '全面自动化',
      'hero.sub': 'TweetPilot 是一款 macOS 桌面应用，让 AI 代理管理你的 Twitter/X —— 定时发布、分析账号、运行 Python 脚本，一切在一个智能工作空间中完成。',
      'hero.btn_download': '下载 macOS 版',
      'hero.btn_extension': '获取 TweetClaw 扩展',
      'hero.meta_local': '本地运行于 macOS',
      'hero.meta_scheduled': '定时自动化',
      'hero.meta_multi': '多账号支持',

      // App mockup
      'mockup.workspaces': '工作空间',
      'mockup.main_workspace': '主工作空间',
      'mockup.growth_campaign': '增长计划',
      'mockup.content_schedule': '内容计划',
      'mockup.accounts': '账号',
      'mockup.active_tasks': '活跃任务',
      'mockup.task1_name': '自动回复提及',
      'mockup.task1_meta': 'mention_reply.py · 每15分钟执行',
      'mockup.task2_name': '每日增长报告',
      'mockup.task2_meta': 'growth_report.py · 每夥09:00定时',
      'mockup.task3_name': '热点搜索并发布',
      'mockup.task3_meta': 'trend_post.py · 数2小时执行',
      'mockup.badge_sched': '定时',
      'mockup.ai_agent': 'TweetPilot Agent',
      'mockup.ai_msg': '发现3个热门话题，正在为 @user 的提及起草回复…',

      // Stats
      'stats.ai_providers': 'AI 提供商',
      'stats.x_modes': 'X 访问模式',
      'stats.scheduled': '定时任务',
      'stats.local': '本地 & 私密',

      // Features
      'features.label': '功能能力',
      'features.title': '统治 Twitter/X<br />所需的一切',
      'features.desc': '以 AI 为核心的全功能桌面工作空间 —— 专为追求完全控制的高级用户打造。',
      'feat1.title': 'AI 驱动的聊天界面',
      'feat1.desc': '直接与 AI 代理对话。让它搜索推文、分析账号、起草内容或执行任何 Twitter 操作 —— 全程通过自然语言交流。',
      'feat2.title': '任务调度',
      'feat2.desc': '设置灵活的间隔或 cron 定时任务。自动运行 Python 脚本 —— 在流量高峰期发布、监控关键词、发送报告。',
      'feat3.title': '多账号管理',
      'feat3.desc': '在一处管理多个 Twitter/X 账号，即时切换上下文。每个账号在独立工作空间中运行，拥有专属凭证。',
      'feat4.title': 'Python 脚本执行',
      'feat4.desc': '编写并运行与 Twitter 交互的 Python 脚本。完整访问 TweetPilot SDK —— 以编程方式搜索、发布、转推、关注和分析数据。',
      'feat5.title': '数据块',
      'feat5.desc': '构建直接馈入 AI 会话的结构化知识库。存储人设、模板、目标受众和品牌指南，确保输出一致。',
      'feat6.title': '飞书 / Lark 集成',
      'feat6.desc': '将 TweetPilot 连接到飞书（Lark）机器人。在企业消息频道中直接接收自动化报告、警报和摘要。',

      // How It Works
      'hiw.label': '工作架构',
      'hiw.title': '两种方式连接 X',
      'hiw.desc': 'TweetPilot 同时支持通过 TweetClaw 的浏览器自动化和直接 API 访问 —— 选择适合你的方式。',
      'hiw.ext_badge': 'Chrome 扩展模式',
      'hiw.ext_title': 'TweetClaw 桥接',
      'hiw.ext_desc': '使用 TweetClaw Chrome 扩展作为本地 WebSocket 桥接。TweetPilot 直接连接到你已登录的浏览器会话 —— 无需 API 密钥，无速率限制烦恰。',
      'hiw.ext_step1': '从应用商店安装 <strong>TweetClaw</strong> Chrome 扩展',
      'hiw.ext_step2': '在 Chrome 中打开 Twitter/X —— 扩展会在 20086 端口启动本地 <strong>WebSocket 服务器</strong>',
      'hiw.ext_step3': 'TweetPilot 通过 LocalBridge 连接，可使用你的浏览器会话进行<strong>读取、发布、搜索和交互</strong>',
      'hiw.ext_link': '从 Chrome 应用商店安装 TweetClaw',
      'hiw.api_badge': '官方 X API 模式',
      'hiw.api_title': '直连 X API',
      'hiw.api_desc': '使用官方 X API 凭证（OAuth 2.0 或 API 密钥）连接，获得企业级可靠性。使用你自己的开发者应用凭证完整访问所有 X API 端点。',
      'hiw.api_step1': '在 <strong>developer.twitter.com</strong> 创建应用并获取 API 密钥',
      'hiw.api_step2': '在 TweetPilot 设置中填入 <strong>Consumer Key、Secret 和 OAuth 令牌</strong>',
      'hiw.api_step3': 'TweetPilot 直接调用 X API —— 支持 <strong>v1.1 和 v2 端点</strong>，自动管理凭证',

      // AI Engine
      'ai.label': 'AI 引擎',
      'ai.title': '接入你自己的 AI 模型',
      'ai.desc': 'TweetPilot 不绑定特定模型。连接 Claude、GPT-4、本地 Ollama 模型或任何兼容 OpenAI 的 API。切换提供商无需改变工作流。',
      'ai.provider1_name': 'Anthropic Claude',
      'ai.provider1_desc': 'Claude 3 Opus / Sonnet',
      'ai.provider2_name': 'OpenAI',
      'ai.provider2_desc': 'GPT-4o / GPT-4 Turbo',
      'ai.provider3_name': 'Ollama',
      'ai.provider3_desc': '本地模型，100% 私密',
      'ai.provider4_name': '自定义 API',
      'ai.provider4_desc': '任何兼容 OpenAI 的端点',
      'ai.chat_header': 'AI 会话 · 主工作空间',
      'ai.chat_user_msg': '搜索过24小时内关于“AI automation”的推文，并点赞互动最高的5条',
      'ai.chat_agent_name': 'TweetPilot Agent',
      'ai.chat_searching': '正在搜索过24小时内关于“AI automation”的推文…',
      'ai.chat_result_label': '结果',
      'ai.chat_found': '找到47条推文，已按互动分数筛选出動5条，正在点赞…',
      'ai.chat_done': '✓ 已成功点赞5条推文',

      // Integrations
      'int.label': '集成',
      'int.title': '与你的技术栈无缝集成',
      'int.twitter_desc': '通过 TweetClaw 或官方 X API 完整读写',
      'int.tweetclaw_desc': 'Chrome 扩展 WebSocket 桥接，实现免 API 访问',
      'int.feishu_desc': '向企业飞书机器人推送报告和通知',
      'int.python_desc': '使用 TweetPilot 本地 SDK 执行自定义自动化脚本',

      // Pricing section (index)
      'pricing.label': '价格',
      'pricing.title': '简单透明的定价',
      'pricing.desc': '免费开始。当你需要定时自动化和 AI 远程对话时再升级。',
      'pricing.view_full': '查看完整定价和 FAQ',

      // Plan — Free
      'plan.free_badge': '免费',
      'plan.free_name': '入门版',
      'plan.free_sub': '永久免费，无需信用卡',
      'plan.feat_multi_account': '多账号管理',
      'plan.feat_manual_task': '手动任务执行',
      'plan.feat_python': 'Python 脚本运行器',
      'plan.feat_x_api': 'X API 和 TweetClaw 支持',
      'plan.feat_workspace': '工作空间和数据块',
      'plan.feat_scheduled_no': '定时任务（间隔和 cron）',
      'plan.feat_ai_agent_no': 'AI 远程对话代理',
      'plan.feat_feishu_no': '飞书 / Lark 集成',
      'plan.free_btn': '免费下载',

      // Plan — Pro
      'plan.pro_badge': '最受欢迎',
      'plan.pro_name': '专业版',
      'plan.pro_period': '/ 年',
      'plan.pro_sub': '1 个许可证 · 最夷2台设备 · 1年',
      'plan.feat_everything_starter': '包含入门版所有功能',
      'plan.feat_scheduled': '<strong style="color:var(--color-text);">定时任务</strong> — 间隔和 cron',
      'plan.feat_ai_agent': '<strong style="color:var(--color-text);">AI 远程对话</strong>代理',
      'plan.feat_feishu_bot': '飞书 / Lark 机器人集成',
      'plan.feat_2devices': '每个许可证2台设备',
      'plan.feat_email_support': '邮件支持',
      'plan.feat_12months': '许可证有效期12个月',
      'plan.pro_btn': '购买许可证 — $300/年',

      // Plan — Enterprise
      'plan.ent_badge': '企业版',
      'plan.ent_name': '终身版 & 定制',
      'plan.ent_price': '定制报价',
      'plan.ent_sub_index': '线下付款 · 签署合同',
      'plan.ent_sub_pricing': '线下付款 · 需签合同',
      'plan.feat_everything_pro': '包含专业版所有功能',
      'plan.feat_lifetime': '<strong style="color:var(--color-text);">终身许可证</strong> — 无需续费',
      'plan.feat_training': 'AI 工作流培训和入门指导',
      'plan.feat_custom_scripts': '定制 AI 脚本和报告',
      'plan.feat_priority_support': '通过飞书提供优先支持',
      'plan.feat_contract': '签署服务合同',
      'plan.ent_btn': '联系我们',

      // Download
      'download.label': '下载',
      'download.title': '准备好自动化了吗？',
      'download.desc': 'TweetPilot 是原生 macOS 应用。几分钟内即可下载、安装并连接你的账号。',
      'download.btn': '下载 macOS .dmg',
      'download.ext_link': '同时安装 TweetClaw Chrome 扩展',
      'download.req': 'macOS 12 Monterey 或更高版本 · Apple Silicon 和 Intel',

      // Footer
      'footer.copyright': '© 2026 TweetPilot. 保留所有权利。',
      'footer.terms': '服务条款',
      'footer.privacy': '隐私政策',
      'footer.refund': '退款政策',
      'footer.help': '帮助中心',
      'footer.contact': '联系我们',

      // Contact modal
      'modal.title': '联系我们',
      'modal.sub': '通过邮件或扫描下方飞书二维码联系我们',
      'modal.email_label': '邮件',
      'modal.feishu_label': '飞书 / Lark',
      'modal.send': '发送',
      'modal.copy': '复制',
      'modal.copied': '已复制',
      'modal.qr_hint': '用飞书扫码开始对话',

      // Pricing page header
      'pp.label': '价格',
      'pp.title_before': '简单，',
      'pp.title_gradient': '透明',
      'pp.title_after': '的定价',
      'pp.sub': '免费开始。当你需要定时自动化和 AI 远程对话时再升级。',

      // FAQ
      'faq.title': '常见问题',
      'faq.q1': '免费计划包含哪些内容？',
      'faq.a1': '免费计划允许你管理多个 Twitter/X 账号、手动运行 Python 脚本、使用 TweetClaw 浏览器扩展或 X API，以及使用数据块构建工作空间。唯一限制是定时（自动）任务和 AI 远程对话代理 —— 这些功能需要付费许可证。',
      'faq.q2': '每个许可证可以使用多少台设备？',
      'faq.a2': '每个专业版许可证最多支持2台设备同时使用。如果需要更多设备，可以购买额外的许可证。',
      'faq.q3': '年度许可证到期后会怎样？',
      'faq.a3': '许可证到期后，你的账号将恢复到免费计划。所有数据、工作空间和脚本均完好保留 —— 只是失去定时任务和 AI 对话代理的访问权限，续费后即可恢复。',
      'faq.q4': '什么是企业终身计划？',
      'faq.a4': '终身计划是一种线下、基于合同的安排，专为需要永久许可证及实操服务的企业或高级用户设计：AI 工作流培训、定制报告开发和专属脚本编写。付款通过线下签署服务合同进行。请通过 ribencong@dessage.xyz 或飞书联系我们洽谈。',
      'faq.q5': '是否提供退款？',
      'faq.a5': '是的。如果不满意，我们为年度许可证提供7天退款保障。详情请查看我们的<a href="/refund.html" style="color:var(--color-secondary);">退款政策</a>。',
      'faq.q6': '我的数据会存储在你们的服务器上吗？',
      'faq.a6': '不会。TweetPilot 完全在你的 macOS 设备上本地运行。你的凭证、脚本和工作空间永远不会离开你的设备。向我们服务器发出的唯一网络请求是许可证验证。',

      // Help page — sidebar
      'help.sidebar_label': '文档',
      'help.nav_quickstart': '快速入门',
      'help.nav_ai': 'AI 模型配置',
      'help.nav_tweetclaw': 'TweetClaw',
      'help.nav_accounts': '账号管理',
      'help.nav_scheduler': '任务调度',
      'help.nav_reports': '自定义报告',
      'help.nav_xapi': 'X API',
      'help.nav_feishu': '飞书集成',
      'help.nav_upgrade': '升级与套餐',
      'help.contact_label': '联系支持',
      'help.feishu_contact': '飞书 / Lark 二维码',
      'help.feishu_hint': '点击查看二维码',
      'help.qr_sub': '用飞书扫码获取实时支持',
      'help.qr_close': '关闭',

      // 快速入门
      'help.qs_badge': '开始使用',
      'help.qs_title': '快速入门指南',
      'help.qs_intro': '5分钟内完成 TweetPilot 的安装和配置，按顺序操作即可。',
      'help.qs_s1_title': '下载并安装',
      'help.qs_s1_desc': '访问<a href="/#download">首页</a>下载最新的 <code>TweetPilot.dmg</code>。打开 DMG 文件，将 TweetPilot 拖入应用程序文件夹，然后启动。需要 macOS 12 Monterey 或更高版本。',
      'help.qs_s2_title': '安装 TweetClaw 扩展',
      'help.qs_s2_sub1': '打开 <a href="https://chromewebstore.google.com/detail/tweetclaw/nolgcgfoebklpejfgebinnakamjamkna" target="_blank" rel="noopener">Chrome 应用商店页面</a>，点击 <strong>添加至 Chrome</strong>。在权限弹窗中点击确认——TweetClaw 仅需访问 x.com 的权限。',
      'help.qs_s2_sub2_main': '将 TweetClaw 固定到工具栏，方便随时查看连接状态。点击 Chrome 工具栏右侧的<strong>拼图图标</strong>，在列表中找到 TweetClaw，点击旁边的<strong>固定图标</strong>即可。',
      'help.qs_s2_sub2_alt': '<strong>看不到拼图图标？</strong> 在没有安装扩展的浏览器上，拼图图标不会显示。此时点击 Chrome 右上角的<strong>三点菜单（⋮）</strong>→ <strong>扩展程序</strong> → <strong>管理扩展程序</strong>，在列表中找到 TweetClaw 并确认已启用，返回工具栏后拼图图标就会出现。',
      'help.qs_s2_sub3': '在同一个 Chrome 窗口中打开 <a href="https://x.com" target="_blank" rel="noopener">x.com</a>，并确保你已登录 Twitter/X 账号。TweetClaw 会自动激活，并在后台启动本地 WebSocket 桥接服务。',
      'help.qs_s2_sub4': '点击工具栏中的 TweetClaw 图标，弹出面板会显示已连接的 <strong>Twitter 用户名</strong>和当前使用的<strong>端口号</strong>（默认：<code>20086</code>）。请确认两项信息均正常显示。',
      'help.qs_s2_sub5': '在 TweetPilot 中打开 <strong>设置 → LocalBridge</strong>。LocalBridge 管理多个不同用途的端口，找到其中的<strong>浏览器扩展端口</strong>，确认其与 TweetClaw 弹出面板中显示的端口号一致。<strong>这两个端口必须相同</strong>——如果你修改了其中一处，另一处也需要同步更新，否则 TweetClaw 将无法连接到 TweetPilot。',
      'help.qs_s3_title': '配置 AI 模型',
      'help.qs_s3_sub1': '在 TweetPilot 中点击顶部菜单栏的 <strong>设置</strong>，选择 <strong>AI 提供商</strong>。',
      'help.qs_s3_sub2': '从列表中选择一个提供商。如果不确定选哪个：<strong>DeepSeek</strong> 是入门成本最低的选择；<strong>Claude Sonnet</strong> 或 <strong>GPT-4o</strong> 在复杂自动化任务上效果最佳。',
      'help.qs_s3_sub3': '将 API 密钥粘贴到输入框中。密钥经过加密后存储在 macOS 钥匙串中，不会离开你的 Mac。还没有密钥？前往 <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">OpenAI</a>、<a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">Anthropic</a> 或 <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">DeepSeek</a> 申请。',
      'help.qs_s3_sub4': '从下拉列表中选择一个模型，然后点击 <strong>测试连接</strong>。出现绿色勾号表示密钥有效、模型可用，配置完成。',
      'help.qs_s3_ollama': '<strong>想用本地模型？</strong> TweetPilot 同样支持 <a href="https://ollama.ai" target="_blank" rel="noopener">Ollama</a>——在 Mac 上启动 Ollama 服务后，将提供商选为「Ollama」即可，无需 API 密钥。详情请参阅 <a href="javascript:void(0)" onclick="showSection(\'ai-config\')">AI 模型配置</a> 章节。',
      'help.qs_s4_title': '添加 Twitter 账号',
      'help.qs_s4_sub1': '点击左侧边栏的 <strong>账号</strong>，然后点击 <strong>添加账号</strong>。',
      'help.qs_s4_sub2': '选择连接方式。推荐大多数用户使用 <strong>TweetClaw（浏览器模式）</strong>——它直接读取 Chrome 中已登录的 Twitter 会话，无需填写密码或 Token。<strong>X API（直连模式）</strong>使用你自己的开发者凭证运行，不依赖浏览器扩展，但需要先在 Twitter 开发者门户创建应用并获取密钥。',
      'help.qs_s4_sub3': '如果选择了 TweetClaw：确保 Chrome 已打开 x.com 且 TweetClaw 处于激活状态。TweetPilot 会自动识别你的登录会话并显示 Twitter 用户名，点击 <strong>确认</strong> 完成添加。',
      'help.qs_s4_sub4': '添加成功后，账号会出现在账号列表中，并显示<strong>绿色状态指示灯</strong>。你可以添加多个账号，随时通过侧边栏顶部的账号下拉菜单切换。',
      'help.qs_s5_title': '运行第一个脚本',
      'help.qs_s5_sub1': '点击侧边栏的 <strong>新建工作空间</strong>，创建你的第一个工作空间。工作空间是你管理脚本、数据块和 AI 对话的地方，通常对应一个具体目标。',
      'help.qs_s5_sub2': '打开 <strong>AI 聊天</strong>面板。这是你下达指令的主界面——用自然语言描述你的需求，Agent 会自动处理代码编写和 Twitter API 调用。',
      'help.qs_s5_sub3': '用下面这个例子验证一切是否正常运行：<br /><br /><em>"搜索最近 5 条提到「AI 自动化」的推文，显示用户名和点赞数。"</em><br /><br />Agent 会自动编写并执行脚本，然后在聊天界面中展示结果。',
      'help.qs_s5_sub4': '如果看到结果返回——说明一切配置成功。接下来你可以继续追问、将脚本保存复用，或将其绑定到定时任务让它自动运行。',
      'help.qs_tip': '你的所有数据——凭证、脚本、工作空间——都<strong>100% 存储在本地</strong> Mac 上。除许可证验证外，不会上传任何内容到我们的服务器。',

      // AI 配置
      'help.ai_badge': '配置',
      'help.ai_title': 'AI 模型配置',
      'help.ai_intro': 'TweetPilot 支持任意 AI 提供商，使用你自己的 API 密钥——可选云端服务或用 Ollama 在本地运行模型。',
      'help.ai_setup_title': '配置步骤',
      'help.ai_s1_title': '打开 AI 提供商设置',
      'help.ai_s1_desc': '在 TweetPilot 中点击顶部菜单的 <strong>设置</strong>，选择 <strong>AI 提供商</strong>。',
      'help.ai_s2_title': '选择提供商',
      'help.ai_s2_desc': '从列表中选择：OpenAI、Anthropic、DeepSeek、Ollama 或自定义（任何兼容 OpenAI 的端点）。使用 Ollama 前请确保本地服务已启动。',
      'help.ai_s3_title': '输入 API 密钥',
      'help.ai_s3_desc': '将 API 密钥粘贴到输入框中。密钥加密存储在 macOS 钥匙串中，不会发送至 TweetPilot 服务器。',
      'help.ai_s4_title': '选择模型并测试',
      'help.ai_s4_desc': '从下拉列表中选择模型，点击「测试连接」，出现绿色勾号表示配置成功。',
      'help.ai_tip': '推荐使用 <strong>Claude Sonnet</strong> 或 <strong>GPT-4o</strong>——它们拥有最大的上下文窗口，在 Twitter 自动化任务的工具调用上表现最佳。',
      'help.ai_ollama_title': '使用 Ollama（本地模型）',
      'help.ai_ollama_desc': 'Ollama 可在你的 Mac 上完全本地运行 AI 模型。从 <a href="https://ollama.ai" target="_blank">ollama.ai</a> 安装，用 <code>ollama pull llama3</code> 拉取模型，在 TweetPilot 设置中选择"Ollama"。默认端点为 <code>http://localhost:11434</code>。',

      // TweetClaw
      'help.tc_badge': '浏览器扩展',
      'help.tc_title': 'TweetClaw 扩展',
      'help.tc_intro': 'TweetClaw 是一个 Chrome 扩展，作为 TweetPilot 与 Twitter/X 浏览器会话之间的桥接。无需 API 密钥——直接使用你已登录的浏览器会话。',
      'help.tc_benefit': '使用 TweetClaw 意味着<strong>无 API 速率限制</strong>，无需开发者账号，还能访问官方 API 没有开放的所有 Twitter 功能。',
      'help.tc_s1_title': '从 Chrome 应用商店安装',
      'help.tc_s1_desc': '访问 <a href="https://chromewebstore.google.com/detail/tweetclaw/nolgcgfoebklpejfgebinnakamjamkna" target="_blank">TweetClaw Chrome 应用商店页面</a>，点击「添加至 Chrome」，确认权限提示。',
      'help.tc_s2_title': '在 Chrome 中打开 Twitter',
      'help.tc_s2_desc': '访问 x.com 或 twitter.com，确保已登录。当 TweetClaw 检测到 Twitter 页面时，会自动在 20086 端口启动本地 WebSocket 服务。',
      'help.tc_s3_title': '在 TweetPilot 中验证连接',
      'help.tc_s3_desc': '在 TweetPilot 中进入 <strong>设置 → TweetClaw</strong>，应显示绿色「已连接」状态。若未连接，尝试点击「重新连接」。',
      'help.tc_s4_title': '通过 TweetClaw 添加账号',
      'help.tc_s4_desc': '在 TweetPilot 中进入账号，点击「添加账号」，选择「TweetClaw（浏览器模式）」，TweetPilot 会自动识别已登录的 Twitter 账号并导入。',
      'help.tc_trouble_title': '常见问题排查',
      'help.tc_trouble_port': '<strong>端口冲突：</strong>如果 20086 端口被其他应用占用，在设置 → TweetClaw → 端口中修改端口号，然后重启 Chrome。',
      'help.tc_trouble_reload': '<strong>无法连接：</strong>尝试刷新 Chrome 中的 Twitter 标签页，并在 TweetPilot 中点击「重新连接」。确保 Chrome 没有阻止 localhost 连接。',

      // 账号管理
      'help.acc_badge': '账号管理',
      'help.acc_title': '管理账号',
      'help.acc_intro': 'TweetPilot 支持同时管理多个 Twitter/X 账号，每个账号在独立工作空间中运行，拥有专属凭证。',
      'help.acc_s1_title': '打开账号面板',
      'help.acc_s1_desc': '点击 TweetPilot 左侧边栏中的「账号」，可以看到所有已连接账号及其状态。',
      'help.acc_s2_title': '添加新账号',
      'help.acc_s2_desc': '点击「添加账号」，选择连接方式：TweetClaw（浏览器会话，无需 API 密钥）或 X API（直连，需要开发者凭证）。',
      'help.acc_s3_title': '切换账号',
      'help.acc_s3_desc': '使用任意工作空间顶部的账号下拉菜单切换上下文，每个工作空间中的脚本和任务在各自绑定的账号下运行。',
      'help.acc_s4_title': '为工作空间分配账号',
      'help.acc_s4_desc': '打开工作空间设置，设置「默认账号」，该工作空间的所有脚本和定时任务将默认使用此账号（可单独覆盖）。',
      'help.acc_tip': '为不同账号使用独立工作空间，可以更好地隔离和管理各账号的自动化规则、数据块和调度计划。',

      // 任务调度
      'help.sched_badge': '自动化',
      'help.sched_title': '任务调度器',
      'help.sched_intro': '按计划自动执行 Python 脚本。TweetPilot 支持间隔定时和完整的 cron 表达式两种方式。',
      'help.sched_pro_title': 'Pro 功能',
      'help.sched_pro_desc': '定时任务需要专业版或企业版许可证，免费版仅支持手动执行脚本。',
      'help.sched_pro_btn': '查看套餐 →',
      'help.sched_s1_title': '编写或选择脚本',
      'help.sched_s1_desc': '在 TweetPilot 脚本编辑器中创建 Python 脚本。脚本应能独立运行，无需用户交互。',
      'help.sched_s2_title': '点击「调度此脚本」',
      'help.sched_s2_desc': '在脚本编辑器中点击时钟图标或工具栏中的「调度」按钮，打开调度配置对话框。',
      'help.sched_s3_title': '设置定时规则',
      'help.sched_s3_desc': '选择<strong>间隔</strong>（如每 15 分钟）或 <strong>Cron</strong>（如 <code>0 9 * * *</code> 表示每天 9 点）。Cron 使用标准 5 字段语法。',
      'help.sched_s4_title': '启用并监控',
      'help.sched_s4_desc': '开启任务开关，在「定时任务」面板中查看下次执行时间、执行历史和每次运行的输出日志。',
      'help.sched_cron_title': 'Cron 表达式参考',

      // 自定义报告
      'help.rep_badge': '数据分析',
      'help.rep_title': '自定义报告',
      'help.rep_intro': '用 Python 构建自动化分析报告，发送到飞书、邮件或任意 Webhook。报告按计划运行，将洞察直接推送给你的团队。',
      'help.rep_s1_title': '编写报告脚本',
      'help.rep_s1_desc': '编写 Python 脚本，使用 TweetPilot SDK 收集数据（粉丝数、互动率、推文指标），然后格式化为文本或 Markdown。',
      'help.rep_s2_title': '配置输出目标',
      'help.rep_s2_desc': '使用 SDK 内置的输出函数发送到飞书（通过 Webhook URL）、打印到任务日志，或写入本地文件存档。',
      'help.rep_s3_title': '设置定时计划',
      'help.rep_s3_desc': '设置 cron 计划（如每天 9 点），报告会自动运行，无需手动触发。',
      'help.rep_example_title': '示例报告脚本',
      'help.rep_tip': '报告作为定时任务运行，需要 Pro 许可证。测试时可随时从脚本编辑器手动运行。',

      // X API
      'help.xapi_badge': 'API 集成',
      'help.xapi_title': 'X API 配置',
      'help.xapi_intro': '使用官方 Twitter/X API 获得企业级稳定性。如果需要 v2 API 端点或希望完全避免浏览器自动化，请使用此模式。',
      'help.xapi_v1_label': 'API v1.1',
      'help.xapi_v1_value': '完整读写权限，需要基础或更高级别的开发者计划。',
      'help.xapi_v2_label': 'API v2',
      'help.xapi_v2_value': '更新的端点，支持时间线访问，支持 OAuth 2.0 + PKCE。',
      'help.xapi_s1_title': '创建开发者账号',
      'help.xapi_s1_desc': '访问 <a href="https://developer.twitter.com/en/portal/dashboard" target="_blank">developer.twitter.com</a>，用 Twitter 账号登录，申请开发者访问权限。',
      'help.xapi_s2_title': '创建应用',
      'help.xapi_s2_desc': '在开发者门户中，在项目下创建新应用，将应用权限设置为「读写」以支持发帖和互动操作。',
      'help.xapi_s3_title': '复制你的密钥',
      'help.xapi_s3_desc': '在应用的「密钥和令牌」页面，复制全部 4 个值：<code>API Key</code>、<code>API Key Secret</code>、<code>Access Token</code> 和 <code>Access Token Secret</code>。',
      'help.xapi_s4_title': '填入 TweetPilot',
      'help.xapi_s4_desc': '在 TweetPilot 中进入 <strong>设置 → X API</strong>，粘贴全部 4 个密钥并保存。然后在账号中添加新账号，选择「X API（直连）」。',
      'help.xapi_warn': 'X API 免费版有严格的速率限制。对于高频自动化工作流，建议升级到基础版（$100/月）或改用 TweetClaw 模式。',

      // 飞书
      'help.fs_badge': '通知推送',
      'help.fs_title': '飞书 / Lark 集成',
      'help.fs_intro': '将自动化报告、告警和摘要直接发送到飞书（Lark）群聊。只需一个 Webhook URL，几分钟内完成配置。',
      'help.fs_s1_title': '在群聊中创建机器人',
      'help.fs_s1_desc': '在飞书/Lark 中打开要接收报告的群聊，点击「...」菜单 → 「机器人」→「添加机器人」→「自定义机器人」。',
      'help.fs_s2_title': '复制 Webhook URL',
      'help.fs_s2_desc': '创建机器人后，复制提供的 Webhook URL，格式类似：https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx',
      'help.fs_s3_title': '添加到 TweetPilot',
      'help.fs_s3_desc': '在 TweetPilot 中进入 <strong>设置 → 飞书</strong>，粘贴 Webhook URL 并点击「测试」，你的群聊中应立即收到测试消息。',
      'help.fs_s4_title': '在脚本中使用',
      'help.fs_s4_desc': '在 Python 脚本中调用 <code>feishu.send_message("你的内容")</code> 向已配置的群聊推送消息，支持纯文本和 Markdown 格式。',
      'help.fs_contact_title': '通过飞书联系我们',
      'help.fs_contact_desc': '扫描下方二维码，直接在飞书上联系我们的支持团队获取实时帮助。',

      // 升级
      'help.upg_badge': '套餐与计费',
      'help.upg_title': '升级与套餐',
      'help.upg_intro': 'TweetPilot 免费开始使用，需要定时自动化和 AI 远程代理时再升级到 Pro。',
      'help.upg_feature': '功能',
      'help.upg_free': '免费版',
      'help.upg_pro': 'Pro（$300/年）',
      'help.upg_row_accounts': '多 Twitter 账号',
      'help.upg_row_scripts': '手动 Python 脚本',
      'help.upg_row_tweetclaw': 'TweetClaw 集成',
      'help.upg_row_xapi': 'X API 集成',
      'help.upg_row_datablocks': '数据块与工作空间',
      'help.upg_row_scheduled': '定时任务（cron）',
      'help.upg_row_agent': 'AI 远程对话代理',
      'help.upg_row_feishu': '飞书机器人集成',
      'help.upg_row_devices': '每个许可证设备数',
      'help.upg_row_support': '邮件支持',
      'help.upg_s1_title': '购买许可证',
      'help.upg_s1_desc': '访问<a href="/pricing.html">价格页面</a>点击「购买许可证」，跳转到 Stripe 安全支付，购买完成后许可证密钥立即发送至你的邮箱。',
      'help.upg_s2_title': '在 TweetPilot 中激活',
      'help.upg_s2_desc': '在 TweetPilot 中进入 <strong>设置 → 许可证</strong>，粘贴许可证密钥并点击「激活」，应用验证后立即解锁所有 Pro 功能。',
      'help.upg_s3_title': '续费或管理',
      'help.upg_s3_desc': '许可证每年自动续费。如需取消或在 7 天内申请退款，请发送邮件至 <a href="mailto:ribencong@dessage.xyz">ribencong@dessage.xyz</a>，详见<a href="/refund.html">退款政策</a>。',
      'help.upg_enterprise': '需要永久许可证或定制集成？我们的<a href="/pricing.html#enterprise">企业终身版</a>包含签署服务合同、定制脚本和专属飞书支持。联系我们：<a href="mailto:ribencong@dessage.xyz">ribencong@dessage.xyz</a>。',
    }
  };

  /* ─── Core engine ────────────────────────────────────────────── */
  /* Language priority:
   * 1. User's explicit choice (saved in localStorage)
   * 2. Browser / OS language (navigator.language)
   * 3. Fallback → 'en'
   */
  function detectBrowserLang() {
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.startsWith('zh') ? 'zh' : 'en';
  }
  var lang = localStorage.getItem('tp_lang') || detectBrowserLang();

  function t(key) {
    return (T[lang] && T[lang][key]) || (T['en'] && T['en'][key]) || key;
  }

  function applyTranslations() {
    // textContent
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    // innerHTML (for <strong>, <br/>, <a> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    // Page title
    var titleKey = document.documentElement.getAttribute('data-title-key');
    if (titleKey) document.title = t(titleKey);
    // html lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    // Toggle button label
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? '中文' : 'EN';
  }

  /* Expose globally so inline onclick handlers can call toggleLang() */
  window.toggleLang = function () {
    lang = lang === 'en' ? 'zh' : 'en';
    localStorage.setItem('tp_lang', lang);
    applyTranslations();
  };

  /* Expose t() so inline scripts (e.g. copyEmail) can use it */
  window.i18n = { t: t };

  document.addEventListener('DOMContentLoaded', applyTranslations);
})();
