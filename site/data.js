/* DevPixel site content, shared by index-minimal.html and project.html.
   Follow-ups use q:<key> (answered from QA), go:<id> (go to a part of the site) or p:<id> (a project). */

const ROWS={
 'r-ai':{name:'AI products',say:`Two products built on our retrieval research. Both answer only from a trusted set of sources and show where every answer came from: one for retirement law, one for procurement.`,items:['askerisa','vault'],
   qs:[['How are these two different?','q:aidiff'],['Could this work on our own documents?','q:owndocs']]},
 'r-platforms':{name:'Platforms',say:`Signed-in software people use every day: one for the admin keeping a bank's training on track, one for the learner working through their courses.`,items:['dashboard','portal'],
   qs:[['Who is each one built for?','q:platwho'],['How does the AI coach in Kiln work?','q:coach']]},
 'r-web':{name:'Websites',say:`Public pages that have to win someone over, so they lean expressive: a certification people apply for, a gym app launch and a conference.`,items:['cert','iron','signal'],
   qs:[['Did you design the app as well as the site?','q:appandsite'],['Why does Signal look so different?','q:signalstyle']]}
};

const P={
 askerisa:{name:'AskERISA',tag:'Legal AI · American Retirement Association',row:'r-ai',
   say:`Answers retirement-law questions using only the ERISA corpus. Every claim is cited, and low-confidence questions go to a human expert. The admin console tracks answer quality and expert review.`,
   facts:[['14,842','questions last week'],['94%','fully cited'],['1.9%','sent to an expert']],
   qs:[['How does the expert hand-off work?','q:escalation'],['What happens when sources disagree?','q:conflict']],
   screens:[
     {label:'Admin overview',src:'work/askerisa-overview.html',url:'askerisa.com/admin',look:[
       `<b>The top row</b> is answer quality at a glance: queries processed, citation coverage, confidence, declines and cost per query.`,
       `<b>Confidence by model</b> plots each model against the 0.85 threshold, the line below which questions go to a person.`,
       `<b>Response outcomes</b> splits every question into answered, declined or escalated to an expert.`,
       `<b>Priority risks and the latest escalation</b> show what needs a human today.`]},
     {label:'Query debugger',src:'work/askerisa-debugger.html',url:'askerisa.com/admin/debugger',look:[
       `<b>How the question was understood</b>: the question as asked, and how it was rewritten before searching.`,
       `<b>Evidence considered</b>: every source that was looked at, and the reason each discarded one was dropped.`,
       `<b>Execution timeline</b>: how long each stage took, so slow steps stand out.`]}]},
 vault:{name:'Vendor Vault',tag:'Procurement · AI search',row:'r-ai',
   say:`Ask for a vendor in plain language, compare them on real delivery history, and shortlist in one place. It explains why it recommends the safest pick.`,
   qs:[['Where does the delivery history come from?','q:vaultdata'],['How does it choose the safest vendor?','q:safest']],
   screens:[{label:'Vendor directory',src:'work/vendor-vault.html',url:'vendorvault.app/directory',look:[
       `<b>The search bar</b> takes a whole request, like injection moulding vendors near Hyderabad who can deliver in under three weeks.`,
       `<b>Each vendor card</b> leads with delivery record, so you compare track record rather than sales pitch.`,
       `<b>Compare</b> lines up the vendors you pick side by side before you shortlist.`]}]},
 dashboard:{name:'Ashgrove Academy',tag:'Banking · Admin dashboard',row:'r-platforms',
   say:`Compliance training for a bank. The design question was simple: <b>who needs attention today?</b> So past-due people and deadlines sit above the charts.`,
   facts:[['1,284','staff'],['42','branches']],
   qs:[['Why put "needs attention" above the charts?','q:chartsbottom'],['Do you design other dashboards?','q:dashboards']],
   screens:[{label:'Training overview',src:'work/training-dashboard.html',url:'ashgrove.academy/admin',look:[
       `<b>Needs attention and Coming up</b> answer "who do I chase today?" before anything else.`,
       `<b>Mandatory completion by business line</b> shows where the bank is behind on required training.`,
       `<b>Branches and operations centres</b> break it down by location, across all 42 branches.`]}]},
 portal:{name:'Kiln',tag:'Learning · Member portal',row:'r-platforms',
   say:`A signed-in home for learners: what to continue, where they are in a certification, and an AI coach that knows their coursework.`,
   qs:[['How does the AI coach know my coursework?','q:coach'],['What does the certification path show?','q:certpath']],
   screens:[{label:'Learner home',src:'work/learner-portal.html',url:'kiln.learn/home',look:[
       `<b>The current course</b> sits first, with what's up next in the module.`,
       `<b>Your certification path</b> shows four stages, from Foundations to Certified educator, with the current one marked.`,
       `<b>Picked for you</b> and <b>Live sessions</b> fill the rest, so the page answers "what should I do this week?"`]}]},
 cert:{name:'Skyline',tag:'Credentials · Certification',row:'r-web',
   say:`A certification page for commercial drone pilots. It answers the three questions people actually have: am I eligible, what does it take, and can a client verify it?`,
   qs:[['How can a client verify a pilot?','q:verify'],['What are the steps to certify?','q:steps']],
   screens:[{label:'Certification page',src:'work/certification.html',url:'skyline.org/commercial-drone-pilot',look:[
       `<b>How you'll earn it</b> lays out five steps, from checking eligibility to getting the credential.`,
       `<b>Quick eligibility check</b> lets a pilot find out in seconds whether they can apply.`,
       `<b>Every pilot, verifiable in seconds</b> is the part for clients hiring a certified pilot.`]}]},
 iron:{name:'Iron Temple',tag:'Fitness · Mobile app & launch',row:'r-web',
   say:`A gym training app where AI drafts the plan and a real coach approves it, with live help on the gym floor. The launch site plays the app's own screens live.`,
   facts:[['140+','gyms'],['14','languages']],
   qs:[['Are those real app screens?','q:ironscreens'],['How do coaches approve plans?','q:coachapprove']],
   screens:[{label:'Launch site',src:'work/iron-temple.html',url:'irontemple.app',look:[
       `<b>The three phones</b> run the real app: a workout in progress, the home screen and coach chat.`,
       `<b>How coaching works</b> explains the split: AI does the maths, coaches make the call.`,
       `<b>Plans</b> is a comparison table, so choosing a tier takes one look.`]}]},
 signal:{name:'Signal 27',tag:'Education · Conference site',row:'r-web',
   say:`A conference site with a poster-loud identity, and a programme planner that flags clashes between sessions.`,
   facts:[['3','days'],['140','sessions'],['4,000','people']],
   qs:[['How does the clash warning work?','q:clash'],['Why the poster style?','q:signalstyle']],
   screens:[{label:'Conference site',src:'work/signal-event.html',url:'signalconf.org',look:[
       `<b>The hero</b> is a poster, not a banner: the event's name does all the work.`,
       `<b>Build your days</b> is the programme planner. Add sessions and it warns you when two overlap.`,
       `<b>Pick your pass</b> keeps three options side by side: Explorer, Full pass and School team.`]}]}
};
const PORDER=['askerisa','vault','dashboard','portal','cert','iron','signal'];

/* answers to follow-ups and typed questions */
const QA={
 about:{a:`We're an AI research firm. We work on retrieval accuracy and safe reasoning, mostly with academia, think tanks and government, and our studio Pixel designs the products.`,go:'go:research'},
 accuracy:{a:`We measure how often an answer cites the right source, how grounded it is, and how often the system correctly declines. AskERISA runs at 94% citation coverage.`,go:'go:research'},
 refuse:{a:`When confidence falls below a set threshold, the system declines or hands the question to a human expert instead of guessing. In AskERISA that's 1.9% of questions.`,go:'p:askerisa'},
 discard:{a:`Sources get discarded when they're stale, low-authority or superseded by a newer rule. The debugger shows the reason next to each one.`,go:'p:askerisa'},
 pixel:{a:`Yes. Pixel takes design-only projects too: dashboards, AI interfaces, portals and launch sites.`,go:'go:studio'},
 cost:{a:`It depends on scope. Most clients start with a three-week assessment, and we quote after a first call.`,go:'go:consulting'},
 timeline:{a:`An assessment takes three weeks. A build usually runs from week 4 to week 12, and governance is ongoing.`,go:'go:consulting'},
 private:{a:`Yes, in limited numbers. Most of our work is with academia, think tanks and government, but we take a few commercial engagements.`,go:'go:consulting'},
 audit:{a:`Yes. The assessment phase starts by measuring how often your current system's answers are right, and which sources it trusts.`,go:'go:consulting'},
 draft:{a:`Tell me in a sentence or two: what you need answered, who asks the questions, and where the answers come from today. I'll pass it to the team, or you can email info@devpixel.com.`},
 aidiff:{a:`Same research underneath, different sources. AskERISA answers from a fixed legal corpus and must cite every claim. Vendor Vault ranks vendors from your own delivery history and explains its pick.`},
 owndocs:{a:`Yes, that's what an engagement is for. We start by mapping your sources and measuring how often today's answers are right.`,go:'go:consulting'},
 platwho:{a:`Ashgrove is for the training admin at a bank, who needs to know who's behind. Kiln is for the learner, who needs to know what to do next.`},
 coach:{a:`The coach answers from the course material the learner is enrolled in, the same way AskERISA answers only from its own corpus.`,go:'p:portal'},
 certpath:{a:`Four stages: Foundations, Practitioner, Peer review and Certified educator, with the learner's current stage marked.`,go:'p:portal'},
 appandsite:{a:`Yes. For Iron Temple we designed the mobile app and its launch site, and the site plays the app's real screens.`,go:'p:iron'},
 signalstyle:{a:`Conferences compete for attention, so Signal goes loud and poster-like. It shows the studio's expressive end; the dashboards show the other.`,go:'p:signal'},
 escalation:{a:`When confidence drops below a threshold, like 0.85 for compliance officers, the question goes to a human expert instead of getting a guessed answer.`,go:'p:askerisa'},
 conflict:{a:`Sources are ranked by authority. When two disagree, the higher-authority or newer source wins, and the answer shows which one it used.`,go:'go:research'},
 vaultdata:{a:`From the client's own records: past orders, delivery times and quality notes. Vendors are ranked on that history, not on their own claims.`,go:'p:vault'},
 safest:{a:`It weighs on-time delivery and track record against your request, then explains its pick in a sentence so you can check the reasoning.`,go:'p:vault'},
 chartsbottom:{a:`Because the admin's first question is "who do I need to chase today?". Past-due staff and deadlines answer that; the charts explain trends and can wait.`,go:'p:dashboard'},
 dashboards:{a:`Yes, dashboards are a big part of our work. Ashgrove and the AskERISA admin console are two examples.`,go:'p:askerisa'},
 verify:{a:`Every certified pilot gets a credential a client can check in seconds, so hiring a pilot doesn't rest on trust alone.`,go:'p:cert'},
 steps:{a:`Five: check eligibility, apply and pay, take the prep course, pass the exam and flight test, then get your credential.`,go:'p:cert'},
 ironscreens:{a:`Yes. The three phones on the launch site run the app's actual screens: a workout in progress, the home screen and coach chat.`,go:'p:iron'},
 coachapprove:{a:`AI drafts an 8-week program from the member's goal and the gym's equipment. A real coach reviews it every week and leaves notes in the plan.`,go:'p:iron'},
 clash:{a:`In "Build your days" you add sessions to your schedule, and the planner warns you when two overlap.`,go:'p:signal'},
 mobile:{a:`Yes. Iron Temple is a full mobile app, and we designed its launch site too.`,go:'p:iron'}
};

/* typed questions -> QA key (most specific first) */
const ROUTES=[
 [/cost|price|budget|quote/i,'cost'],[/private|commercial|compan/i,'private'],[/audit|existing|chatbot/i,'audit'],
 [/how long|timeline|results/i,'timeline'],[/what does devpixel|who are|about (you|devpixel)|what do you do/i,'about'],
 [/accura|measure|metric/i,'accuracy'],[/refuse|decline|won.?t answer/i,'refuse'],[/escalat|human|expert|hand.?off/i,'escalation'],
 [/disagree|conflict/i,'conflict'],[/discard|source/i,'discard'],[/differ|same as/i,'aidiff'],[/our (own )?(docs|documents|data)/i,'owndocs'],
 [/coach/i,'coach'],[/verify|verif/i,'verify'],[/clash|overlap/i,'clash'],[/mobile|\bapps?\b/i,'mobile'],
 [/dashboard|admin/i,'dashboards'],[/design|pixel|\bui\b|ux/i,'pixel'],[/contact|email|call|message|draft/i,'draft']
];
