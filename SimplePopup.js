function SimplePopup(popup_stack, classList, content, removeAfter=undefined, clearOthers=false)
{
    function remove(popup)
    {
        const s = getComputedStyle(popup).getPropertyValue('--popup-animation-time');
        let animationTime = parseFloat(s)
        if (!s.endsWith("ms")) animationTime *= 1000
        const stack = popup.parentElement   // Should be div.popup-stack
        popup.classList.remove("visible")
        setTimeout(() => {
            popup.remove()
            if (stack && (stack.childElementCount === 0) && (stack.dataset.transient))
            {
                stack.remove()
            }
        }, animationTime)
    }
  
    // Look for the specified container. If it doesn't exist, create a temporary one
    let stack = document.querySelector(popup_stack)
    if (!stack)
    {
        stack = document.createElement("div")
        stack.dataset['transient'] = true
        document.body.insertAdjacentElement("afterbegin", stack)
    }
    stack.classList.add("simple-popup-stack")
    if (clearOthers && stack.children)
    {
        stack.querySelectorAll(".simple-popup").forEach(c => c.remove())
    }
    const p = document.createElement("div")
    p.classList.add("simple-popup")
    classList.map(cl => p.classList.add(cl))
    p.innerHTML = content
    stack.insertAdjacentElement("beforeend", p)
    setTimeout(() => p.classList.add("visible"), 1)
    if (removeAfter !== undefined) {
        p.dataset.timeout = setTimeout(() => remove(p), removeAfter)
    }
    p.addEventListener("click", ev => {
        p.dataset.timeout && clearTimeout(p.dataset.timeout)
        remove(p)
    })
    p.addEventListener("mouseover", ev => {
        // Hovering the mouse pauses the timer
        p.dataset.timeout && clearTimeout(p.dataset.timeout)
        delete p.dataset.timeout
    })
    p.addEventListener("mouseout", ev => {
        // Restart the timer when the mouse exits
        if (removeAfter !== undefined) {
            p.dataset.timeout = setTimeout(() => remove(p), removeAfter)
        }
    })
}


function ClearSimplePopups(popup_stack)
{
    let stack = document.querySelector(popup_stack)
    if (!stack)
    {
        console.error(`${popup_stack} not found`)
        return
    }
    stack.querySelectorAll("div.simple-popup").forEach(p => {
        p.dataset.timeout && clearTimeout(p.dataset.timeout)
        p.remove()
    })
}
