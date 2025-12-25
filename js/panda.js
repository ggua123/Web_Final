// 点击屏幕效果随机产生随即大小的图案（苹果、竹子、熊猫、爱心）
document.addEventListener('click', (e) => {
    // 在JavaScript事件处理中，e 是事件对象（event object）的常用参数名，代表触发的事件
    
    // 在登录页面禁用点击效果（如果当前页面body有'login-page'类，则直接返回，不执行效果）
    if (document.body.classList.contains('login-page')) return;
    
    const heart = document.createElement('div');
    const emojis = ['🍎', '🎋', '🐼', '❤️'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]; // 随机选择一个emoji
    
    heart.innerHTML = randomEmoji; // 设置内容
    heart.className = 'click-heart'; // 添加CSS类
    heart.style.left = e.pageX + 'px'; // 设置X坐标（鼠标点击位置）
    heart.style.top = e.pageY + 'px'; // 设置Y坐标
    heart.style.fontSize = Math.random() * 30 + 20 + 'px'; // 随机大小（20-50px）
    
    document.body.appendChild(heart); // 将元素添加到页面

    setTimeout(() => {
        heart.remove();
    }, 1000); // 1秒后移除元素，防止DOM元素过多
});

// 表单验证功能
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    const inputs = loginForm.querySelectorAll('input');
    
    inputs.forEach(input => {
        // 实时验证
        input.addEventListener('input', () => {
            validateInput(input);
        });
        
        // 失去焦点时验证
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // 模拟网络请求
            await new Promise(resolve => setTimeout(resolve, 900));
            
            alert('🐼 认证成功！欢迎果粉来到花局办公室。');
            window.location.href = 'index.html';
        }
    });
}

//html input required
// 当验证失败时，调用showError(input, '昵称至少需要2个字符')，就会在input后面插入一个错误信息div，并显示。
// 如果验证通过，调用hideError(input)，则错误信息会被隐藏。
function validateInput(input) {
    const errorDiv = input.nextElementSibling || 
                     input.parentElement.querySelector('.error-message');
    
    if (!input.value.trim()) {
        showError(input, '此项为必填项');
        return false;
    }
    
    if (input.type === 'text' && input.value.length < 2) {
        showError(input, '昵称至少需要2个字符');
        return false;
    }
    
    if (input.type === 'password' && input.value.length < 4) {
        showError(input, '密码至少需要4个字符');
        return false;
    }
    
    hideError(input);
    return true;
}

function showError(input, message) {
    input.classList.add('error');
    
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError(input) {
    input.classList.remove('error');
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.style.display = 'none';
    }
}

// 滚动到顶部按钮
// 这个函数会在DOMContentLoaded事件中被调用
window.addEventListener('DOMContentLoaded', () => {
    addScrollToTop();
});

function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '🐼';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ff8a80;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // > 300，opacity = 1
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } 
        else { // < 300，opacity = 0，按钮的透明度为0，即隐藏。
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(20px)';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // Alt + H 回到首页
    if (e.altKey && e.key === 'h') {
        window.location.href = 'index.html';
    }
    // Alt + L 打开登录页
    if (e.altKey && e.key === 'l') {
        window.location.href = 'login.html';
    }
    // ESC 关闭模态框
    if (e.key === 'Escape') {
        const modal = document.querySelector('.image-modal');
        if (modal) {
            modal.remove();
        }
    }
});

// 页面离开提示（仅针对有表单的页面）
window.addEventListener('beforeunload', (e) => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const inputs = loginForm.querySelectorAll('input');
        const hasChanges = Array.from(inputs).some(input => input.value.trim() !== '');
        
        if (hasChanges) {
            e.preventDefault();
            e.returnValue = '您输入的内容可能不会被保存，确定要离开吗？';
        }
    }
});