function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}
function closeMenu(){document.getElementById('mobileMenu').classList.remove('open');}
 
// Scroll reveal + skill bar animation
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>{
        e.target.classList.add('visible');
        const bar=e.target.querySelector('.skill-bar-fill');
        if(bar){
          const pct=e.target.getAttribute('data-pct')||'75';
          setTimeout(()=>{bar.style.width=pct+'%';},250);
        }
      },i*80);
      observer.unobserve(e.target);
    }
  });
},{threshold:0.1});
reveals.forEach(el=>observer.observe(el));
 
// Active nav link
const sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  const y=window.scrollY+90;
  sections.forEach(s=>{
    const link=document.querySelector(`.nav-links a[href="#${s.id}"]`);
    if(link){
      if(y>=s.offsetTop && y<s.offsetTop+s.offsetHeight){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});



    const OWNER_EMAIL    = 'www.sr2006@gmail.com';
    const OWNER_NAME     = 'Suraj Singh';
    const TOAST_DURATION = 4000;
 
    function showToast(msg, isError = false) {
      const toast  = document.getElementById('ftToast');
      const msgEl  = document.getElementById('ftToastMsg');
      const icon   = toast.querySelector('svg');
 
      msgEl.textContent = msg;
      toast.classList.remove('show', 'error');
 
      if (isError) {
        toast.classList.add('error');
        icon.innerHTML = '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>';
      } else {
        icon.innerHTML = '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>';
      }
 
      void toast.offsetWidth;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), TOAST_DURATION);
    }
 
    function setFeedback(msg, color) {
      const el = document.getElementById('ftFeedback');
      if (!el) return;
      el.textContent  = msg;
      el.style.color   = color;
      el.style.opacity = msg ? '1' : '0';
    }
 
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    }
 
    function shakeInput() {
      const input = document.getElementById('ftEmailInput');
      input.classList.remove('shake');
      void input.offsetWidth;
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 500);
    }
 
    function handleJoinFree() {
      const input = document.getElementById('ftEmailInput');
      const btn   = document.getElementById('ftJoinBtn');
      const email = input.value.trim();
 
      if (!email) {
        shakeInput();
        input.focus();
        setFeedback('⚠ Please enter your email address.', '#f5a623');
        showToast('Please enter your email first!', true);
        return;
      }
 
      if (!isValidEmail(email)) {
        shakeInput();
        input.focus();
        setFeedback('⚠ Please enter a valid email address.', '#ff6b6b');
        showToast('Invalid email format!', true);
        return;
      }
 
      btn.classList.add('loading');
      btn.innerHTML = '<span class="btn-spinner"></span> Opening...';
      setFeedback('', '');
 
      const subject = encodeURIComponent(`Contact Request from ${email}`);
      const body    = encodeURIComponent(
        `Hello ${OWNER_NAME},\n\n` +
        `I wants to contact you!\n\n` +
        `Their Email: ${email}\n\n` +
        `---\n` +
       
        `Best regards,\nname:`
      );
 
      const mailtoURL = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
 
      setTimeout(() => {
        window.location.href = mailtoURL;
 
        setTimeout(() => {
          btn.classList.remove('loading');
          btn.innerHTML = 'Contact Us';
          input.value   = '';
          setFeedback('✓ Mail app opened! Your message is ready to send.', '#4caf50');
          showToast(`Mail app opened for ${email} ✓`);
          setTimeout(() => setFeedback('', ''), 6000);
        }, 1200);
 
      }, 600);
    }
 
    document.getElementById('ftEmailInput').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); handleJoinFree(); }
    });
 
    document.getElementById('ftEmailInput').addEventListener('input', function() {
      setFeedback('', '');
      this.style.borderColor = '';
    });


  
  /**
 * 3D Software ocean effect with Canvas2D
 * You can change properties under comment "Effect properties"
 */

// Init Context
let c = document.createElement('canvas').getContext('2d')
let postctx = document.body.appendChild(document.createElement('canvas')).getContext('2d')
let canvas = c.canvas
let vertices = []

// Effect Properties
let vertexCount = 7000
let vertexSize = 3
let oceanWidth = 204
let oceanHeight = -80
let gridSize = 32;
let waveSize = 16;
let perspective = 100;

// Common variables
let depth = (vertexCount / oceanWidth * gridSize)
let frame = 0
let { sin, cos, tan, PI } = Math

// Render loop
let oldTimeStamp = performance.now();
let loop = (timeStamp) => {
	let rad = sin(frame / 100) * PI / 20
  let rad2 = sin(frame / 50) * PI / 10
  const dt = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  
	frame += dt * 50;
	if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) { 
  	postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
    postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
  }

  
	c.fillStyle = `hsl(200deg, 100%, 2%)`
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  
  c.beginPath()
  vertices.forEach((vertex, i) => {
  	let ni = i + oceanWidth
  	let x = vertex[0] - frame % (gridSize * 2)
    let z = vertex[2] - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0)
  	let wave = (cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z*x / 10000))
    let y = vertex[1] + wave * waveSize
    let a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth)
    let tx, ty, tz
    
    y -= oceanHeight
    
    // Transformation variables
   	tx = x
    ty = y
    tz = z

    // Rotation Y
    tx = x * cos(rad) + z * sin(rad)
    tz = -x * sin(rad) + z * cos(rad)
    
    x = tx
    y = ty
    z = tz
    
    // Rotation Z
    tx = x * cos(rad) - y * sin(rad)
    ty = x * sin(rad) + y * cos(rad) 
    
    x = tx;
    y = ty;
    z = tz;
    
    // Rotation X
    
    ty = y * cos(rad2) - z * sin(rad2)
    tz = y * sin(rad2) + z * cos(rad2)
    
    x = tx;
    y = ty;
    z = tz;

    x /= z / perspective
    y /= z / perspective
    
    
        
    if (a < 0.01) return
    if (z < 0) return
   
    
    c.globalAlpha = a
    c.fillStyle = `hsl(${180 + wave * 20}deg, 100%, 50%)`
    c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize)
    c.globalAlpha = 1
  })
  c.restore()
  
  // Post-processing
  postctx.drawImage(canvas, 0, 0)
  
  postctx.globalCompositeOperation = "screen"
  postctx.filter = 'blur(16px)'
  postctx.drawImage(canvas, 0, 0)
  postctx.filter = 'blur(0)'
  postctx.globalCompositeOperation = "source-over"
  
  requestAnimationFrame(loop)
}

// Generating dots
for (let i = 0; i < vertexCount; i++) {
	let x = i % oceanWidth
  let y = 0
  let z = i / oceanWidth >> 0
	let offset = oceanWidth / 2
	vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize])
}

loop(performance.now())
