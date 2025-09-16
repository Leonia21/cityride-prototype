let currentTheme = 'light';
let offlineMode = false;

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const button = document.querySelector('.theme-toggle');
    button.textContent = currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    
    // Animate theme transition
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function showScreen(screenNumber) {
    // Simulate navigation between screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
        if (index + 1 === screenNumber) {
            screen.style.transform = 'scale(1.02)';
            screen.style.boxShadow = '0 20px 60px rgba(10, 116, 255, 0.3)';
            screen.style.zIndex = '10';
            
            setTimeout(() => {
                screen.style.transform = 'scale(1)';
                screen.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                screen.style.zIndex = '';
            }, 600);
        }
    });
    
    // Show navigation feedback with enhanced animation
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: var(--primary);
        color: white;
        padding: 20px 30px;
        border-radius: 30px;
        font-weight: 600;
        font-size: 16px;
        z-index: 2000;
        box-shadow: 0 10px 30px rgba(10, 116, 255, 0.4);
        animation: feedbackAnimation 2.5s ease;
    `;
    feedback.textContent = `📱 Navigating to Screen ${screenNumber}`;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        if (document.body.contains(feedback)) {
            document.body.removeChild(feedback);
        }
    }, 2500);
}

function toggleOfflineMode() {
    offlineMode = !offlineMode;
    const banner = document.getElementById('offline-banner');
    if (banner) {
        banner.style.display = offlineMode ? 'block' : 'none';
    }
}

// Add enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes feedbackAnimation {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6);
        }
        15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05);
        }
        25% {
            transform: translate(-50%, -50%) scale(1);
        }
        85% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    @keyframes markerPulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        50% {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
    }
    
    .bus-marker {
        animation: markerPulse 3s infinite;
    }
`;
document.head.appendChild(style);

// Initialize theme and interactions
document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('button:not(.theme-toggle)');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Enhanced toggle interactions
    const toggleOptions = document.querySelectorAll('.toggle-option, .status-option, .notification-option');
    toggleOptions.forEach(option => {
        option.addEventListener('click', function() {
            const siblings = this.parentElement.querySelectorAll('.toggle-option, .status-option, .notification-option');
            siblings.forEach(sibling => sibling.classList.remove('active'));
            this.classList.add('active');
            
            // Add feedback animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Enhanced vehicle item interactions
    const vehicleItems = document.querySelectorAll('.vehicle-item');
    vehicleItems.forEach(item => {
        item.addEventListener('click', function() {
            vehicleItems.forEach(v => {
                v.style.borderColor = 'var(--border)';
                v.style.transform = 'translateY(0)';
            });
            this.style.borderColor = 'var(--primary)';
            this.style.transform = 'translateY(-2px)';
        });
    });
    
    // Simulate real-time updates
    setInterval(() => {
        const etaChips = document.querySelectorAll('.eta-chip, .quick-eta');
        etaChips.forEach(chip => {
            if (Math.random() > 0.7) { // 30% chance to update
                const currentTime = parseInt(chip.textContent);
                if (currentTime > 1) {
                    chip.textContent = (currentTime - 1) + ' min';
                    chip.style.animation = 'pulse 0.5s ease';
                    setTimeout(() => {
                        chip.style.animation = '';
                    }, 500);
                }
            }
        });
    }, 5000);
    
    // Simulate offline mode toggle (for demo)
    setTimeout(() => {
        if (Math.random() > 0.8) { // 20% chance
            toggleOfflineMode();
            setTimeout(() => {
                toggleOfflineMode();
            }, 3000);
        }
    }, 10000);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});
