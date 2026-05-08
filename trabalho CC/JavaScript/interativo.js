/**
 * JavaScript - interativo.js
 * Funcionalidades: menu responsivo, tema claro/escuro, validação de formulário e mensagem de sucesso
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========== MENU RESPONSIVO ==========
    const menuToggle = document.getElementById('menu-toggle');
    const menuLista = document.getElementById('menu-lista');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            if (menuLista) menuLista.classList.toggle('active');
        });
    }

    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && menuLista && menuToggle) {
                menuLista.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // ========== TEMA CLARO/ESCURO ==========
    const temaBtn = document.getElementById('tema-btn');
    const temaSalvo = localStorage.getItem('theme');
    if (temaSalvo === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (temaBtn) temaBtn.textContent = '☀️';
    } else if (temaSalvo === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (temaBtn) temaBtn.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (temaBtn) temaBtn.textContent = '☀️';
    }

    if (temaBtn) {
        temaBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                temaBtn.textContent = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                temaBtn.textContent = '☀️';
            }
        });
    }

    // ========== NAVEGAÇÃO SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== "#") {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ========== FORMULÁRIO DE CONTATO ==========
    const form = document.getElementById('form-contato');
    const campoNome = document.getElementById('nome');
    const campoEmail = document.getElementById('email');
    const campoMensagem = document.getElementById('mensagem');
    const erroNome = document.getElementById('erro-nome');
    const erroEmail = document.getElementById('erro-email');
    const erroMensagem = document.getElementById('erro-mensagem');

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function limparErros() {
        if (erroNome) erroNome.textContent = '';
        if (erroEmail) erroEmail.textContent = '';
        if (erroMensagem) erroMensagem.textContent = '';
        [campoNome, campoEmail, campoMensagem].forEach(campo => {
            if (campo) campo.style.borderColor = '';
        });
    }

    function mostrarMensagemSucesso() {
        // Remove qualquer modal anterior (evita duplicação)
        const modalExistente = document.querySelector('.modal-sucesso');
        if (modalExistente) modalExistente.remove();

        const msgDiv = document.createElement('div');
        msgDiv.className = 'modal-sucesso';
        msgDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #6c63ff, #ff6584);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 16px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                z-index: 10000;
                min-width: 280px;
                animation: fadeInModal 0.3s ease;
            ">
                ✅ <strong>Mensagem enviada com sucesso!</strong><br>
                <span style="font-size: 0.9rem;">Em breve entrarei em contato.</span><br>
                <button id="fecharModalBtn" style="
                    background: white;
                    color: #6c63ff;
                    border: none;
                    padding: 6px 20px;
                    border-radius: 30px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-top: 12px;
                ">Fechar</button>
            </div>
        `;
        document.body.appendChild(msgDiv);

        // Adiciona animação se não existir
        if (!document.getElementById('modal-animation-style')) {
            const style = document.createElement('style');
            style.id = 'modal-animation-style';
            style.textContent = `
                @keyframes fadeInModal {
                    from { opacity: 0; transform: translate(-50%, -60%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
            `;
            document.head.appendChild(style);
        }

        const fecharBtn = document.getElementById('fecharModalBtn');
        if (fecharBtn) {
            fecharBtn.addEventListener('click', () => msgDiv.remove());
        }
        setTimeout(() => {
            if (msgDiv && msgDiv.parentNode) msgDiv.remove();
        }, 4000);
    }

    function validarFormulario(event) {
        event.preventDefault();
        limparErros();
        let isValid = true;

        // Valida nome
        if (!campoNome.value.trim()) {
            if (erroNome) erroNome.textContent = 'Preencha seu nome.';
            if (campoNome) campoNome.style.borderColor = '#dc2626';
            isValid = false;
        } else if (campoNome.value.trim().length < 2) {
            if (erroNome) erroNome.textContent = 'Nome muito curto.';
            if (campoNome) campoNome.style.borderColor = '#dc2626';
            isValid = false;
        }

        // Valida email
        if (!campoEmail.value.trim()) {
            if (erroEmail) erroEmail.textContent = 'Preencha seu e-mail.';
            if (campoEmail) campoEmail.style.borderColor = '#dc2626';
            isValid = false;
        } else if (!validarEmail(campoEmail.value.trim())) {
            if (erroEmail) erroEmail.textContent = 'E-mail inválido (ex: nome@dominio.com)';
            if (campoEmail) campoEmail.style.borderColor = '#dc2626';
            isValid = false;
        }

        // Valida mensagem
        if (!campoMensagem.value.trim()) {
            if (erroMensagem) erroMensagem.textContent = 'Digite sua mensagem.';
            if (campoMensagem) campoMensagem.style.borderColor = '#dc2626';
            isValid = false;
        } else if (campoMensagem.value.trim().length < 5) {
            if (erroMensagem) erroMensagem.textContent = 'Mensagem muito curta.';
            if (campoMensagem) campoMensagem.style.borderColor = '#dc2626';
            isValid = false;
        }

        if (isValid) {
            mostrarMensagemSucesso();
            campoNome.value = '';
            campoEmail.value = '';
            campoMensagem.value = '';
            console.log('✅ Formulário enviado com sucesso!');
        } else {
            console.log('❌ Formulário com erros.');
        }
    }

    if (form) {
        form.addEventListener('submit', validarFormulario);
    } else {
        console.error('❌ Elemento #form-contato não encontrado. Verifique o HTML.');
    }

    console.log('✅ Script carregado com sucesso!');
});