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

const officialSite = `
    <div class='text-center'>
        <p>
        Site oficial: <a class='text-center' target="_blank" href="https://react.dev">React JS</a>
        </p>
    </div>
`

const descriptionHTML = `
    <p>O React é uma biblioteca JavaScript utilizada para criar interfaces de usuário interativas e reativas. Ele permite construir aplicativos da web eficientes e de alto desempenho, dividindo a interface em componentes reutilizáveis.</p>
`;

const pros = `
    <ul>
    <li><strong>Componentização</strong>: O React JS permite a criação de componentes reutilizáveis, o que torna o desenvolvimento mais eficiente e facilita a manutenção do código.</li>
    <li><strong>Performance:</strong> O React utiliza uma técnica chamada "Virtual DOM" que otimiza a renderização dos elementos na página, resultando em um melhor desempenho e uma experiência mais fluida para o usuário.</li>
    <li><strong>Ecossistema e Comunidade:</strong> O React possui um ecossistema rico, com uma vasta quantidade de bibliotecas e ferramentas disponíveis. Além disso, a comunidade em torno do React é bastante ativa, fornecendo suporte e recursos úteis.</li>
    </ul>
`;

const limitations = `
    <ul>
    <li><strong>Curva de aprendizado:</strong> Para desenvolvedores que estão começando com o React, pode haver uma curva de aprendizado inicial para entender os conceitos fundamentais, como componentes, estados e props.</li>
    <li><strong>Complexidade:</strong> À medida que um projeto React cresce em escala, a complexidade do código pode aumentar. O gerenciamento de estados e o fluxo de dados entre os componentes podem se tornar desafiadores.</li>
    <li><strong>Dependência de bibliotecas externas:</strong> Embora o React seja uma biblioteca poderosa, muitas vezes é necessário usar bibliotecas adicionais para tarefas específicas, como roteamento ou manipulação de formulários. Isso pode adicionar uma camada extra de dependência e complexidade ao projeto.</li>
    </ul>
`;

const projects = `
    <div style="display: flex; justify-content: center; ">
    <img title="facebook" alt="facebook" src='./assets/images/logos/facebook_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="airbnb" alt="airbnb" src='./assets/images/logos/airbnb_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="netflix" alt="netflix" src='./assets/images/logos/netflix_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="whatsapp" alt="whatsapp" src='./assets/images/logos/whatsapp_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="microsoft" alt="microsoft" src='./assets/images/logos/microsoft_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="dropbox" alt="dropbox" src='./assets/images/logos/dropbox_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    </div>
`;


const officialSite2 = `
    <div class='text-center'>
        <p>
        Site oficial: <a class='text-center' target="_blank" href="https://www.w3.org/Style/CSS/">CSS</a>
        </p>
    </div>
`

const descriptionHTML2 = `
    <p>O CSS (Cascading Style Sheets) é uma linguagem que permite estilizar e formatar os elementos de uma página da web, controlando cor, fonte, tamanho e posicionamento. É uma ferramenta essencial para criar interfaces visualmente atraentes e melhorar a experiência do usuário.</p>
`;

const pros2 = `
    <ul>
    <p>
    <li><strong>Estilização e personalização:</strong> O CSS permite estilizar elementos HTML, fornecendo uma ampla gama de opções de design para tornar as páginas da web visualmente atraentes.</li>
    <li><strong>Separação de preocupações:</strong> Com o CSS, é possível separar o estilo da estrutura do documento HTML, o que facilita a manutenção do código e a reutilização em diferentes partes do site.</li>
    <li><strong>Responsividade e adaptação:</strong> O CSS suporta o design responsivo, permitindo que as páginas da web se adaptem a diferentes dispositivos e tamanhos de tela, proporcionando uma experiência consistente aos usuários.</li>
    </ul>
`;

const limitations2 = `
    <ul>
    <li><strong>Complexidade de layout:</strong> Em alguns casos, pode ser desafiador alcançar designs de layout complexos com CSS, exigindo conhecimento aprofundado de suas propriedades e técnicas.</li>
    <li><strong>Compatibilidade entre navegadores:</strong> Diferentes navegadores podem interpretar o CSS de maneira ligeiramente diferente, resultando em diferenças de renderização. Isso pode exigir ajustes adicionais para garantir a compatibilidade em todos os navegadores.</li>
    <li><strong>Curva de aprendizado:</strong> Dominar o CSS pode exigir algum tempo e esforço de aprendizado, pois existem muitas propriedades e conceitos a serem compreendidos para aproveitar ao máximo essa linguagem de estilo.</li>
    </ul>
`;

const projects2 = `
    <div style="display: flex; justify-content: center; ">
    <img title="apple" alt="apple" src='./assets/images/logos/apple_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="google" alt="google" src='./assets/images/logos/google_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="amazon" alt="amazon" src='./assets/images/logos/amazon_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="microsoft" alt="microsoft" src='./assets/images/logos/microsoft_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="adobe" alt="adobe" src='./assets/images/logos/adobe_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    <img title="airbnb" alt="airbnb" src='./assets/images/logos/airbnb_logo.png' style="width: 50px; height: 50px; margin-right: 10px;">
    </div>
`;

const reactJs = `
  
    ${officialSite}

    ${descriptionHTML}<br>
    
    <h5 class='text-center'>Prós:</h5>
    <p></p>
    ${pros}<br>

    <h5 class='text-center'>Limitações:</h5>
    <p></p>
    ${limitations}<br>

    <h5 class='text-center'>Projetos grandes que utilizam:</h5>
    <p></p>
    ${projects}
`;

const css = `

    ${officialSite2}

    ${descriptionHTML2}<br>
    
    <h5 class='text-center'>Prós:</h5>
    <p></p>
    ${pros2}<br>

    <h5 class='text-center'>Limitações:</h5>
    <p></p>
    ${limitations2}<br>

    <h5 class='text-center'>Projetos grandes que utilizam:</h5>
    <p></p>
    ${projects2}
`;

const links = document.querySelectorAll('.techlinks a');

// Adicionando um ouvinte de evento de clique a cada link
links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const contentId = link.getAttribute('data-content-id');

        // Verificando o ID do conteúdo e atualizando o título e o conteúdo do modal
        if (contentId === '1') {
            document.getElementById('modalImage').src = "./assets/images/logos/react_logo.png"
            document.getElementById('modalTitle').innerText = 'React JS';
            document.getElementById('modalContent').innerHTML = reactJs;


        } else if (contentId === '2') {
            document.getElementById('modalImage').src = "./assets/images/logos/css_logo.png"
            document.getElementById('modalTitle').innerText = 'CSS3';
            document.getElementById('modalContent').innerHTML = css;
        }

    });
});