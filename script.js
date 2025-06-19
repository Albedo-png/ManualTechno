console.log("JavaScript loaded successfully!");

// Scroll suave para âncoras
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Atualiza link ativo no menu conforme scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  function setActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // Inicializa ao carregar a página
});

// Toggle menu mobile
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
});

// Modal para visualização dos projetos
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const modalClose = document.getElementById("modal-close");

  // Cria as divisões para mídia e info dentro do modal-content (uma vez)
  let mediaDiv = document.createElement("div");
  mediaDiv.classList.add("media");
  let infoDiv = document.createElement("div");
  infoDiv.classList.add("info");
  modalContent.appendChild(mediaDiv);
  modalContent.appendChild(infoDiv);

  // Abre modal ao clicar no card
  document.querySelectorAll(".projeto-card").forEach(card => {
    card.addEventListener("click", () => {
      mediaDiv.innerHTML = "";
      infoDiv.innerHTML = "";

      // Seleciona mídia do card clicado (imagem ou vídeo)
      const media = card.querySelector("img, video");
      if (!media) return;

      let cloneMedia;
      if (media.tagName.toLowerCase() === "img") {
        cloneMedia = document.createElement("img");
        cloneMedia.src = media.src;
        cloneMedia.alt = media.alt || "";
      } else if (media.tagName.toLowerCase() === "video") {
        cloneMedia = document.createElement("video");
        cloneMedia.src = media.src;
        cloneMedia.controls = true;
        cloneMedia.autoplay = true;
        cloneMedia.muted = true;
        cloneMedia.loop = false;
      }

      mediaDiv.appendChild(cloneMedia);

      // Pega título e descrição da overlay
      const titulo = card.querySelector(".overlay h3")?.textContent || "";
      const descricao = card.querySelector(".overlay p")?.textContent || "";

      const h3 = document.createElement("h3");
      h3.textContent = titulo;
      const p = document.createElement("p");
      p.textContent = descricao;

      infoDiv.appendChild(h3);
      infoDiv.appendChild(p);

      // Mostra modal e trava scroll do fundo
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // Permite abrir modal via teclado (Enter ou espaço)
    card.addEventListener("keydown", (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Fecha modal ao clicar no botão fechar
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Fecha modal ao clicar fora do conteúdo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const btnClose = document.getElementById('modal-close');
  const btnPrev = document.getElementById('modal-prev');
  const btnNext = document.getElementById('modal-next');

  // Dados dos projetos e suas mídias
  const projetos = {
    gamer: {
      titulo: 'PC Gamer sob medida',
      descricao: 'Montagem personalizada com foco em desempenho e estética.',
      midias: [
        { type: 'image', src: 'assets/projeto1.jpg' },
        { type: 'image', src: 'assets/projeto2.jpg' },
        { type: 'image', src: 'assets/projeto3.jpg' }
      ]
    },
    limpeza: {
      titulo: 'Limpeza completa',
      descricao: 'Antes e depois de uma limpeza física com troca de pasta térmica.',
      midias: [
        { type: 'image', src: 'assets/projeto1.jpg' },
        { type: 'image', src: 'assets/projeto2_3.png' },
        { type: 'image', src: 'assets/limpeza_depois.jpg' }
      ]
    }
    // Adicione mais projetos conforme necessário
  };

  let currentProjeto = null;
  let currentIndex = 0;

  // Função para carregar a mídia atual no modal
  function carregarMidia(projetoId, index) {
    const projeto = projetos[projetoId];
    if (!projeto) return;
  
    const media = projeto.midias[index];
  
    // Limpa conteúdo do modal
    modalContent.innerHTML = '';
  
    // Container para mídia
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('media');
  
    if (media.type === 'image') {
      const img = document.createElement('img');
      img.src = media.src;
      img.alt = projeto.titulo;
      mediaDiv.appendChild(img);
    } else if (media.type === 'video') {
      const video = document.createElement('video');
      video.src = media.src;
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.style.maxWidth = '100%';
      video.style.height = 'auto';
      mediaDiv.appendChild(video);
    }
  
    // Anexa os botões dentro da mediaDiv para posicionar sobre a imagem/vídeo
    mediaDiv.appendChild(btnPrev);
    mediaDiv.appendChild(btnNext);
  
    // Container para info (título e descrição)
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
  
    const tituloEl = document.createElement('h3');
    tituloEl.textContent = projeto.titulo;
  
    const descricaoEl = document.createElement('p');
    descricaoEl.textContent = projeto.descricao;
  
    infoDiv.appendChild(tituloEl);
    infoDiv.appendChild(descricaoEl);
  
    // Anexa mídia e info ao modal content
    modalContent.appendChild(mediaDiv);
    modalContent.appendChild(infoDiv);
  }  

  // Abre modal com projeto e mídia inicial
  function abrirModal(projetoId) {
    currentProjeto = projetoId;
    currentIndex = 0;
    carregarMidia(currentProjeto, currentIndex);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // trava scroll do fundo
  }

  // Fecha modal
  function fecharModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Eventos para navegar entre mídias
  btnPrev.addEventListener('click', () => {
    const projeto = projetos[currentProjeto];
    if (!projeto) return;
    currentIndex = (currentIndex - 1 + projeto.midias.length) % projeto.midias.length;
    carregarMidia(currentProjeto, currentIndex);
  });

  btnNext.addEventListener('click', () => {
    const projeto = projetos[currentProjeto];
    if (!projeto) return;
    currentIndex = (currentIndex + 1) % projeto.midias.length;
    carregarMidia(currentProjeto, currentIndex);
  });

  btnClose.addEventListener('click', fecharModal);

  // Fecha modal ao clicar fora do conteúdo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // Abre modal ao clicar nos cards de projeto
  document.querySelectorAll('.projeto-card').forEach(card => {
    card.addEventListener('click', () => {
      const projetoId = card.getAttribute('data-projeto');
      if (projetoId && projetos[projetoId]) {
        abrirModal(projetoId);
      }
    });
  });
});
