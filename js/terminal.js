/* ===== Terminal Simulator ===== */

// DOM Elements
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");

// Command history
let commandHistory = [];
let historyIndex = -1;

// ASCII Art Banner
const banner = `
<pre class="ascii-art">
 _   _ _     _                 _   
| \\ | (_)   | |               | |  
|  \\| |_ ___| |__   __ _ _ __ | |_ 
| . \` | / __| '_ \\ / _\` | '_ \\| __|
| |\\  | \\__ \\ | | | (_| | | | | |_ 
|_| \\_|_|___/_| |_|\\__,_|_| |_|\\__|
</pre>
<p class="success">Welcome to Nishant's Interactive Terminal!</p>
<p class="info">Type 'help' to see available commands.</p>
<br>
`;

// Command responses
const commands = {
  help: `
<span class="info">Available Commands:</span>

  <span class="command">about</span>       - Learn about me
  <span class="command">skills</span>      - View my technical skills
  <span class="command">projects</span>    - See my projects
  <span class="command">education</span>   - My education background
  <span class="command">experience</span>  - Work experience
  <span class="command">contact</span>     - How to reach me
  <span class="command">resume</span>      - Open my resume
  <span class="command">clear</span>       - Clear the terminal
  <span class="command">whoami</span>      - Who am I?
  <span class="command">date</span>        - Current date and time
  <span class="command">echo</span>        - Echo a message
`,

  about: `
<span class="highlight">About Nishant Naravarajula</span>

I like building things that work well under the hood—optimized 
queries, clean APIs, systems that don't break at 2 AM.

Currently pursuing my MS in Computer Science at Northeastern 
University, diving deeper into systems programming and software 
architecture.

I have hands-on experience with backend development, database 
optimization, and building reliable software systems.
`,

  skills: `
<span class="highlight">Technical Skills</span>

<span class="info">Languages:</span>
  Python, Java, C++, C, JavaScript, SQL

<span class="info">Frameworks & Tools:</span>
  Flask, React.js, Node.js, Docker, Git/GitHub, Linux

<span class="info">Databases:</span>
  MySQL, MongoDB

<span class="info">Methodologies:</span>
  Agile/Scrum, Code Reviews, CI/CD
`,

  projects: `
<span class="highlight">Projects</span>

<span class="success">1. Certificate Management System</span>
   Full-stack app with Flask, RESTful APIs, 60% faster queries
   Tech: Python, Flask, SQL, REST API

<span class="success">2. Expense Tracker Web Application</span>
   Budget management with auth and reporting features
   Tech: Python, Flask, MySQL

<span class="success">3. PPE Compliance Detection System</span>
   Real-time CV/ML monitoring, sub-100ms latency
   Tech: Python, OpenCV, Machine Learning

<span class="success">4. CM Colors Library (Open Source)</span>
   Documentation and testing contributions
   Tech: Python, Git, Testing

Type 'open projects' to view the projects page.
`,

  education: `
<span class="highlight">Education</span>

<span class="success">Northeastern University</span>
  Khoury College of Computer Sciences
  Master of Science in Computer Science
  Expected: May 2027 | Boston, MA

<span class="success">GITAM University</span>
  Bachelor of Technology in Computer Science
  Graduated: July 2024 | Hyderabad, India
`,

  experience: `
<span class="highlight">Work Experience</span>

<span class="success">Software Developer Intern</span>
<span class="info">Balina IT Solutions | Jun 2024 – Dec 2024</span>

• Developed backend services using Python and C++
• Designed database schemas and optimized SQL queries
• Collaborated with teams following Agile methodology
• Created technical documentation for APIs and modules
• Implemented automated testing procedures
`,

  contact: `
<span class="highlight">Contact Information</span>

<span class="info">Email:</span>    naravarajula.n@northeastern.edu
<span class="info">GitHub:</span>   github.com/nish-naravarajula
<span class="info">LinkedIn:</span> linkedin.com/in/nishant-naravarajula
<span class="info">Location:</span> Boston, MA

Type 'open contact' to visit the contact section.
`,

  resume: `
<span class="success">Opening resume...</span>
`,

  whoami: `
<span class="success">nishant</span>
A developer who loves clean code, optimized systems, and coffee ☕
`,

  clear: "CLEAR",

  date: `<span class="info">${new Date().toString()}</span>`,
};

// Easter eggs
const easterEggs = {
  "sudo hire me": `
<span class="success">✓ Application submitted!</span>
<span class="info">Just kidding... but feel free to reach out!</span>
Type 'contact' for my information.
`,
  hello: `<span class="success">Hello there! 👋</span> Type 'help' to explore.`,
  hi: `<span class="success">Hey! 👋</span> Type 'help' to see what I can do.`,
  ls: `<span class="info">index.html  projects.html  terminal.html  css/  js/  assets/</span>`,
  pwd: `<span class="info">/home/nishant/portfolio</span>`,
  cd: `<span class="error">Nice try! But this is a simulated terminal 😄</span>`,
  vim: `<span class="error">I use VS Code, sorry! 😅</span>`,
  exit: `<span class="info">Thanks for visiting! Refresh to restart.</span>`,
  coffee: `<span class="success">☕ Here's your coffee! Now let's code.</span>`,
  42: `<span class="info">The answer to life, the universe, and everything!</span>`,
};

// Initialize terminal
function initTerminal() {
  terminalOutput.innerHTML = banner;
  terminalInput.focus();
}

// Process command
function processCommand(input) {
  const trimmedInput = input.trim().toLowerCase();
  const args = trimmedInput.split(" ");
  const cmd = args[0];

  // Add to history
  if (input.trim()) {
    commandHistory.push(input);
    historyIndex = commandHistory.length;
  }

  // Display the command
  addOutput(
    `<span class="prompt">nishant@portfolio:~$</span> <span class="command">${input}</span>`,
  );

  // Empty command
  if (!trimmedInput) {
    return;
  }

  // Check for easter eggs first
  if (easterEggs[trimmedInput]) {
    addOutput(easterEggs[trimmedInput]);
    return;
  }

  // Handle echo command
  if (cmd === "echo") {
    const message = args.slice(1).join(" ");
    addOutput(`<span class="info">${message || ""}</span>`);
    return;
  }

  // Handle open command
  if (cmd === "open") {
    const page = args[1];
    if (page === "projects") {
      addOutput(`<span class="success">Opening projects page...</span>`);
      setTimeout(() => (window.location.href = "projects.html"), 1000);
      return;
    }
    if (page === "contact" || page === "home") {
      addOutput(`<span class="success">Opening home page...</span>`);
      setTimeout(() => (window.location.href = "index.html#contact"), 1000);
      return;
    }
    addOutput(`<span class="error">Unknown page: ${page}</span>`);
    return;
  }

  // Handle resume command
  if (cmd === "resume") {
    addOutput(commands.resume);
    setTimeout(() => window.open("assets/Nishant_Resume.pdf", "_blank"), 500);
    return;
  }

  // Handle clear command
  if (cmd === "clear") {
    terminalOutput.innerHTML = "";
    return;
  }

  // Handle date command (refresh time)
  if (cmd === "date") {
    addOutput(`<span class="info">${new Date().toString()}</span>`);
    return;
  }

  // Check for known commands
  if (commands[cmd]) {
    addOutput(commands[cmd]);
    return;
  }

  // Unknown command
  addOutput(`<span class="error">Command not found: ${cmd}</span>
<span class="info">Type 'help' to see available commands.</span>`);
}

// Add output to terminal
function addOutput(html) {
  const div = document.createElement("div");
  div.className = "output-block";
  div.innerHTML = html;
  terminalOutput.appendChild(div);
  scrollToBottom();
}

// Scroll to bottom
function scrollToBottom() {
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Event Listeners
terminalInput.addEventListener("keydown", (e) => {
  // Enter key - process command
  if (e.key === "Enter") {
    processCommand(terminalInput.value);
    terminalInput.value = "";
  }

  // Arrow Up - previous command
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
    }
  }

  // Arrow Down - next command
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      terminalInput.value = "";
    }
  }
});

// Click on terminal body focuses input
terminalBody.addEventListener("click", () => {
  terminalInput.focus();
});

// Quick command buttons
document.querySelectorAll(".quick-cmd").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cmd = btn.getAttribute("data-cmd");
    terminalInput.value = cmd;
    processCommand(cmd);
    terminalInput.value = "";
  });
});

// Initialize on load
initTerminal();
