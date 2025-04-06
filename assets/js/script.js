document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('.ticket-form');
    const registrationForm = document.querySelector('.registration-form');
    const ticketSection = document.querySelector('.ticket-preview');
    const uploadArea = document.querySelector('.upload-area');
    const userAvatar = document.querySelector('.user-avatar');
    const userNameDisplay = document.querySelector('.highlight-name');
    const userEmailDisplay = document.querySelector('.user-email');
    const userGithubDisplay = document.querySelector('.user-github span');
    const fullNameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const githubInput = document.getElementById('github');


    let isMaximized = false;
    let isMinimized = false;
    let originalWindowSize = {
        width: '600px',
        height: '300px',
        left: '50%',
        top: '50%'
    };
    let selectedImage = null;
    let taskbar = null;
    let taskbarBtn = null;

    // Création de la fenêtre système modale
    const modal = document.createElement('div');
    modal.className = 'system-modal hidden';
    modal.innerHTML = `
        <div class="system-window">
            <div class="system-title-bar">
                <div class="system-title">Select Avatar</div>
                <div class="system-controls">
                    <button class="system-btn system-minimize">−</button>
                    <button class="system-btn system-maximize">□</button>
                    <button class="system-btn system-close">×</button>
                </div>
            </div>
            <div class="system-toolbar">
                <button class="system-toolbtn">File</button>
                <button class="system-toolbtn">View</button>
                <button class="system-toolbtn">Help</button>
            </div>
            <div class="system-content">
                <div class="system-status-bar">No item selected</div>
                <div class="system-view-options">
                    <button class="system-view-btn active" data-view="thumbnails">Thumbnails</button>
                    <button class="system-view-btn" data-view="list">List</button>
                    <button class="system-view-btn" data-view="details">Details</button>
                </div>
                <div class="system-image-gallery thumbnails-view"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Éléments de la fenêtre système
    const systemWindow = modal.querySelector('.system-window');
    const imageGallery = modal.querySelector('.system-image-gallery');
    const closeBtn = modal.querySelector('.system-close');
    const minimizeBtn = modal.querySelector('.system-minimize');
    const maximizeBtn = modal.querySelector('.system-maximize');
    const viewButtons = modal.querySelectorAll('.system-view-btn');
    const statusBar = modal.querySelector('.system-status-bar');

    // Éléments de prévisualisation
    const preview = uploadArea.querySelector('.image-preview');
    const uploadIcon = uploadArea.querySelector('.upload-icon');
    const uploadText = uploadArea.querySelector('.upload-area__text');
    const uploadActions = uploadArea.querySelector('.upload-actions');
    const btnChange = uploadArea.querySelector('.btn-change');
    const btnRemove = uploadArea.querySelector('.btn-remove');

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    const location = 'Austin, TX'; // Tu peux le changer si besoin

    document.getElementById('event-date').textContent = `${today} / ${location}`;

    // Liste des images disponibles
    const availableImages = [
        'image-avatar.jpg',
        'sombre.png',
        'claire.png',
    ];

    // Initialisation de la fenêtre
    function initWindow() {
        systemWindow.style.width = originalWindowSize.width;
        systemWindow.style.height = originalWindowSize.height;
        systemWindow.style.left = originalWindowSize.left;
        systemWindow.style.top = originalWindowSize.top;
        systemWindow.style.transform = 'translate(-50%, -50%)';
    }

    // Remplir la galerie d'images
    function populateGallery() {
        imageGallery.innerHTML = '';
        availableImages.forEach((img, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'system-file';
            imgContainer.innerHTML = `
                <img src="assets/images/${img}" alt="Avatar ${index + 1}">
                <div class="system-filename">${img}</div>
            `;
            imgContainer.addEventListener('click', () => selectImage(img));
            imageGallery.appendChild(imgContainer);
        });
    }

    // Sélectionner une image
    function selectImage(filename) {
        selectedImage = filename;
        const imagePath = `assets/images/${filename}`;

        // Mettre à jour la preview
        preview.src = imagePath;
        preview.classList.remove('hidden');
        uploadIcon.classList.add('hidden');
        uploadText.textContent = "";
        uploadActions.classList.remove('hidden');
        modal.classList.add('hidden');

        // Mettre à jour l'avatar du ticket
        userAvatar.src = imagePath;

        // Mettre à jour la barre d'état
        statusBar.textContent = `1 item selected: ${filename}`;

        // Stocker la sélection
        localStorage.setItem('selectedAvatar', imagePath);
        clearError(uploadArea);
    }

    // Gestion de la barre des tâches
    function updateTaskbar() {
        if (isMinimized) {
            if (!taskbar) {
                taskbar = document.createElement('div');
                taskbar.className = 'system-taskbar';
                document.body.appendChild(taskbar);
            }
            createTaskbarButton();
        } else if (taskbar) {
            // Supprimer la barre des tâches si aucune fenêtre n'est minimisée
            taskbar.remove();
            taskbar = null;
        }
    }

    function createTaskbarButton() {
        if (taskbarBtn) return;

        taskbarBtn = document.createElement('div');
        taskbarBtn.className = 'system-taskbar-btn';
        taskbarBtn.innerHTML = `
            <img src="assets/images/icon-upload.svg" alt="Avatar selector">
            <span>Avatar Selector</span>
        `;
        taskbarBtn.addEventListener('click', restoreWindow);
        taskbar.appendChild(taskbarBtn);
    }

    // Fonctions de contrôle de la fenêtre
    function minimizeWindow() {
        modal.classList.add('minimized');
        minimizeBtn.textContent = '+';
        isMinimized = true;
        updateTaskbar();
    }

    function restoreWindow() {
        modal.classList.remove('minimized');
        minimizeBtn.textContent = '−';
        isMinimized = false;
        updateTaskbar();

        if (taskbarBtn) {
            taskbarBtn.remove();
            taskbarBtn = null;
        }
    }

    function toggleMaximize() {
        if (isMaximized) {
            systemWindow.style.width = originalWindowSize.width;
            systemWindow.style.height = originalWindowSize.height;
            systemWindow.style.left = originalWindowSize.left;
            systemWindow.style.top = originalWindowSize.top;
            systemWindow.style.transform = 'translate(-50%, -50%)';
            maximizeBtn.textContent = '□';
        } else {
            originalWindowSize = {
                width: systemWindow.style.width,
                height: systemWindow.style.height,
                left: systemWindow.style.left,
                top: systemWindow.style.top
            };
            systemWindow.style.width = '95vw';
            systemWindow.style.height = '90vh';
            systemWindow.style.left = '50%';
            systemWindow.style.top = '50%';
            systemWindow.style.transform = 'translate(-50%, -50%)';
            maximizeBtn.textContent = '❐';
        }
        isMaximized = !isMaximized;
    }

    // Gestion des erreurs
    function showError(field, message) {
        let errorElement;

        // Cas spécial pour uploadArea qui a une structure HTML différente
        if (field === uploadArea) {

            errorElement = uploadArea.nextElementSibling;
            uploadArea.classList.add('invalid');
        } else {
            errorElement = field.nextElementSibling;

        }

        if (errorElement && errorElement.classList.contains('form-hint')) {
            field.classList.add('invalid');
            errorElement.querySelector('span').textContent = message;
            errorElement.style.display = 'flex';
        }
    }

    function clearError(field) {
        let errorElement;

        if (field === uploadArea) {
            errorElement = uploadArea.nextElementSibling;
            uploadArea.classList.remove('invalid')
        } else {
            errorElement = field.nextElementSibling;
        }

        if (errorElement && errorElement.classList.contains('form-hint')) {
            field.classList.remove('invalid');
            errorElement.style.display = 'none';
        }
    }

    // Validation des champs
    function validateField(field) {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            return false;
        }

        if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }

        if (field.id === 'github' && !/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(field.value)) {
            showError(field, 'Please enter a valid GitHub username');
            return false;
        }

        clearError(field);
        return true;
    }

    // Validation de l'avatar
    function validateAvatar() {
        if (!selectedImage || preview.classList.contains('hidden')) {
            uploadArea.classList.add('invalid'); // Assure que la classe est ajoutée
            showError(uploadArea, 'Please select an avatar');
            return false;
        }
        uploadArea.classList.remove('invalid'); // Retire la classe si valide
        return true;
    }

    // Validation en temps réel
    function setupInputValidation() {
        [fullNameInput, emailInput, githubInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    clearError(input);
                }
            });
        });
    }

    // Gestion des événements
    function setupEventListeners() {
        // Boutons de contrôle de la fenêtre
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        minimizeBtn.addEventListener('click', () => {
            if (isMinimized) {
                restoreWindow();
            } else {
                minimizeWindow();
            }
        });

        maximizeBtn.addEventListener('click', toggleMaximize);

        // Gestion des vues
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                imageGallery.className = `system-image-gallery ${btn.dataset.view}-view`;
            });
        });

        // Drag pour déplacer la fenêtre
        let isDragging = false;
        let offsetX, offsetY;
        const titleBar = modal.querySelector('.system-title-bar');

        titleBar.addEventListener('mousedown', (e) => {
            if (e.target === titleBar || e.target.classList.contains('system-title')) {
                isDragging = true;
                offsetX = e.clientX - systemWindow.getBoundingClientRect().left;
                offsetY = e.clientY - systemWindow.getBoundingClientRect().top;
                systemWindow.style.cursor = 'grabbing';
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging && !isMaximized) {
                systemWindow.style.left = `${e.clientX - offsetX}px`;
                systemWindow.style.top = `${e.clientY - offsetY}px`;
                systemWindow.style.transform = 'none';
                originalWindowSize.left = systemWindow.style.left;
                originalWindowSize.top = systemWindow.style.top;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            systemWindow.style.cursor = '';
        });

        // Gestion de l'upload area
        uploadArea.addEventListener('click', (e) => {
            if (!e.target.closest('.upload-actions')) {
                populateGallery();
                modal.classList.remove('hidden');
                initWindow();
            }
        });

        btnChange.addEventListener('click', () => {
            populateGallery();
            modal.classList.remove('hidden');
            initWindow();
        });

        btnRemove.addEventListener('click', () => {
            preview.src = '';
            preview.classList.add('hidden');
            uploadIcon.classList.remove('hidden');
            uploadText.textContent = 'Click to select from gallery';
            uploadActions.classList.add('hidden');
            userAvatar.src = 'assets/images/image-avatar.jpg';
            localStorage.removeItem('selectedAvatar');
            selectedImage = null;
            statusBar.textContent = 'No item selected';
            clearError(uploadArea);
        });

        // Soumission du formulaire
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            // Valider tous les champs
            [fullNameInput, emailInput, githubInput].forEach(input => {
                if (!validateField(input)) isValid = false;
            });

            // Valider l'avatar
            if (!validateAvatar()) isValid = false;

            if (isValid) {
                // Mettre à jour les infos du ticket
                userNameDisplay.textContent = fullNameInput.value;
                userEmailDisplay.textContent = emailInput.value;
                userGithubDisplay.textContent = `@${githubInput.value}`;

                // Générer un numéro de ticket aléatoire
                const ticketNumber = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
                document.querySelector('.ticket-number').textContent = `#${ticketNumber}`;

                // Masquer le formulaire et afficher le ticket
                registrationForm.classList.add('hidden');
                ticketSection.classList.remove('hidden');

                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Initialisation
    initWindow();
    setupEventListeners();
    setupInputValidation();
    populateGallery();

    // Charger l'avatar sélectionné au démarrage
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
        selectImage(savedAvatar.split('/').pop());
    }
});