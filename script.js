// Definindo os elementos e seus IDs correspondentes
const sectionHome = document.getElementById('home');
const sectionAbout = document.getElementById('about');
const sectionActing = document.getElementById('acting');
const sectionContact = document.getElementById('contact');
const sectionProjects = document.getElementById('projects');

// Função para verificar a posição da rolagem
function onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

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

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
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