// Definindo os elementos e seus IDs correspondentes
const sectionHome = document.getElementById('home');
const sectionAbout = document.getElementById('about');
const sectionActing = document.getElementById('acting');
const sectionContact = document.getElementById('contact');
const sectionProjects = document.getElementById('projects');

// Fechar o menu navbar ao clicar em um link
$('.navbar-nav>li>a').on('click', function () {
    if ($('.navbar-toggler').is(':visible')) {
        $('.navbar-collapse').collapse('hide');
        $('.navbar-toggler').addClass('collapsed');
    }
});

// Função para verificar a posição da rolagem
function onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    // Verificando a posição da rolagem e definindo o ID do elemento ativo (destacar o link correspondente))

    let activeId = '';
    if (scrollPosition < sectionAbout.offsetTop) {
        activeId = 'home';
    } else if (scrollPosition < sectionActing.offsetTop) {
        activeId = 'about';
    } else if (scrollPosition < sectionContact.offsetTop) {
        activeId = 'acting';
    } else if (scrollPosition < sectionProjects.offsetTop) {
        activeId = 'contact';
    } else {
        activeId = 'projects';
    }

    var sections = document.querySelectorAll('section');
    var currentSection = '';

    sections.forEach(function (section) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    var links = document.querySelectorAll('.navbar .navbar-nav .nav-link');
    links.forEach(function (link) {
        link.classList.remove('active');
        var href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        }
    });

}

// Escutando o evento de rolagem e chamando a função onScroll
window.addEventListener('scroll', onScroll);

function changeActiveLink(event) {
    // Removendo a classe 'active' de todos os links
    var links = document.querySelectorAll('.navbar .navbar-nav .nav-link .navbar-brand logo');
    links.forEach(function (link) {
        link.classList.remove('active');
    }

    );

    // Adicionando a classe 'active' ao link clicado (Destaque do link)
    var clickedLink = event.target;
    clickedLink.classList.add('active');
}

// Funcionalidades do Slider da section Formação
var slider = document.querySelector('.slider');
var slides = document.querySelectorAll('.slide');
var currentIndex = 0;
var touchStartX = 0;
var touchEndX = 0;


function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    updateSlider();
}

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = 'translateX(' + (currentIndex * -100) + '%)';
    updateNavButtons();
}

function updateNavButtons() {
    var navButtons = document.querySelectorAll('.slider-nav button');
    navButtons.forEach(function (button, index) {
        if (index === currentIndex) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe(event);
}

function handleSwipe(event) {
    var differenceX = touchEndX - touchStartX;
    var differenceY = Math.abs(event.changedTouches[0].clientY - touchStartX);
    var sensitivity = 100; // Ajuste da sensibilidade do deslizamento

    if (Math.abs(differenceX) > Math.abs(differenceY) && Math.abs(differenceX) > sensitivity) {
        // Movimento horizontal
        if (differenceX > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
}