function SimplePopup(afterSelector, classList, content, removeAfter=5000, clearOthers=false)
{
    function remove(popup)
    {
        const s = getComputedStyle(popup).getPropertyValue('--popup-animation-time');
        let animationTime = parseFloat(s)
        if (!s.endsWith("ms")) animationTime *= 1000
        const stack = popup.parentElement   // Should be div.popup-stack
        popup.classList.remove("simple-popup-visible")
        setTimeout(() => {
            popup.remove()
            console.log(stack)
            if (stack.childElementCount === 0)
            {
                stack.remove()
            }
        }, animationTime)
    }
  
    // Look for a div#popup-stack element after the specified element. If there isn't one, create it
    const after = document.querySelector(afterSelector)
    const afterNextSibling = after.nextElementSibling
    let stack
    if ((afterNextSibling.tagName === "DIV") && (afterNextSibling.classList.contains("simple-popup-stack")))
    {
        stack = afterNextSibling
    }
    else
    {
        stack = document.createElement("div")
        stack.classList.add("simple-popup-stack")
        after.insertAdjacentElement("afterend", stack)
    }
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
    if (removeAfter) {
        p.dataset.timeout = setTimeout(() => remove(p), removeAfter)
    }
    p.addEventListener("click", ev => {
        p.dataset.timeout && clearTimeout(p.dataset.timeout)
        remove(p)
    })
}
