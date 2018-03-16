function pageHeight(dom){
    const inHeight = window.screen.height
    let content = document.querySelector(dom)
    content.style.minHeight = inHeight + 'px'
}

export {
    pageHeight
}