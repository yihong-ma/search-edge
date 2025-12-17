/**
 * 数字搜索工具 - 主逻辑代码
 * 功能：根据用户输入的起始数字、结束数字和间隔时间，自动打开浏览器搜索这些数字
 */

// 全局变量
let isSearching = false;
let currentNumber = 0;
let endNumber = 0;
let intervalSeconds = 0;
let searchTimer = null;

// DOM元素
const startNumberInput = document.getElementById('startNumber');
const endNumberInput = document.getElementById('endNumber');
const intervalInput = document.getElementById('interval');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const statusText = document.getElementById('statusText');

/**
 * 初始化：绑定事件监听器
 */
function init() {
    btnStart.addEventListener('click', startSearch);
    btnStop.addEventListener('click', stopSearch);
    
    // 阻止表单提交（如果用户按回车）
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !isSearching) {
            e.preventDefault();
            startSearch();
        }
    });
}

/**
 * 开始搜索功能
 * 验证输入参数，然后启动定时搜索任务
 */
function startSearch() {
    try {
        // 获取并验证起始数字
        const startNumStr = startNumberInput.value.trim();
        if (!startNumStr) {
            showMessage('请输入起始数字', 'error');
            startNumberInput.focus();
            return;
        }
        const startNum = parseInt(startNumStr, 10);
        if (isNaN(startNum)) {
            showMessage('起始数字格式不正确', 'error');
            startNumberInput.focus();
            return;
        }

        // 获取并验证结束数字
        const endNumStr = endNumberInput.value.trim();
        if (!endNumStr) {
            showMessage('请输入结束数字', 'error');
            endNumberInput.focus();
            return;
        }
        const endNum = parseInt(endNumStr, 10);
        if (isNaN(endNum)) {
            showMessage('结束数字格式不正确', 'error');
            endNumberInput.focus();
            return;
        }

        // 验证数字范围
        if (startNum > endNum) {
            showMessage('起始数字不能大于结束数字', 'error');
            return;
        }

        // 获取并验证间隔时间
        const intervalStr = intervalInput.value.trim();
        if (!intervalStr) {
            showMessage('请输入间隔时间', 'error');
            intervalInput.focus();
            return;
        }
        const interval = parseFloat(intervalStr);
        if (isNaN(interval) || interval <= 0) {
            showMessage('间隔时间必须大于0', 'error');
            intervalInput.focus();
            return;
        }

        // 设置搜索参数
        currentNumber = startNum;
        endNumber = endNum;
        intervalSeconds = interval * 1000; // 转换为毫秒
        isSearching = true;

        // 更新界面状态
        updateUIState();

        // 记录日志
        console.log(`开始搜索：从 ${startNum} 到 ${endNum}，间隔 ${interval}秒`);

        // 立即执行第一次搜索
        performSearch();

    } catch (error) {
        console.error('启动搜索时发生错误:', error);
        showMessage('发生错误：' + error.message, 'error');
        stopSearch();
    }
}

/**
 * 执行搜索操作
 * 打开新标签页搜索当前数字
 */
function performSearch() {
    if (!isSearching) {
        return;
    }

    try {
        // 构建搜索URL
        // 使用Bing搜索（Edge浏览器默认使用Bing）
        const searchQuery = encodeURIComponent(currentNumber.toString());
        const searchUrl = `https://www.bing.com/search?q=${searchQuery}`;

        // 打开新标签页进行搜索
        // 使用window.open在新标签页打开，而不是当前标签页
        const searchWindow = window.open(searchUrl, '_blank');
        
        // 检查是否成功打开（可能被浏览器阻止）
        if (!searchWindow || searchWindow.closed || typeof searchWindow.closed === 'undefined') {
            // 如果弹窗被阻止，尝试使用当前窗口打开
            console.warn('新标签页被阻止，尝试在当前窗口打开');
            window.location.href = searchUrl;
            // 延迟后返回（实际应用中可能需要更复杂的处理）
            setTimeout(() => {
                if (isSearching && currentNumber < endNumber) {
                    currentNumber++;
                    updateStatus();
                    scheduleNextSearch();
                } else {
                    searchCompleted();
                }
            }, intervalSeconds);
            return;
        }

        // 更新状态显示
        updateStatus();

        // 记录日志
        console.log(`搜索数字：${currentNumber}`);

        // 检查是否还有下一个数字
        if (currentNumber < endNumber) {
            // 递增当前数字
            currentNumber++;

            // 安排下一次搜索
            scheduleNextSearch();
        } else {
            // 搜索完成
            searchCompleted();
        }

    } catch (error) {
        console.error('执行搜索时发生错误:', error);
        showMessage('搜索失败：' + error.message, 'error');
        stopSearch();
    }
}

/**
 * 安排下一次搜索
 */
function scheduleNextSearch() {
    // 清除之前的定时器（如果存在）
    if (searchTimer) {
        clearTimeout(searchTimer);
    }

    // 设置新的定时器
    searchTimer = setTimeout(() => {
        performSearch();
    }, intervalSeconds);
}

/**
 * 停止搜索功能
 */
function stopSearch() {
    isSearching = false;

    // 清除定时器
    if (searchTimer) {
        clearTimeout(searchTimer);
        searchTimer = null;
    }

    // 更新界面状态
    updateUIState();

    // 更新状态显示
    statusText.textContent = '已停止搜索';
    document.body.classList.remove('searching');

    // 记录日志
    console.log('搜索已停止');
    showMessage('搜索已停止', 'info');
}

/**
 * 搜索完成
 */
function searchCompleted() {
    isSearching = false;
    searchTimer = null;

    // 更新界面状态
    updateUIState();

    // 更新状态显示
    statusText.textContent = `搜索完成！已搜索 ${endNumber} 个数字`;
    document.body.classList.remove('searching');

    // 记录日志
    console.log('搜索完成');
    showMessage('搜索完成！', 'success');
}

/**
 * 更新状态显示
 */
function updateStatus() {
    statusText.textContent = `正在搜索：${currentNumber} / ${endNumber}`;
    document.body.classList.add('searching');
}

/**
 * 更新界面状态
 * 根据搜索状态启用/禁用按钮和输入框
 */
function updateUIState() {
    btnStart.disabled = isSearching;
    btnStop.disabled = !isSearching;

    // 禁用/启用输入框
    startNumberInput.disabled = isSearching;
    endNumberInput.disabled = isSearching;
    intervalInput.disabled = isSearching;
}

/**
 * 显示提示消息
 * @param {string} message - 要显示的消息
 * @param {string} type - 消息类型：'success', 'error', 'info'
 */
function showMessage(message, type = 'info') {
    // 创建临时提示元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideDown 0.3s ease;
    `;

    // 根据类型设置背景色
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        info: '#2196F3'
    };
    messageDiv.style.backgroundColor = colors[type] || colors.info;

    // 添加到页面
    document.body.appendChild(messageDiv);

    // 3秒后自动移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// 添加消息动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 页面卸载时清理资源
window.addEventListener('beforeunload', function() {
    if (isSearching) {
        stopSearch();
    }
});

