
function logReport(...args: any[]) {
    if (typeof window === 'undefined') {
        return
    }
    const reportElement = document.querySelector('.report')!
    if (!reportElement) {
        return
    }
    const div = document.createElement('div')
    div.textContent = args.map(arg => JSON.stringify(arg)).join(' | ')
    reportElement.appendChild(div)
}


export {logReport}