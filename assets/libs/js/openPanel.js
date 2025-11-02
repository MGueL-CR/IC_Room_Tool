try {
    const btnShow = document.getElementById('btnMostrarPanel');
    btnShow.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'show_side_panel' });
    });
} catch (error) {
    console.error(error);
}
