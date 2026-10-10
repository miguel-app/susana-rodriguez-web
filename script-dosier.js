/* ==========================================================================
   SUSANA RODRÍGUEZ - PROPUESTA DE BIENESTAR MARY KAY COLOMBIA SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initCalculator();
});

/**
 * Controla el menú hamburguesa en tabletas y móviles
 */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');
  if (!mobileToggle || !mainNav) return;

  const setNavState = (open) => {
    mainNav.classList.toggle('active', open);
    mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  };

  mobileToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    setNavState(!mainNav.classList.contains('active'));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setNavState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('active')) {
      setNavState(false);
      mobileToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!mainNav.classList.contains('active')) return;
    if (!mainNav.contains(event.target) && !mobileToggle.contains(event.target)) {
      setNavState(false);
    }
  });
}

/**
 * Inicializa los eventos y cálculos iniciales para la herramienta de RRHH
 */
function initCalculator() {
  const rangeInput = document.getElementById('employeeRange');
  if (rangeInput) {
    rangeInput.addEventListener('input', calculateWorkshop);
    calculateWorkshop();
  }
}

/**
 * Ajusta directamente el número de empleados mediante los botones preset
 */
function setEmployees(count) {
  const rangeInput = document.getElementById('employeeRange');
  if (rangeInput) {
    rangeInput.value = count;
    calculateWorkshop();
  }
}

/**
 * Lógica de cálculo en tiempo real para la propuesta corporativa Mary Kay
 */
function calculateWorkshop() {
  const rangeInput = document.getElementById('employeeRange');
  if (!rangeInput) return;

  const count = parseInt(rangeInput.value, 10);
  const employeeValueLabel = document.getElementById('employeeValue');
  const resGroups = document.getElementById('resGroups');
  const resTime = document.getElementById('resTime');
  const resSets = document.getElementById('resSets');
  const resKits = document.getElementById('resKits');

  // Actualizar etiqueta del slider
  if (employeeValueLabel) {
    employeeValueLabel.textContent = `${count} Colaboradores`;
  }

  // Obtener modalidad seleccionada
  const modalityRadios = document.getElementsByName('modalidad');
  let selectedModality = 'workshops';
  modalityRadios.forEach(radio => {
    if (radio.checked) selectedModality = radio.value;
  });

  let groupCount = 1;
  let timeText = '';
  // Según PDF oficial: 5 a 8 colaboradores por sesión (35-40 min)
  const maxPerGroup = selectedModality === 'workshops' ? 7 : 20;

  if (count <= maxPerGroup) {
    groupCount = 1;
    timeText = '35 - 40 min (1 Sesión Única)';
  } else {
    groupCount = Math.ceil(count / maxPerGroup);
    const avgPerGroup = Math.ceil(count / groupCount);
    const totalMinutes = groupCount * 35;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    
    let durationFormatted = '';
    if (hours > 0 && mins > 0) {
      durationFormatted = `${hours} h ${mins} min`;
    } else if (hours > 0) {
      durationFormatted = `${hours} h`;
    } else {
      durationFormatted = `${mins} min`;
    }

    timeText = `${durationFormatted} (~${groupCount} grupos de ${avgPerGroup} pers)`;
  }

  // Actualizar la interfaz
  if (resGroups) {
    const avg = Math.ceil(count / groupCount);
    resGroups.textContent = groupCount === 1 ? `1 Grupo (${count} pers)` : `${groupCount} Grupos (~${avg} pers/grupo)`;
  }

  if (resTime) resTime.textContent = timeText;
  if (resSets) resSets.textContent = `${count} Sets Mary Kay® con Espejo`;
  if (resKits) resKits.textContent = `${count} Kits de Muestras e Insumos In Situ`;
}

/**
 * Envía la propuesta calculada por el usuario directamente al WhatsApp de Susana Rodríguez (+573215766840)
 */
function sendCalculatedProposal() {
  const rangeInput = document.getElementById('employeeRange');
  const count = rangeInput ? rangeInput.value : '35';

  const modalityRadios = document.getElementsByName('modalidad');
  let selectedModality = 'Workshops Reducidos (5-8 pers / 30-40 min)';
  modalityRadios.forEach(radio => {
    if (radio.checked) {
      selectedModality = radio.value === 'workshops' ? 'Workshops Reducidos (5-8 pers / 30-40 min)' : 'Stand / Skin Bar Interactivo (Jornada)';
    }
  });

  const message = `Hola Susana, he consultado tu *Propuesta de Bienestar Corporativo Mary Kay*.\n\n` +
    `🏢 *Datos de mi empresa:*\n` +
    `👥 Colaboradores estimados: *${count} personas*\n` +
    `📋 Modalidad sugerida: *${selectedModality}*\n\n` +
    `Quisiera coordinar una breve llamada para definir la fecha y muestras previas sin costo. ¡Gracias!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/573215766840?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Maneja el envío del formulario de agendamiento corporativo
 */
function handleBookingSubmit(event) {
  event.preventDefault();

  const companyName = document.getElementById('companyName').value.trim();
  const contactName = document.getElementById('contactName').value.trim();
  const contactRole = document.getElementById('contactRole').value.trim();
  const contactPhone = document.getElementById('contactPhone').value.trim();
  const employeeCount = document.getElementById('employeeCount').value;
  const tentativeDate = document.getElementById('tentativeDate').value;

  let message = `Hola Susana, solicito formalmente información/reserva de fecha para la *Propuesta de Bienestar Corporativo Mary Kay*:\n\n` +
    `🏢 *Empresa:* ${companyName}\n` +
    `👤 *Contacto:* ${contactName} (${contactRole})\n` +
    `📞 *Teléfono/WhatsApp:* ${contactPhone}\n` +
    `👥 *Colaboradores Estimados:* ${employeeCount}\n`;

  if (tentativeDate) {
    message += `📅 *Fecha Tentativa:* ${tentativeDate}\n`;
  }

  message += `\nQuedo a la espera de tu respuesta para definir detalles y agendar la jornada sin costo adicional.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/573215766840?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}
