// script.js - Part 3 features for PhoneFixx
document.addEventListener('DOMContentLoaded', function(){

  /* ---------- Accordion (services) ---------- */
  document.querySelectorAll('.acc-btn').forEach(btn=>{
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const panel = btn.nextElementSibling;
      if(panel.style.display === 'block') panel.style.display = 'none';
      else panel.style.display = 'block';
    });
  });

  /* ---------- Lightbox gallery ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  if(lightbox){
    document.querySelectorAll('.thumb').forEach(img=>{
      img.addEventListener('click', ()=> {
        lbImg.src = img.dataset.large || img.src;
        lightbox.style.display = 'block';
      });
    });
    lbClose.addEventListener('click', ()=> lightbox.style.display = 'none');
    lightbox.addEventListener('click', (e)=> { if(e.target === lightbox) lightbox.style.display = 'none'; });
  }

  /* ---------- Search filter (services) ---------- */
  const serviceSearch = document.getElementById('service-search');
  if(serviceSearch){
    serviceSearch.addEventListener('input', () => {
      const q = serviceSearch.value.toLowerCase();
      document.querySelectorAll('.service-item').forEach(item=>{
        item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* ---------- Enquiry form (client-side validation + estimate) ---------- */
  const enquiryForm = document.getElementById('enquiryForm');
  if(enquiryForm){
    enquiryForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      const name = document.getElementById('e-name').value.trim();
      const email = document.getElementById('e-email').value.trim();
      const service = document.getElementById('e-service').value;
      const date = document.getElementById('e-date').value;
      const result = document.getElementById('e-result');

      if(!name || !email || !service || !date) {
        result.textContent = 'Please fill in all required fields.';
        result.style.color = 'red';
        return;
      }
      // simple format check for email
      if(!/^\S+@\S+\.\S+$/.test(email)){
        result.textContent = 'Please enter a valid email address.';
        result.style.color = 'red';
        return;
      }

      // cost logic
      const baseCosts = { screen: 250, battery: 220, charging: 200, speaker: 120 };
      const cost = baseCosts[service] || 0;
      result.style.color = 'green';
      result.innerHTML = `Thanks <strong>${escapeHtml(name)}</strong>. Estimated cost for <strong>${service}</strong> is <strong>R${cost}</strong>.<br>We have available slots on <strong>${date}</strong>. Please confirm by emailing us or via WhatsApp.`;
    });
  }

  /* ---------- Contact form (mailto builder) ---------- */
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const type = document.getElementById('c-type').value;
      const msg = document.getElementById('c-msg').value.trim();
      const result = document.getElementById('c-result');

      if(!name || !email || !msg){
        result.textContent = 'Please complete all required fields.';
        result.style.color = 'red';
        return;
      }
      if(!/^\S+@\S+\.\S+$/.test(email)){
        result.textContent = 'Please enter a valid email.';
        result.style.color = 'red';
        return;
      }

      const subject = encodeURIComponent(`[Contact] ${type} from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${type}\n\nMessage:\n${msg}`);
      const mailTo = `mailto:gomolemophenyo@icloud.com?subject=${subject}&body=${body}`;
      // open mailto client
      window.location.href = mailTo;
    });
  }

  /* ---------- small helper: escape HTML ---------- */
  function escapeHtml(text){
    const map = { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' };
    return text.replace(/[&<>"']/g, function(m){ return map[m]; });
  }

}); // DOMContentLoaded
